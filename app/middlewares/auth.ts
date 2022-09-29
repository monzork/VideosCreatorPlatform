import jwt from 'jsonwebtoken';
import { Request } from 'express';

export function expressAuthentication(
  request: Request,
  securityName: string,
  scopes?: string[]
): any {
  if (securityName === 'jwt') {
    const token =
      request.body.token || request.query.token || request.headers.token;

    return new Promise((resolve, reject) => {
      if (!token) {
        reject(new Error('No token provided'));
      }
      jwt.verify(token, process.env.SECRET!, (err: any, decoded: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    });
  }
}
