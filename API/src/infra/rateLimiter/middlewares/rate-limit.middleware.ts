import { Request, Response, NextFunction } from 'express';
import { RateLimiterMemory } from 'rate-limiter-flexible';

const rateLimiter = new RateLimiterMemory({
  points: 5, // 5 requests
  duration: 600, // 10 minutes
});

const rateLimitMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).send('Access Denied');
  }

  const tokenKey = token as string;

  rateLimiter.consume(tokenKey)
    .then((rateLimiterRes) => {
      console.log(`Request allowed for token`);
      console.log(`Remaining points: ${rateLimiterRes.remainingPoints}`);
      next();
    })
    .catch((err) => {
      console.log(`Too many requests for token`, err);
      res.status(429).send({ error: 'Too many requests for token' });
    });
};

export default rateLimitMiddleware;
