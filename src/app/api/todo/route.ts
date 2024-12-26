import applyCors from "@/app/auth/corse/page";
import { IToDo } from "@/interfaces/todo";
import Todo from "@/models/todo";
import { checkauthorisation } from "@/utils/checkAuthorisation";
import { conectToDB } from "@/utils/database";
import { createTodoValidation } from "@/validations/todo";
import { NextRequest, NextResponse } from "next/server";

//מציאת כל הפוסטים של משתמש מסויים
export async function GET(request: NextRequest, response: NextResponse) {
  const corse = NextResponse.json(null, { status: 200 });
  applyCors(corse);
  if (request.method === "OPTIONS") {
    return response; // החזרת תשובה ל-preflight
  }
  try {
    const user = checkauthorisation();
    if (!user) {
      return NextResponse.json(
        {
          message: "Yor are not authorized",
        },
        { status: 401 }
      );
    }

    //מתחבר למסד נתונים שלי לאחר כל בקשה כיון שאנחנו בסביבה של סרברלאס
    await conectToDB();
    const tasks = await Todo.find({ userId: user._id }); //לוקח את היוזר אידי של הפוסט ומשווה ליוזר אידי של הטוקאן של המשתמש המחובר ומוצא אותו

    return NextResponse.json({ tasks: tasks }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Task not found",
      },
      { status: 500 }
    );
  }
}

//העלאת פוסט חדש על ידי המשתמש שמחובר
export async function POST(request: NextRequest, response: NextResponse) {
  const corse = NextResponse.json(null, { status: 200 });
  applyCors(corse);
  if (request.method === "OPTIONS") {
    return response; // החזרת תשובה ל-preflight
  }
  try {
    //בודק האם המשתמש מחובר עי זה שאני בודק אם יש לו טוקאן
    const user = checkauthorisation();
    if (!user) {
      return NextResponse.json(
        {
          message: "Yor are not authorized",
        },
        { status: 401 }
      );
    }

    //פה אני מקבל את המידע ואומר מאיזה סוג הוא
    const data: IToDo = await request.json();

    const { error } = createTodoValidation(data);
    if (error) {
      return NextResponse.json(
        {
          message: error.details[0].message,
        },
        { status: 400 }
      );
    }

    //מתחבר למסד נתונים שלי לאחר כל בקשה כיון שאנחנו בסביבה של סרברלאס
    await conectToDB();

    //מוסיף את הטאסק החדש שלי
    const newTask = await Todo.create({
      title: data.title,
      description: data.description,
      userId: user._id, //הטוקאן שאני מקבל כאן יהיה אותו טוקאן של המשתמש שהרגע מחובר
    });

    return NextResponse.json(
      {
        message: "Task created successfully!",
        task: newTask,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Task uncreated successfully",
      },
      { status: 500 }
    );
  }
}
