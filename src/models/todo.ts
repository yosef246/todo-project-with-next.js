import mongoose, { model, models } from "mongoose";

//מאפשר לי להגדיר את המבנה של המסמך כדי שישמרו במסד נתונים שלי
const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
    trim: true,
  },
  description: {
    type: String,
    require: true,
    trim: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, //מקשר לי את השדה הזה ליוזר כדי שאני יידע לכל פוסט איזה משתמש יצר אותו
    ref: "User",
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Todo = models.Todo || model("Todo", TodoSchema);

export default Todo;
