import { Router, Response } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth';
import { supabase } from '../lib/supabase';
import { logger } from '../lib/logger';

const router = Router();

router.get('/', authenticate, async (req: AuthRequest, res: Response) => {
  logger.info('GET /usage - Request from user:', req.user?.id);
  try {
    const userId = req.user.id;

    // Get user plan
    const { data: userData } = await supabase
      .from('users')
      .select('plan')
      .eq('id', userId)
      .single();

    const plan = userData?.plan || 'free';

    // Get today's usage count
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const { count } = await supabase
      .from('usage_logs')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .gte('timestamp', today.toISOString());

    const limits: Record<string, number> = {
      free: 30,
      pro: -1,    // unlimited
      team: -1,   // unlimited
    };

    res.json({
      count: count || 0,
      limit: limits[plan] ?? 30,
      plan,
    });
  } catch (error) {
    logger.error('Usage endpoint error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
