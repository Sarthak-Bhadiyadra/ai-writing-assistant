import { Router, Request, Response } from 'express';
import Stripe from 'stripe';
import { supabase } from '../index';

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
  } catch (err: any) {
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
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
});

async function handleSubscriptionChange(subscription: Stripe.Subscription, overrideStatus?: string) {
  const customerId = subscription.customer as string;
  const status = overrideStatus || subscription.status;
  
  // We need to find the user by Stripe customer ID or look it up from metadata
  // Recommendation: Use metadata when creating checkout session
  const userId = subscription.metadata.userId;

  if (!userId) return;

  const plan = subscription.items.data[0].plan.nickname?.toLowerCase() || 'pro';

  await supabase.from('subscriptions').upsert({
    id: subscription.id,
    user_id: userId,
    plan: plan,
    status: status,
    current_period_end: new Date((subscription as any).current_period_end * 1000).toISOString(),
    updated_at: new Date().toISOString()
  });

  await supabase.from('users').update({ plan: plan }).eq('id', userId);
}

export default router;
