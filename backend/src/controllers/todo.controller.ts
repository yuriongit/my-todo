import {
	TodoService,
	type CreatedTodoResponse,
	type CreateTodo,
	type QueryTodoResponse,
	type Todo,
} from "@/services/todo.service";
import type { NextFunction, Request, Response } from "express";

export const TodoController = {
	async createTodo(
		req: Request<{}, CreatedTodoResponse, CreateTodo, {}>,
		res: Response<CreatedTodoResponse>,
		next: NextFunction
	) {
		try {
			const response = await TodoService.create(req.body)

			return res.status(200).json(response)
		} catch (error) {
			next(error)
		}
	},
	async queryTodo(
		req: Request<{}, QueryTodoResponse, Todo>,
		res: Response<QueryTodoResponse>,
		next: NextFunction
	) {
		try {
			const response = await TodoService.query(req.body.id)

			return res.status(200).json(response)
		} catch (error) {
			next(error)
		}
	},
}