import type { NextFunction, Request, Response } from "express"
import { ZodError, type ZodObject, z } from "zod/v4"
import { ErrorHandler } from "@/middleware/error/error-handler"

export const validateBody =
   (schema: ZodObject) => async (req: Request, _res: Response, next: NextFunction) => {
      try {
         await schema.parseAsync(req.body)

         // NOTE: For debugging
         const successMessage = `Request body passed request validation middleware (Zod)`
         console.log(successMessage)

         next()
      } catch (error: unknown) {
         if (error instanceof ZodError) {
            const errorMessage = `Request body failed to pass request validation middleware (Zod)`

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
