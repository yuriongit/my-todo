import { ErrorHandler } from "@app/error/errorHandler";
import type { Request, Response, NextFunction } from "express"
import { z, ZodError, type ZodObject } from "zod/v4"

export const validateRequest = (schema: ZodObject) => async (req: Request, res: Response, next: NextFunction) => {
   try {
      await schema.parseAsync(req.body)
      console.log(`Request body passed request validation: ZodSchema parse`);
      next()
   } catch (error: unknown | ZodError) {
      if (error instanceof ZodError) {
         console.log({ message: `Failed request validation: ZodSchema parse`, details: z.prettifyError(error) });
         throw new ErrorHandler(400, {
            message: `Failed request validation: ZodSchema parse`,
            details: z.prettifyError(error)
         })
      }
      console.log({ message: `Failed request validation: ZodSchema parse` });
      return res.status(400).json({ message: `Failed request validation: ZodSchema parse` })
   }
}
