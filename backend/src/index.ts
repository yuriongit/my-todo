import { app } from "@app/app";
import { handleError } from "@/middleware/error/errorHandler";
import { todoQuerySchema, createTodoSchema } from "@schemas/todo.schema";
import { validateBody } from "@middleware/validators/todoSchema.validator";
import { TodoController } from "./controllers/todo.controller";

app.post(
   "/todos", 
   validateBody(createTodoSchema), 
   TodoController.createTodo,
)
app.get(
   "/todos", 
   validateBody(todoQuerySchema), 
   TodoController.queryTodo,
)

app.use(handleError)

app.listen(Number(process.env.PORT), "0.0.0.0", () =>
	console.log(`Server up and running:\nhttp://localhost:${process.env.PORT}`),
)