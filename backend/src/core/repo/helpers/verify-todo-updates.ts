import { ErrorHandler } from "@middleware/error/error-handler";
import { TodoRepo } from "@repo/todo.repo";
import { hasUpdates } from "@utils/has-updates";
import type { UpdateTodo } from "@shared/index";

export const verifyTodoUpdates = async (todoInQuestion: UpdateTodo): Promise<boolean> => {
   if (Object.keys(todoInQuestion).length <= 1) {
      throw new ErrorHandler(400, {
         message: "Neither title or desc was specified",
         details: "Todo failed update validation"
      })
   }

   const existingTodo = await TodoRepo.getById(todoInQuestion)

   if (!hasUpdates(todoInQuestion, existingTodo)) {
      throw new ErrorHandler(400, {
         message: "No changes detected.",
         details: "Todo failed update validation"
      });
   }

   return true
}
