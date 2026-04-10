import type { CreateTodo, Todo } from "@/services/todo.service";
import { ErrorHandler } from "@/middleware/error/errorHandler";
import { supabase } from "@app/supabase/client";

type InsertTodoResponse = {
	message: string;
};

export const TodoRepo = {
	async insert(todo: CreateTodo): Promise<InsertTodoResponse> {
		const { error } = await supabase.from("todo_items").insert(todo);

		if (error) {
			throw new ErrorHandler(403, {
				details: error.details,
				message: error.message,
			});
		}

		return {
			message: `To-do created succesfully`,
		};
	},
	async query(todoId: number): Promise<Todo> {
		const { data: todo, error } = await supabase
			.from("todo_items")
			.select("*")
			.eq("id", todoId)
			.single();

		if (error) {
			throw new ErrorHandler(404, {
				details: error.details,
				message: `To-do does not exist`,
			});
		}
		return todo;
	},
};
