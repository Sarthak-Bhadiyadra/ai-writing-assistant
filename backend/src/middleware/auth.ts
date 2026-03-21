import { Request, Response, NextFunction } from 'express';
import { supabaseAnon as supabase } from '../lib/supabase';
import { logger } from '../lib/logger';

export interface AuthRequest extends Request {
  user?: any;
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'No authorization header' });
  }

  const token = authHeader.split(' ')[1];
  console.log("token",token)
  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error || !user) {
    const isExpired = error?.message?.includes('token is expired') || error?.status === 403;
    
    logger.error('Auth Error:', error?.message || 'No user found', { 
      error,
      tokenPreview: token ? `${token.substring(0, 20)}...` : 'none'
    });

    return res.status(401).json({ 
      error: isExpired ? 'Token expired' : 'Invalid token',
      code: isExpired ? 'TOKEN_EXPIRED' : 'INVALID_TOKEN'
    });
  }

  req.user = user;
  next();
};
