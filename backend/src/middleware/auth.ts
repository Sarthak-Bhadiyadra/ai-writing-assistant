import { Request, Response, NextFunction } from 'express';
import { supabaseAnon as supabase } from '../lib/supabase';

export interface AuthRequest extends Request {
  user?: any;
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'No authorization header' });
  }

  const token = authHeader.split(' ')[1];
  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error || !user) {
    console.log(error, user, token);
    return res.status(401).json({ error: 'Invalid token' });
  }

  req.user = user;
  next();
};
