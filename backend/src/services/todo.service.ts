import { TodoRepo } from "@/repo/todo.repo"
import { todoSchema } from "@/schemas/todo.schema"
import { ErrorHandler } from "@app/error/errorHandler"
import { supabase } from "@app/supabase/client"
import type { Request, Response, NextFunction } from "express"
import type z from "zod/v4"

export type Todo = z.infer<typeof todoSchema>
export type CreatedTodoResponse = { message: string, todo: Todo }
export type QueryTodoResponse = Todo

export const TodoService = {
   async create(todo: Todo): Promise<CreatedTodoResponse> {
      const { error } = await supabase.from("todo_items").insert(todo)

      if (error) {
         throw new ErrorHandler(403, { details: error.details, message: error.message, })
      }

      return { message: `To-do created succesfully`, todo: todo }
   },
   async query(todoId: number): Promise<QueryTodoResponse> {
      const response = await TodoRepo.query(todoId)

      return response
   },
   async update(_req: Request, _res: Response, _next: NextFunction) { },
   async delete(_req: Request, _res: Response, _next: NextFunction) { }
}