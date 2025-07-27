"use client";

import Header from "./Header";
import Footer from "./Footer";
import { CartProvider } from "./CartContext";
import { ModalContextProvider } from "./ModalContext";
import { ReactNode } from "react";

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <ModalContextProvider>
        <Header />
        <div className="z-10 flex-grow">{children}</div>
        <Footer />
      </ModalContextProvider>
    </CartProvider>
  );
}