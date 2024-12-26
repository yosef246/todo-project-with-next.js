import { NextResponse } from "next/server";

export default function applyCors(response: NextResponse): void {
  response.headers.set(
    "Access-Control-Allow-Origin",
    "https://todo-project-iitkjxxl0-yosef246s-projects.vercel.app"
  );
  response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  response.headers.set("Access-Control-Allow-Credentials", "true");
}
