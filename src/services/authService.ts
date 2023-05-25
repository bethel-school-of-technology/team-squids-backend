import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { ChurchUser } from '../models/churchUser';


const secret = 'Tea, Earl Grey, Hot';

export const signUserToken = async (user: ChurchUser) => {
  let token = jwt.sign(
      { userId: user.userId },
      secret,
      { expiresIn: '1hr' }
  );
  
  return token;
}
// export const signOutUserToken = async (user: ChurchUser) => {
//     let token = jwt.sign(
//         { userId: user.userId },
//         secret,
//         { expiresIn: '1hr' }
//     );
    
//     return token;
//   }
export const verifyUser = async (req: Request) => {
  // Get the Authorization header from the request
  const authHeader = req.headers.authorization;

  // If header exists, parse token from `Bearer <token>`
  if (authHeader) {
      const token = authHeader.split(' ')[1];

      // Verify the token and get the user
      try {
          let decoded: any = await jwt.verify(token, secret);
          return ChurchUser.findByPk(decoded.userId);
      }
      catch (err) {
          return null;
      }
  }
  else {
      return null;
  }
}