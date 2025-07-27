import { Rubik } from "next/font/google";
import "./globals.css";
import { metadata } from "./metadata";
import ClientLayout from "./components/ClientLayout";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={`${rubik.variable} antialiased flex flex-col min-h-screen bg-[#0A0A0A] text-white relative z-0`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

export { metadata };