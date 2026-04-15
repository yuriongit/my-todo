import type { Todo, UpdateTodo } from "@shared/index";

export const hasUpdates = (incoming: UpdateTodo, existing: Todo): boolean => {
   const { id: incomingId, ...payload } = incoming
   const { id: existingId, ...source } = existing

   return !Object.keys(incoming).every(
      (key) => payload[key as keyof typeof payload] === source[key as keyof typeof source]
   );
}
