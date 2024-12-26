import { NextResponse } from "next/server";

export function applyCors(response: NextResponse): void {
  response.headers.set(
    "Access-Control-Allow-Origin",
    "https://todo-project-iitkjxxl0-yosef246s-projects.vercel.app"
  );
  response.headers.set(
    "Access-Control-Allow-Methods",
    "POST, OPTIONS, GET, PUT, DELETE"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  response.headers.set("Access-Control-Allow-Credentials", "true");
}
