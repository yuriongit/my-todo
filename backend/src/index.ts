import { app } from "@app/app";
import { handleError } from "@app/error/errorHandler";
import { todoSchema } from "./schemas/todo.schema";
import { validateRequest } from "./validators/request.validators";
import { TodoController } from "./controllers/todo.controller";

app.post("/todos", validateRequest(todoSchema), TodoController.createTodo)

app.use(handleError)

app.listen(Number(process.env.PORT), "0.0.0.0", () => console.log(`Server up and running:\nhttp://localhost:${process.env.PORT}`))