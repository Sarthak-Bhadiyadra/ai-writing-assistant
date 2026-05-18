import { Router, Response } from 'express';
import Stripe from 'stripe';
import { authenticate, AuthRequest } from '../middleware/auth';
import { logger } from '../lib/logger';

const router = Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16' as any,
});

router.post('/create-session', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const userEmail = req.user?.email;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const priceId = process.env.STRIPE_PRO_PRICE_ID;
    if (!priceId) {
       logger.error('STRIPE_PRO_PRICE_ID is not set in environment variables');
       return res.status(500).json({ error: 'Stripe is not fully configured. Please set STRIPE_PRO_PRICE_ID.' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.FRONTEND_URL}/app/billing?success=true`,
      cancel_url: `${process.env.FRONTEND_URL}/app/billing?canceled=true`,
      customer_email: userEmail,
      subscription_data: {
        metadata: {
          userId: userId,
        },
      },
      metadata: {
        userId: userId,
      },
    });

    res.json({ url: session.url });
  } catch (error: any) {
    logger.error('Error creating Stripe checkout session:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
