import { NextResponse } from "next/server";

export default function applyCors(response: NextResponse): void {
  const allowedOrigins = [
    "https://todo-project-45nf-9tud6yuhd-yosef246s-projects.vercel.app", // פרויקט פרודקשן
    "http://localhost:3000", // סביבת פיתוח
  ];

  const origin = response.headers.get("Origin");

  if (allowedOrigins.includes(origin || "")) {
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
