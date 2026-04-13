import { z } from "zod/v4"

export const todoSchema = z.strictObject({
   id: z.number().min(1),
   title: z.string().min(3).max(35),
   desc: z.string().min(10).max(200),
})

export const createTodoSchema = todoSchema.omit({
   id: true,
})
export const getTodoSchema = z.strictObject({
   id: z.coerce.number()
})
export const updateTodoSchema = todoSchema.partial({ title: true, desc: true })
export const deleteTodoSchema = todoSchema.pick({ id: true })