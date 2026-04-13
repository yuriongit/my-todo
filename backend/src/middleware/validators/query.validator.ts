import type { NextFunction, Response, Request } from "express"
import { ZodError } from "zod/v4"
import { z, type ZodObject } from "zod/v4"
import { ErrorHandler } from "@middleware/error/errorHandler"

export const validateQuery = (schema: ZodObject) => async (
   req: Request,
   _res: Response,
   next: NextFunction
) => {
   try {
      await schema.parseAsync(req.query)
      
      // NOTE: For debugging
      const successMessage = `Request query passed request validation middleware (Zod)`
      console.log(successMessage)

      next()
   } catch (error: unknown) {
      if (error instanceof ZodError) {
         const errorMessage = `Request query failed to pass request validation middleware (Zod)`

         // NOTE: For debugging
         console.log({
            message: errorMessage,
            details: z.prettifyError(error),
         })

         throw new ErrorHandler(400, {
            message: errorMessage,
            details: z.prettifyError(error),
         })
      }

      next()
   }
}