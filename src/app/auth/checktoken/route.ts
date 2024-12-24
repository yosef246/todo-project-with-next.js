import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  if (!token) {
    // אם אין טוקן, מחזירים שגיאה
    return NextResponse.json(
      { message: "Unauthorized: Token not found" },
      { status: 401 }
    );
  }
  // אם הטוקן קיים, אפשר להחזיר תגובה עם מידע
  return NextResponse.json({ message: "token is exist", success: true, token });
}
