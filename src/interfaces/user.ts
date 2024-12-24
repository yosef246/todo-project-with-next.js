import { Types } from "mongoose";

export interface ILogin {
  password: string;
  email: string;
}

//מייבא מהלוגאין את האימייל והסיסמא כדי לחסוך בקוד
export interface IRegister extends ILogin {
  username: string;
}

export interface ITokenPayload {
  _id: Types.ObjectId;
  username: string;
  email: string;
}
