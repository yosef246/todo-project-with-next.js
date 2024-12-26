import { ILogin } from "@/interfaces/user";
import User from "@/models/user";
import bcrypt from "bcrypt";
import { conectToDB } from "@/utils/database";
import { loginValidation } from "@/validations/user";
import { NextRequest, NextResponse } from "next/server";
import { generateUserToken } from "@/utils/token";
import { cookies } from "next/headers";
import { applyCors } from "@/utils/corse";

export async function POST(request: NextRequest, response: NextResponse) {
  const corse = NextResponse.json(null, { status: 200 });

  // טיפול בבקשת OPTIONS (Preflight)
  if (request.method === "OPTIONS") {
    applyCors(corse); // החלת CORS על תשובת OPTIONS
    return response; // מחזיר תשובה עבור ה-preflight
  }

  // החלת CORS על תשובת POST
  applyCors(response);

  try {
    const credentials: ILogin = await request.json();

    const { error } = loginValidation(credentials);
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

    const user = await User.findOne({ email: credentials.email });
    if (!user) {
      return NextResponse.json(
        {
          message: "Email or Password is incorrect!",
        },
        { status: 400 }
      );
    }

    //בודק האם הסיסמא שהמשתמש הכניס שווה לסיסמא שלו במסד נתונים לצורך אבטחה
    const isPasswordValid = await bcrypt.compare(
      credentials.password,
      user.password
    );
    if (!isPasswordValid) {
      return NextResponse.json(
        {
          message: "Email or Password is incorrect!",
        },
        { status: 400 }
      );
    }

    const token = generateUserToken({
      _id: user._id,
      username: user.username,
      email: user.email,
    });

    cookies().set({
      name: "access_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return NextResponse.json(
      {
        message: "Login seccessfuly!",
        data: {
          username: user.username,
          email: user.email,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "An error occurred while trying to login the user.",
      },
      { status: 500 }
    );
  }
}
