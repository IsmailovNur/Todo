import { NextFunction, Response } from 'express';
import { RequestWithUser } from "../types";
import { User } from "../models/User";

export const auth = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  const token = req.get('Authorization');

  if (!token) {
    return res.status(401).send({error: 'No token provided!'});
  }

  const user = await User.findOne({token});

  if (!user) {
    return res.status(401).send({error: 'Unauthorized: Invalid token!'});
  }

  req.user = user;
  next();
}