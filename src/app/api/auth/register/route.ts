import { IRegister } from "@/interfaces/user";
import User from "@/models/user";
import { conectToDB } from "@/utils/database";
import { registerValidation } from "@/validations/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { generateUserToken } from "@/utils/token";
import { cookies } from "next/headers";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    //יוצר משתנה שהוא מסוג האינטרפייס שיצרתי
    const newUser: IRegister = await request.json();

    //שולח את היוזר החדש לבדיקת וולידציה
    const { error } = registerValidation(newUser);

    if (error) {
      return NextResponse.json(
        {
          //פה אני מציג את האררור במקום ה-0
          message: error.details[0].message,
        },
        { status: 400 }
      );
    }

    //מתחבר למסד נתונים שלי לאחר כל בקשה כיון שאנחנו בסביבה של סרברלאס
    await conectToDB();

    //מחפש אמייל בשרת שדומה לאמייל של המשתמש שניכנס כדי לבדוק האם הוא קיים כבר
    let user = await User.findOne({ email: newUser.email });
    if (user) {
      return NextResponse.json(
        {
          message: "User already exists",
        },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10); //יוצר לי ערך רנדומלי ומוסיף לי אותו לסיסמא כדי להפוך אותה לייחודית ומאובטחת יותר
    newUser.password = await bcrypt.hash(newUser.password, salt); //ממיר לי את הקלט של הסיסמא לערך ייחודי וקבוע

    //מתחבר למסד נתונים שלי לאחר כל בקשה כיון שאנחנו בסביבה של סרברלאס
    await conectToDB();
    user = await User.create(newUser); //מוסיף את היוזר החדש

    //יצירת טוקאן
    const token = generateUserToken({
      _id: user._id,
      username: user.username,
      email: user.email,
    });

    //יצירת קוקויז
    cookies().set({
      name: "access_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return NextResponse.json(
      {
        message: "Register successfuly!",
        data: {
          username: user.username,
          email: user.email,
          _id: user._id,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "An error occurred while trying to register the user.",
      },
      { status: 500 }
    );
  }
}
