"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { usePathname } from "next/navigation";

export default function Header() {
  const { totalItems } = useCart();

  const pathname = usePathname();

  if (pathname === "/") {
  return null;
  }

  return (
    <header className="site-header">
      <Link href="/products" className="logo">
        Simple Store
      </Link>

      <Link
        href="/cart"
        className="cart-link"
        aria-label={`Cart with ${totalItems} items`}
      >
        <ShoppingCart size={22} />
        <span>Cart</span>

        <span className="cart-count">{totalItems}</span>
      </Link>
    </header>
  );
}