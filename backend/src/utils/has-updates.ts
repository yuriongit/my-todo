import type { Todo, UpdateTodo } from "@shared/index";

export const hasUpdates = (incoming: UpdateTodo, existing: Todo): boolean => {
   const { id, ...payload } = incoming
   const { id: srcId, ...source } = existing
   
   type payloadKeysProps = (keyof typeof payload)[]

   const payloadKeys = Object.keys(payload) as payloadKeysProps

   // If any key matches the existing value, return false
   return payloadKeys.every(
      key => payload[key] !== source[key]
   )
}
