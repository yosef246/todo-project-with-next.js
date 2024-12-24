import { checkauthorisation } from "@/utils/checkAuthorisation";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
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
