import { ErrorHandler } from "@/middleware/error/error-handler";
import { TodoRepo } from "../todo.repo";
import { hasUpdates } from "@/utils/has-updates";
import type { UpdateTodo } from "@/core/controllers/todo.controller";

export const verifyTodoUpdates = async (todoInQuestion: UpdateTodo): Promise<boolean> => {
   const existingTodo = await TodoRepo.getById(todoInQuestion)

   if (!hasUpdates(todoInQuestion, existingTodo)) {
      throw new ErrorHandler(400, {
         message: "No changes detected.",
         details: "Todo failed update validation"
      });
   }

   return true
}
