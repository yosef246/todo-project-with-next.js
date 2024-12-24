import mongoose, { model, models } from "mongoose";

//מאפשר לי להגדיר את המבנה של המסמך כדי שישמרו במסד נתונים שלי
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    require: true,
    minlength: 8,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = models.User || model("User", UserSchema);

export default User;
