import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";

export const metadata: Metadata = {
  title: "ToDo",
  description: "Professional todo list that maked yourself.",
  creator: "yosef palas",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "TODO-LIST",
    description: "Professional todo list that maked yourself.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
