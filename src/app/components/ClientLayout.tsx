"use client";

import Header from "./Header";
import Footer from "./Footer";
import { CartProvider } from "./CartContext";
import { ModalContextProvider, ModalContext, ModalContextType } from "./ModalContext";
import { ReactNode, useContext } from "react";

function ModalContainer() {
  const { isOpen } = useContext(ModalContext) as ModalContextType;

  return (
    <div
      className={`fixed inset-0 z-100 ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      id="modal-container"
    >
      {/* Модалки будут рендериться здесь через Portal или прямым рендерингом */}
    </div>
  );
}

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <ModalContextProvider>
        <Header />
        <div className="z-10 flex-grow">{children}</div>
        <ModalContainer />
        <Footer />
      </ModalContextProvider>
    </CartProvider>
  );
}