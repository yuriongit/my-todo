import { app } from "@app/app"
import { validateBody } from "@middleware/validators/todo.body.validator"
import {
   createTodoSchema,
   deleteTodoSchema,
   getTodoSchema,
   updateTodoSchema
} from "@shared/index"
import { handleError } from "@middleware/error/error-handler"
import { TodoController } from "@controllers/todo.controller"
import { validateQuery } from "@middleware/validators/todo.query.validator"

app.post("/todos", validateBody(createTodoSchema), TodoController.createTodo)
app.get("/todos", validateQuery(getTodoSchema), TodoController.getTodo)
app.put("/todos", validateBody(updateTodoSchema), TodoController.updateTodo)
app.delete("/todos", validateBody(deleteTodoSchema), TodoController.deleteTodo)

app.use(handleError)

app.listen(Number(process.env.PORT), "0.0.0.0", () =>
   console.log(`Server up and running:\nhttp://localhost:${process.env.PORT}`),
)
