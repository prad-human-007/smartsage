import type { Metadata } from "next";
import "./globals.css";
import { Pacifico , Freckle_Face , Ribeye_Marrow , Readex_Pro, Dancing_Script, Noto_Serif, Quicksand, Lora} from "next/font/google";
import localFont from "next/font/local";
import Navbar from "@/components/home/Navbar";

/* ✅ Load Google Pacifico font correctly */
const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const freckle_face = Freckle_Face({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
})

const ribeye_marrow = Ribeye_Marrow({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
})

const readex_pro = Readex_Pro ({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
})
const dancing_script = Dancing_Script ({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
})

const noto_serif = Noto_Serif ({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
})

const lora = Lora ({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
})

const quicksand = Quicksand ({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
})


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${quicksand.className} antialiased `}>
        <div className="px-3"><Navbar/></div>
        {children}
      </body>
    </html>
  );
}
