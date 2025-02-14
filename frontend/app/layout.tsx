"use client";
import type { Metadata } from "next";
import "./globals.css";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isTokenExpired } from "./utils/auth";

// export const metadata: Metadata = {
//   title: "ToDo App",
//   description: "A simple and efficient ToDo App",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      if (isTokenExpired()) {
        localStorage.removeItem("token");
        router.push("/auth/login");
      }
    };

    checkAuth(); // Check on page load

    const interval = setInterval(checkAuth, 60000 * 2); // Check every 60 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900 min-h-screen">{children}</body>
    </html>
  );
}
