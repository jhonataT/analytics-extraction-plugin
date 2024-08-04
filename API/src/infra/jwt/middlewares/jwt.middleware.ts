import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../services/jwt.service';

interface CustomRequest extends Request {
  responsibleToken?: any;
}

const jwtMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.replace('Bearer ', '');
  if (!token)
    return res.status(401).send('Access Denied');

  try {
    const payload = verifyToken(token as string);
    const domain = req.body.sourceDomainUrl;

    if (payload.domain !== domain) {
      return res.status(403).send('Forbidden');
    }

    req.responsibleToken = payload;
    next();
  } catch (error) {
    return res.status(400).send('Invalid Token');
  }
};

export default jwtMiddleware;
