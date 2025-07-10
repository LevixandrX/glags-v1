import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { CartProvider } from "./components/CartContext";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "GLAGS Shop",
  description: "Магазин стеклянных сувениров",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={`${rubik.variable} antialiased flex flex-col min-h-screen bg-[#0A0A0A] text-white relative z-0`}>
        <CartProvider>
          <Header />
          <div className="z-10 flex-grow">{children}</div>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}