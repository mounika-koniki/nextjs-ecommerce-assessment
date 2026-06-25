"use client";

import { Product } from "@/lib/types";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";

type AddToCartButtonProps = {
  product: Product;
};

export default function AddToCartButton({
  product,
}: AddToCartButtonProps) {
  const { addToCart } = useCart();

  return (
    <button
      type="button"
      className="add-to-cart-button"
      onClick={() => {
        addToCart(product);
        toast.success("Item added to cart");
  }}
>
  Add to Cart
</button>
 
  );
}

