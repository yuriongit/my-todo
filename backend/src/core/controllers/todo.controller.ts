import type { NextFunction, Request, Response } from "express"
import { TodoRepo } from "@repo/todo.repo"
import { TodoService } from "@services/todo.service"
import type {
   CreatedTodoResponse,
   CreateTodo,
   DeleteTodo,
   DeleteTodoResponse,
   GetTodoQuery,
   GetTodoResponse,
   Todo,
   UpdateTodo,
   UpdateTodoResponse
} from "../../../../shared/types/todo.types"

export const TodoController = {
   async createTodo(
      req: Request<unknown, CreatedTodoResponse, CreateTodo>,
      res: Response<CreatedTodoResponse>,
      next: NextFunction,
   ) {
      try {
         const response = await TodoService.create(req.body)

         return res.status(200).json(response)
      } catch (error) {
         next(error)
      }
   },
   async getTodo(
      req: Request<GetTodoQuery, GetTodoResponse, Todo, GetTodoQuery>,
      res: Response<GetTodoResponse>,
      next: NextFunction,
   ) {
      try {
         const response = await TodoService.query(Number(req.query.id))

         return res.status(200).json(response)
      } catch (error) {
         next(error)
      }
   },
   async updateTodo(
      req: Request<unknown, UpdateTodoResponse, UpdateTodo>,
      res: Response<UpdateTodoResponse>,
      next: NextFunction,
   ) {
      try {
         const response = await TodoService.update(req.body)

         return res.status(200).json(response)
      } catch (error) {
         next(error)
      }
   },
   async deleteTodo(
      req: Request<unknown, GetTodoResponse, DeleteTodo>,
      res: Response<DeleteTodoResponse>,
      next: NextFunction,
   ) {
      try {
         const response = await TodoRepo.delete(req.body.id)

         return res.status(200).json(response)
      } catch (error) {
         next(error)
      }
   },
}
