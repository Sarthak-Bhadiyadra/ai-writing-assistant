import { Router, Response } from 'express';
import OpenAI from 'openai';
import { authenticate, AuthRequest } from '../middleware/auth';
import { supabase } from '../index';

const router = Router();

const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

router.post('/', authenticate, async (req: AuthRequest, res: Response) => {
  const { text, tone } = req.body;
  const userId = req.user.id;

  if (!text || text.length > 1000) {
    return res.status(400).json({ error: 'Invalid text. Max length is 1000 characters.' });
  }

  try {
    console.log("userId", userId, req.user)
    // 1. Check usage limit
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('plan')
      .eq('id', userId)
      .single();
    console.log("userDatauserData",userData,userError)
    if (userError || !userData) {
        return res.status(500).json({ error: 'User not found' });
    }

    if (userData.plan === 'free') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const { count, error: countError } = await supabase
        .from('usage_logs')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .gte('timestamp', today.toISOString());

      if (countError) throw countError;

      if (count !== null && count >= 30) {
        return res.status(403).json({ error: 'Daily limit reached. Upgrade to Pro for unlimited improvements.' });
      }
    }

    // 2. Call Groq
    const prompt = `Improve the following text focusing on the requested tone "${tone}". 
    - Improve grammar
    - Maintain meaning
    - Rewrite clearly
    - Do not add conversational filler, just return the improved text.
    
    Text: "${text}"`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: "You are a professional writing assistant." },
        { role: "user", content: prompt },
      ],
    });

    const result = completion.choices[0].message.content;

    // 3. Log usage
    await supabase.from('usage_logs').insert({
      user_id: userId,
      text_length: text.length,
      tone: tone
    });

    res.json({ result });

  } catch (error: any) {
    console.error('AI Error:', error);
    res.status(500).json({ error: 'Failed to improve text' });
  }
});

export default router;
