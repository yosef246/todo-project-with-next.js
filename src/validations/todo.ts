import { IToDo } from "@/interfaces/todo";
import Joi from "joi";

export const createTodoValidation = (newTodo: IToDo) => {
  const schema = Joi.object({
    title: Joi.string().min(3).trim().required(),
    description: Joi.string().min(1).max(100).trim().required(),
  });
  return schema.validate(newTodo);
};
