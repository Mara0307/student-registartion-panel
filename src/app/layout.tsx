import type { Metadata } from "next";
import "./globals.css";
import { StudentProvider } from "./context/StudentContext";
import ThemeToggle from "./components/theme/ThemeToggle";

export const metadata: Metadata = {
  title: "Student Registration Management Panel",
  description: "Student management panel built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeToggle />
        <StudentProvider>{children}</StudentProvider>
      </body>
    </html>
  );
}