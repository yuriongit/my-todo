import { z } from "zod/v4"

export const todoSchema = z.strictObject({
   id: z.number().min(1),
   title: z.string().min(3).max(25),
   desc: z.string().min(10).max(150),
})

export const createTodoSchema = todoSchema.omit({
   id: true,
})

export const queryTodoSchema = z.strictObject({
   id: z.number().min(1),
})
