import { TodoService } from "@/services/todo.service";
import type { NextFunction, Request, Response } from "express";

export const TodoController = {
   async createTodo(req: Request, res: Response, next: NextFunction) {
      try {
         const response = await TodoService.create(req.body)

         return res.status(200).json(response)
      } catch (error) {
         next(error)
      }
   },
   async queryTodo(req: Request, res: Response, next: NextFunction) {
      try {
         const response = await TodoService.query(req.body.id)

         return res.status(200).json(response)
      } catch (error) {
         next(error)
      }
   },
}