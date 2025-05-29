import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin", "cyrillic"], // Поддержка кириллицы для русского текста
  weight: ["400", "500", "700"], // Поддержка разных весов (regular, medium, bold)
});

export const metadata: Metadata = {
  title: "GLAGS Shop",
  description: "Магазин стеклянных сувениров",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${rubik.variable} antialiased flex flex-col min-h-screen`}>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}