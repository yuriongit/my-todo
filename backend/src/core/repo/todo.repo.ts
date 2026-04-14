import { ErrorHandler } from "@middleware/error/error-handler"
import { supabase } from "@app/supabase/client"
import type { CreateTodo, Todo, UpdateTodo } from "@shared/index"

type TodoResponse<TAction extends "created" | "retrieved" | "updated" | "deleted"> = {
   message: `To-do ${TAction} successfully`
   todo: Todo
}
type RepoInsertTodoResponse = TodoResponse<"created">
type RepoQueryTodoResponse = TodoResponse<"retrieved">
type RepoUpdateTodoResponse = TodoResponse<"updated">
type RepoDeleteTodoResponse = TodoResponse<"deleted">

export const TodoRepo = {
   async insert(todo: CreateTodo): Promise<RepoInsertTodoResponse> {
      const { data, error } = await supabase.from("todo_items").insert(todo).select("*").single()

      if (error) {
         throw new ErrorHandler(404, {
            details: error.details,
            message: error.message,
         })
      }

      return {
         message: "To-do created successfully",
         todo: data,
      }
   },
   async query(todoId: number): Promise<RepoQueryTodoResponse> {
      const { data, error } = await supabase
         .from("todo_items")
         .select("*")
         .eq("id", todoId)
         .single()

      if (error) {
         throw new ErrorHandler(404, {
            details: error.details,
            message: "To-do does not exist",
         })
      }
      return {
         message: "To-do retrieved successfully",
         todo: data,
      }
   },
   async update(todoUpdates: UpdateTodo): Promise<RepoUpdateTodoResponse> {
      const { data, error } = await supabase
         .from("todo_items")
         .update(todoUpdates)
         .eq("id", todoUpdates.id)
         .select()
         .single()

      if (error) {
         throw new ErrorHandler(404, {
            details: error.details,
            message: "To-do does not exist",
         })
      }

      return {
         message: "To-do updated successfully",
         todo: data,
      }
   },
   async delete(todoId: number): Promise<RepoDeleteTodoResponse> {
      const { data, error } = await supabase
         .from("todo_items")
         .delete()
         .eq("id", todoId)
         .select()
         .single()

      if (error) {
         throw new ErrorHandler(404, {
            details: error.details,
            message: "To-do does not exist",
         })
      }

      return {
         message: "To-do deleted successfully",
         todo: data,
      }
   },
   async getById(todoUpdates: UpdateTodo): Promise<Todo> {
      const { data, error } = await supabase.from("todo_items").select("*").eq("id", todoUpdates.id).single()

      if (error) {
         throw new ErrorHandler(404, {
            details: error.details,
            message: "To-do does not exist",
         })
      }

      return data
   }
}
