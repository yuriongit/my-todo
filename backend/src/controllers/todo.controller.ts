import type { NextFunction, Request, Response } from "express"
import type z from "zod/v4"
import { TodoRepo } from "@/repo/todo.repo"
import type { todoSchema } from "@/schemas/todo.schema"
import { TodoService } from "@/services/todo.service"

// To-do Types
export type Todo = z.infer<typeof todoSchema>

export type CreateTodo = Omit<Todo, keyof Pick<Todo, "id">>
export type UpdateTodo = Pick<Todo, "id"> & Partial<Todo>
export type QueryTodo = Pick<Todo, "id">
export type DeleteTodo = QueryTodo

// Response Types
export type TodoResponse = {
	message: string
	todo: Todo
}
export type CreatedTodoResponse = TodoResponse
export type QueryTodoResponse = TodoResponse
export type UpdateTodoResponse = TodoResponse
export type DeleteTodoResponse = TodoResponse

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
		req: Request<unknown, QueryTodoResponse, DeleteTodo>,
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
