import type {
	CreatedTodoResponse,
	CreateTodo,
	DeleteTodoResponse,
	QueryTodoResponse,
	UpdateTodo,
	UpdateTodoResponse,
} from "@/controllers/todo.controller"
import { TodoRepo } from "@/repo/todo.repo"

export const TodoService = {
	async create(todo: CreateTodo): Promise<CreatedTodoResponse> {
		const response = await TodoRepo.insert(todo)

		return response
	},
	async query(todoId: number): Promise<QueryTodoResponse> {
		const response = await TodoRepo.query(todoId)

		return response
	},
	async update(todo: UpdateTodo): Promise<UpdateTodoResponse> {
		const response = await TodoRepo.update(todo)

		return response
	},
	async delete(todoId: number): Promise<DeleteTodoResponse> {
		const response = await TodoRepo.delete(todoId)

		return response
	},
}
