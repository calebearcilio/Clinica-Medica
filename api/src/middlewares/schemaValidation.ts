import { Request, Response, NextFunction } from "express";
import z, { ZodError } from "zod";

export const validateBody = (schema: z.ZodType<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse(req.body);
      req.body = parsed;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "Dados de entrada inválidos.",
          errors: error.issues.map((err: any) => ({
            campo: err.path[0],
            mensagem: err.message,
          })),
        });
      }

      next(error);
    }
  };
};

export const validateParams = (schema: z.ZodType<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validateParams = schema.parse(req.params);
      (req as any).params = validateParams;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "Parâmetros inválidos.",
          errors: error.issues.map((err: any) => ({
            campo: err.path[0],
            mensagem: err.message,
          })),
        });
      }

      next(error);
    }
  };
};

export const validateQuery = (schema: z.ZodType<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validateQuery = schema.parse(req.query);
      (req as any).query = validateQuery;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "Parâmetros de consulta inválidos.",
          errors: error.issues.map((err: any) => ({
            campo: err.path[0],
            mensagem: err.message,
          })),
        });
      }
      next(error);
    }
  };
};
