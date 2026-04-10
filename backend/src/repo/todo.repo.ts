import type { Todo } from "@/services/todo.service";
import { ErrorHandler } from "@app/error/errorHandler";
import { supabase } from "@app/supabase/client";

export const TodoRepo = {
   async query(todoId: number): Promise<Todo> {
      const { data: todo, error } = await supabase.from("todo_items").select("*").eq("id", todoId).single()

      if (error) {
         throw new ErrorHandler(404, {
            details: error.details,
            message: `To-do does not exist`
         })
      }
      return todo
   }
}