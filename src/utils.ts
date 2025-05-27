import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import appConfig from './config';

const SALT_ROUNDS = 10;

export interface JwtPayload {
  userId: number;
  username: string;
}

//  encrypt password
export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

//  verify password
export const comparePassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

//  generate JWT
export const generateToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, appConfig.JWT_SECRET, { expiresIn: '7d' });
};

//  async verify JWT
export const verifyToken = async (
  token: string,
): Promise<JwtPayload | null> => {
  return new Promise((resolve) => {
    jwt.verify(token, appConfig.JWT_SECRET, (err, decoded) => {
      if (err || !decoded) return resolve(null);
      resolve(decoded as JwtPayload);
    });
  });
};
