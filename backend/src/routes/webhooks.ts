import { Router, Request, Response } from 'express';
import Stripe from 'stripe';
import { supabase } from '../lib/supabase';
import { logger } from '../lib/logger';

const router = Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16' as any,
});

router.post('/', async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature']!;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
    logger.info('Stripe Webhook received:', event.type);
  } catch (err: any) {
    logger.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
      const subscription = event.data.object as Stripe.Subscription;
      await handleSubscriptionChange(subscription);
      break;
    case 'customer.subscription.deleted':
      const deletedSub = event.data.object as Stripe.Subscription;
      await handleSubscriptionChange(deletedSub, 'canceled');
      break;
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      await handleCheckoutSessionCompleted(session);
      break;
    default:
      logger.info(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
});

async function handleSubscriptionChange(subscription: Stripe.Subscription, overrideStatus?: string) {
  const customerId = subscription.customer as string;
  const status = overrideStatus || subscription.status;
  
  // We need to find the user by Stripe customer ID or look it up from metadata
  // Recommendation: Use metadata when creating checkout session
  const userId = subscription.metadata.userId;
  
  logger.info('Handling subscription change:', { userId, status, subscriptionId: subscription.id });

  if (!userId) {
    logger.warn('No userId found in subscription metadata');
    return;
  }

  const plan = subscription.items.data[0].plan.nickname?.toLowerCase() || 'pro';
  logger.info('Updating user plan to:', plan);

  // Safely handle current_period_end
  const periodEnd = (subscription as any).current_period_end 
    ? new Date((subscription as any).current_period_end * 1000).toISOString()
    : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(); // Default to 30 days if missing

  await supabase.from('subscriptions').upsert({
    id: subscription.id,
    user_id: userId,
    plan: plan,
    status: status,
    current_period_end: periodEnd,
    updated_at: new Date().toISOString()
  });

  await supabase.from('users').update({ plan: plan }).eq('id', userId);
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.userId;
  const subscriptionId = session.subscription as string;

  logger.info('Handling checkout session completed:', { userId, subscriptionId });

  if (!userId || !subscriptionId) {
    logger.warn('Missing userId or subscriptionId in checkout session');
    return;
  }

  // Get subscription details to get the plan
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  const plan = subscription.items.data[0].plan.nickname?.toLowerCase() || 'pro';

  // Safely handle current_period_end
  const periodEnd = (subscription as any).current_period_end 
    ? new Date((subscription as any).current_period_end * 1000).toISOString()
    : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

  await supabase.from('subscriptions').upsert({
    id: subscription.id,
    user_id: userId,
    plan: plan,
    status: subscription.status,
    current_period_end: periodEnd,
    updated_at: new Date().toISOString()
  });

  await supabase.from('users').update({ plan: plan }).eq('id', userId);
  logger.info('User plan updated successfully via checkout session');
}

export default router;
