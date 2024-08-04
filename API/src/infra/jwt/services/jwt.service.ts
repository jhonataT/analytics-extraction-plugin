import 'dotenv/config';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET as string;

interface Payload {
  id: string;
  domain: string;
  email: string | undefined;
};

export const generateToken = (payload: Payload, expiresIn: string = '30d'): string => {
  return jwt.sign(payload, secret, { expiresIn: expiresIn });
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, secret);
};
