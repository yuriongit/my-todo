import type z from "zod/v4"
import type { todoSchema } from "../schemas/todo.schema"

// To-do Types
export type Todo = z.infer<typeof todoSchema>

export type CreateTodo = Omit<Todo, keyof Pick<Todo, "id">>
export type UpdateTodo = Pick<Todo, "id"> & Partial<Todo>
export type GetTodo = Pick<Todo, "id">
export type DeleteTodo = GetTodo

// Query Types
export type GetTodoQuery = {
   id: string
}

// Response Types
export type TodoResponse = {
   message: string
   todo: Todo
}
export type CreatedTodoResponse = TodoResponse
export type GetTodoResponse = TodoResponse
export type UpdateTodoResponse = TodoResponse
export type DeleteTodoResponse = TodoResponse