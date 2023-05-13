import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { Church } from '../models/church';


const secret = 'Tea, Earl Grey, Hot';

export const signChurchToken = async (church: Church) => {
  let token = jwt.sign(
      { churchId: church.churchId },
      secret,
      { expiresIn: '1hr' }
  );
  
  return token;
}
export const verifyUser = async (req: Request) => {
  // Get the Authorization header from the request
  const authHeader = req.headers.authorization;

  // If header exists, parse token from `Bearer <token>`
  if (authHeader) {
      const token = authHeader.split(' ')[1];

      // Verify the token and get the user
      try {
          let decoded: any = await jwt.verify(token, secret);
          return Church.findByPk(decoded.churchId);
      }
      catch (err) {
          return null;
      }
  }
  else {
      return null;
  }
}