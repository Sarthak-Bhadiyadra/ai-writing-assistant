import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import improveRouter from './routes/improve';
import usageRouter from './routes/usage';
import webhookRouter from './routes/webhooks';

const app = express();
const port = process.env.PORT || 5000;

import { supabase } from './lib/supabase';
export { supabase };

app.use(cors());
// Webhook endpoint needs raw body for Stripe signature verification
app.use('/webhooks', express.raw({ type: 'application/json' }), webhookRouter);
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/improve', improveRouter);
app.use('/usage', usageRouter);

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});
