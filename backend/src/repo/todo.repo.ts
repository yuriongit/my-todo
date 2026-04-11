import { supabase } from "@app/supabase/client"
import { ErrorHandler } from "@/middleware/error/errorHandler"
import type { CreateTodo, Todo } from "@/services/todo.service"

type TodoResponse<TAction extends "created" | "retrieved" | "updated" | "deleted"> = {
	message: `To-do ${TAction} successfully`
	todo: Todo
}
type InsertTodoResponse = TodoResponse<"created">
type QueryTodoResponse = TodoResponse<"retrieved">
type DeleteTodoResponse = TodoResponse<"deleted">

export const TodoRepo = {
	async insert(todo: CreateTodo): Promise<InsertTodoResponse> {
		const { data, error } = await supabase.from("todo_items").insert(todo).select("*").single()

		if (error) {
			throw new ErrorHandler(404, {
				details: error.details,
				message: error.message,
			})
		}

		return {
			message: `To-do created successfully`,
			todo: data,
		}
	},
	async query(todoId: number): Promise<QueryTodoResponse> {
		const { data: todo, error } = await supabase
			.from("todo_items")
			.select("*")
			.eq("id", todoId)
			.single()

		if (error) {
			throw new ErrorHandler(404, {
				details: error.details,
				message: `To-do does not exist`,
			})
		}
		return {
			message: "To-do retrieved successfully",
			todo: todo,
		}
	},
	async update(parameter: unknown): Promise<void> {
		parameter
		return
	},
	async delete(todoId: number): Promise<DeleteTodoResponse> {
		const { data: todo, error } = await supabase
			.from("todo_items")
			.delete()
			.eq("id", todoId)
			.select()
			.single()

		if (error) {
			throw new ErrorHandler(404, {
				details: error.details,
				message: `To-do does not exist`,
			})
		}

		return {
			message: `To-do deleted successfully`,
			todo: todo,
		}
	},
}
