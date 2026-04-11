import type { Todo, UpdateTodo } from "@/controllers/todo.controller";
import { ErrorHandler } from "@/middleware/error/errorHandler";
import { supabase } from "@app/supabase/client";

export const hasUpdates = (incoming: UpdateTodo, existing: Todo): boolean => {
   const { id: incomingId, ...payload } = incoming
   const { id: existingId, ...source } = existing

   return !Object.keys(incoming).every(
      (key) => payload[key as keyof typeof payload] === source[key as keyof typeof source]
   );
}

export const verifyTodoUpdates = async (todoUpdates: UpdateTodo): Promise<boolean> => {
   const { data: existingTodo, error } = await supabase.from("todo_items").select("*").eq("id", todoUpdates.id).single()

   if (error) {
      throw new ErrorHandler(404, {
         details: error.details,
         message: "To-do does not exist",
      })
   }

   if (!hasUpdates(todoUpdates, existingTodo)) {
      throw new ErrorHandler(400, {
         message: "No changes detected.",
         details: "Todo failed update validation"
      });
   }

   return true
}
