import mongoose from "mongoose";
import Todo from "@/models/todo";
import User from "@/models/user";

let isConnected = false;

export const conectToDB = async () => {
  if (isConnected) return;

  mongoose.set("strictQuery", true); // בודק שהשאילתות פונות רק לשדות שהגדרנו ביוזר ובטודו ובמידה ונפנה לשדה שלא קיים אז הוא ייתעלם ממנו

  if (!process.env.MONGO_CONNECTION_STRING)
    throw new Error("MongoDB URI is Missing!");

  mongoose.connect(process.env.MONGO_CONNECTION_STRING).then(
    () => {
      isConnected = true;
      User.init();
      Todo.init();
      console.log("Connected to MongoDB");
    },
    (err) => {
      console.log(err);
      console.log("Failed to connect to MongoDB");
    }
  );
};
