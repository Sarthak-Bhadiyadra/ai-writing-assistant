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
  if (!token) {
    return res.status(401).json({ error: 'Invalid authorization format' });
  }

  let user = null;
  let error = null;
  let retryCount = 0;
  const MAX_RETRIES = 3;

  while (retryCount <= MAX_RETRIES) {
    const response = await supabase.auth.getUser(token);
    user = response.data.user;
    error = response.error;

    if (!error && user) break;

    // Check if error is specifically a retryable fetch error (status 0 or AuthRetryableFetchError)
    const isRetryable = error?.name === 'AuthRetryableFetchError' || (error as any)?.status === 0 || error?.message?.includes('fetch failed');
    
    if (isRetryable && retryCount < MAX_RETRIES) {
      retryCount++;
      logger.warn(`Auth retry attempt ${retryCount}/${MAX_RETRIES}`, { 
        error: error?.name || error?.message,
        tokenPreview: token.substring(0, 10) + '...'
      });
      // Small exponential backoff: 500ms, 1000ms, 1500ms
      await new Promise(resolve => setTimeout(resolve, 500 * retryCount));
      continue;
    }

    break;
  }

  if (error || !user) {
    const isExpired = error?.message?.includes('token is expired') || (error as any)?.status === 403;
    
    logger.error('Auth Error:', error?.message || 'No user found', { 
      error,
      tokenPreview: token ? `${token.substring(0, 20)}...` : 'none',
      attempts: retryCount + 1
    });

    return res.status(401).json({ 
      error: 'Please login again to continue.',
      code: isExpired ? 'TOKEN_EXPIRED' : 'INVALID_TOKEN'
    });
  }

  req.user = user;
  next();
};
