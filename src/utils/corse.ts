import { NextResponse } from "next/server";

export default function applyCors(response: NextResponse): void {
  // רשימת כתובות מורשות, כולל כתובות משתנות של Vercel
  const allowedOrigins = [
    "http://localhost:3000", // פיתוח
    /\.vercel\.app$/, // תבנית לכל כתובת של Vercel
  ];

  const origin = response.headers.get("Origin");

  // בדיקה אם הכתובת קיימת ברשימה או מתאימה לתבנית
  const isAllowed = allowedOrigins.some((allowed) => {
    if (typeof allowed === "string") {
      return allowed === origin;
    }
    return allowed.test(origin || "");
  });

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
