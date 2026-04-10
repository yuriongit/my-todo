import { TodoRepo } from "@/repo/todo.repo";
import { todoSchema } from "@/schemas/todo.schema";
import type { Request, Response, NextFunction } from "express";
import type z from "zod/v4";

// To-do Types
export type Todo = z.infer<typeof todoSchema>
export type CreateTodo = Omit<Todo, keyof Pick<Todo, "id">>
export type QueryTodo = Pick<Todo, "id">

// Response Types
export type CreatedTodoResponse = {
	message: string
	todo: CreateTodo
}
export type QueryTodoResponse = Todo

export const TodoService = {
	async create(todo: CreateTodo): Promise<CreatedTodoResponse> {
		const response = await TodoRepo.insert(todo)

		return {
			message: response.message,
			todo: todo,
		}
	},
	async query(todoId: number): Promise<QueryTodoResponse> {
		const response = await TodoRepo.query(todoId)

		return response
	},
	async update(_req: Request, _res: Response, _next: NextFunction) {},
	async delete(_req: Request, _res: Response, _next: NextFunction) {},
}