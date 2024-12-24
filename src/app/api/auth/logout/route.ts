import { checkauthorisation } from "@/utils/checkAuthorisation";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
  response.headers.set(
    "Access-Control-Allow-Origin",
    "https://todo-project-ljmm3khad-yosef246s-projects.vercel.app"
  ); // יש להכניס את הדומיין של ה-Frontend שלך
  response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  response.headers.set("Access-Control-Allow-Credentials", "true");

  // טיפול בבקשות OPTIONS (לגבי CORS Preflight)
  if (request.method === "OPTIONS") {
    return NextResponse.json(null, { status: 200 });
  }

  const user = checkauthorisation();
  if (!user) {
    return NextResponse.json(
      {
        message: "Yor are not authorized",
      },
      { status: 401 }
    );
  }

  cookies().delete("access_token");

  return NextResponse.json(
    {
      message: "Logout seccessfuly!",
    },
    { status: 200 }
  );
}
