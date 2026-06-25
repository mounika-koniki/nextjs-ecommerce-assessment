"use client";

import { CartProvider } from "@/context/CartContext";
import { Toaster } from "react-hot-toast";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      {children}

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2500,
        }}
      />
    </CartProvider>
  );
}