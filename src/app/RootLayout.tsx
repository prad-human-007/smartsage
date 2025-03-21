"use client";

import {  Quicksand } from "next/font/google";
import Navbar from "@/app/components/home/Navbar";
import { AuthProvider } from "@/utils/supabase/auth-context";

/* ✅ Load Google Fonts correctly */
const quicksand = Quicksand({ weight: "400", subsets: ["latin"], display: "swap" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${quicksand.className} antialiased`}>
        <AuthProvider>
          <div className="px-3"><Navbar/></div>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
