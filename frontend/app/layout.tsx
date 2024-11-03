import Providers from "@/lib/providers";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import React from "react";

export const metadata = {
  title: "Interactive To-Do List",
  description: "A simple interactive to-do list application.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="dark">
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
