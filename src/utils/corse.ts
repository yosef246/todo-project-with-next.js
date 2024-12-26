import { NextResponse } from "next/server";

export default function applyCors(response: NextResponse): void {
  const allowedOrigins = [
    "https://todo-project-7qfq-6m9713wgs-yosef246s-projects.vercel.app", // הכתובת החיצונית
    // הוספה של כתובת אחרת אם צריך
  ];

  const origin = response.headers.get("Origin");

  if (allowedOrigins.includes(origin || "")) {
    response.headers.set("Access-Control-Allow-Origin", origin || "*");
    response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");
    response.headers.set("Access-Control-Allow-Credentials", "true");
  }
}
