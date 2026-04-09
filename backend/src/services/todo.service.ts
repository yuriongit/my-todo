import type { todoSchema } from "@/schemas/todo.schema"
import { ErrorHandler } from "@app/error/errorHandler"
import { supabase } from "@app/supabase/client"
import type { Request, Response, NextFunction } from "express"
import type z from "zod/v4"

export type TodoProps = z.infer<typeof todoSchema>
export type CreatedTodoResponse = { message: string, todo: TodoProps }

export const TodoService = {
   async create(todo: TodoProps): Promise<CreatedTodoResponse> {
      const { error } = await supabase.from("todo_items").insert(todo)

      if (error) {
         throw new ErrorHandler(403, { details: error.details, message: error.message, })
      }

      console.log({ message: `To-do created succesfully`, todo: todo })
      return { message: `To-do created succesfully`, todo: todo }
   },
   async read(_req: Request, _res: Response, _next: NextFunction) { },
   async update(_req: Request, _res: Response, _next: NextFunction) { },
   async delete(_req: Request, _res: Response, _next: NextFunction) { }
}