import * as jwt from 'jsonwebtoken';
require('dotenv').config();
export function verifyJWTToken(token: string) {
  return new Promise((resolve, reject) => {
    if (!process.env.SECRET) {
      reject(new Error("SECRET DOESN'T EXISTS"));
    }
    const SECRET = process.env.SECRET as string;
    jwt.verify(token, SECRET, (err, decodedToken) => {
      if (err || !decodedToken) {
        return reject(err);
      }
      resolve(decodedToken);
    });
  });
}

export function createJWToken(payload: any) {
  if (!process.env.SECRET) {
    throw new Error('NO SECRET PROVIDED');
  }
  const SECRET = process.env.SECRET as string;
  return jwt.sign(
    {
      data: payload
    },
    SECRET,
    {
      expiresIn: 3600,
      algorithm: 'HS256'
    }
  );
}
