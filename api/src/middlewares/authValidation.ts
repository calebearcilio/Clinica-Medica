import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const validateAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1] || req.body?.token;
  if (!token) {
    return res.status(401).json({
      message: "Token não fornecido.",
    });
  }
  
  const JWT_KEY = process.env.JWT_KEY!;
  
  try {
    const decoded = jwt.verify(token, JWT_KEY);
    (req as any).user = decoded;
    next();
  } catch (error: any) {
    return res.status(401).json({
      message: "Token inválido ou expirado.",
    });
  }
};
