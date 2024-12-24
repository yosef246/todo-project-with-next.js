import Todo from "@/models/todo";
import { checkauthorisation } from "@/utils/checkAuthorisation";
import { conectToDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";

interface IParams {
  id: string;
}

//מציאת פוסט אחד לפי הטוקאן שלו
export async function GET(
  request: NextRequest,
  { params }: { params: IParams }
) {
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

    const todo = await Todo.findOne({ _id: params.id, userId: user._id }); //תמצא לי את הפוסט עם האיידי שדומה לאיידי שהכנסתי בכתובת(כפאראמס)
    if (!todo) {
      return NextResponse.json(
        {
          message: "Task not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(todo, { status: 200 });
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

//שינוי פוסט על ידי הטוקאן שלו
export async function PATCH(
  request: NextRequest,
  { params }: { params: IParams }
) {
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

    const { id } = params; //קורא לאיידי של הפאראמס
    const data = await request.json(); //מקבל את המידע החדש
    const updateTodo = await Todo.findByIdAndUpdate(id, data, { new: true }); //אומר לטודו תמצא לי לפי האיידי את הפוסט ותכניס אליו את המידע ששיניתי ותחזיר לי אותו עם המידע החדש

    if (!updateTodo) {
      return NextResponse.json(
        {
          message: "Todo not foundd",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(updateTodo, { status: 200 });
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

//מחיקת פוסט על האיידי שלו
export async function DELETE(
  request: NextRequest,
  { params }: { params: IParams }
) {
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

    const { id } = params;
    const deleteTodo = await Todo.findByIdAndDelete(id);

    if (!deleteTodo) {
      return NextResponse.json(
        {
          message: "Todo not foundd",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "taks removed succsessfully!", data: deleteTodo },
      { status: 200 }
    );
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
