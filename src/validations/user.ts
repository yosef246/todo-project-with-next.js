import { ILogin, IRegister } from "@/interfaces/user";
import Joi from "joi";

//זה התבנית של הוואלידציה שפה אני בודק שהאינטרפייס שיצרתי זה בעצם מה שבאמת רציתי ליצור
export const registerValidation = (user: IRegister) => {
  const schema = Joi.object({
    username: Joi.string().min(2).max(20).trim().required(),
    email: Joi.string().min(7).max(50).lowercase().trim().email().required(),
    password: Joi.string().min(8).max(20).required(),
  });

  return schema.validate(user);
};

export const loginValidation = (user: ILogin) => {
  const schema = Joi.object({
    password: Joi.string().min(8).max(20).required(),
    email: Joi.string().min(7).max(50).lowercase().trim().email().required(),
  });
  return schema.validate(user);
};
