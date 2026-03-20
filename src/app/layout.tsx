import type { Metadata } from "next";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

import { StudentProvider } from "./context/StudentContext";
import ThemeToggle from "./components/theme/ThemeToggle";
import { ToastContainer } from "react-toastify";

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
        <StudentProvider>
          <ThemeToggle />
          {children}
          <ToastContainer position="top-right" autoClose={2000} theme="light" />
        </StudentProvider>
      </body>
    </html>
  );
}