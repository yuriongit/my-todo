import type {
   CreatedTodoResponse,
   CreateTodo,
   DeleteTodoResponse,
   GetTodoResponse,
   UpdateTodo,
   UpdateTodoResponse,
} from "@shared/index"
import { TodoRepo } from "@repo/todo.repo"
import { verifyTodoUpdates } from "@repo/helpers/verify-todo-updates"

export const TodoService = {
   async create(todo: CreateTodo): Promise<CreatedTodoResponse> {
      const response = await TodoRepo.insert(todo)

      return response
   },
   async query(todoId: number): Promise<GetTodoResponse> {
      const response = await TodoRepo.query(todoId)

      return response
   },
   async update(todo: UpdateTodo): Promise<UpdateTodoResponse> {
      await verifyTodoUpdates(todo)
      const response = await TodoRepo.update(todo)

      return response
   },
   async delete(todoId: number): Promise<DeleteTodoResponse> {
      const response = await TodoRepo.delete(todoId)

      return response
   },
}
