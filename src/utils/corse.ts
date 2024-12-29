import { NextResponse } from "next/server";

export default function applyCors(response: NextResponse): void {
  // קריאת ה-Origin מהבקשה
  const origin = response.headers.get("Origin");

  // קריאת הכתובת המורשית ממקור דינמי
  const allowedOrigins = [
    process.env.NODE_ENV === "production"
      ? /\.vercel\.app$/ // כל כתובת של פרויקט ב-Vercel בפרודקשן
      : "http://localhost:3000", // localhost עבור סביבת פיתוח
  ];

  // בדיקה האם ה-Origin מתאים לאחת מהכתובות המורשות
  const isAllowed = allowedOrigins.some((allowed) =>
    typeof allowed === "string"
      ? origin === allowed
      : allowed instanceof RegExp && allowed.test(origin || "")
  );

  if (isAllowed) {
    response.headers.set("Access-Control-Allow-Origin", origin || "*");
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS"
    );
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");
    response.headers.set("Access-Control-Allow-Credentials", "true");
  } else {
    console.warn(`Access denied for origin: ${origin}`);
  }
}
