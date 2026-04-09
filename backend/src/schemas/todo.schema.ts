import { z } from "zod/v4";

export const todoSchema = z.object({
   title: z.string().min(3).max(25),
   desc: z.string().min(10).max(150)
}).strict()