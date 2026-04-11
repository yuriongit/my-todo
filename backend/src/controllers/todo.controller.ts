import type { NextFunction, Request, Response } from "express"
import {
	type CreatedTodoResponse,
	type CreateTodo,
	type QueryTodoResponse,
	type Todo,
	TodoService,
} from "@/services/todo.service"

export const TodoController = {
	async createTodo(
		req: Request<unknown, CreatedTodoResponse, CreateTodo, unknown>,
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
	async queryTodo(
		req: Request<unknown, QueryTodoResponse, Todo>,
		res: Response<QueryTodoResponse>,
		next: NextFunction,
	) {
		try {
			const response = await TodoService.query(req.body.id)

			return res.status(200).json(response)
		} catch (error) {
			next(error)
		}
	},
}
