"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
    totalItems,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <section className="cart-page">
        <h1 className="cart-heading">Your Cart</h1>

        <div className="empty-cart">
          <p>Your cart is empty.</p>

          <Link href="/products" className="continue-shopping-button">
            Continue Shopping
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="cart-page">
      <h1 className="cart-heading">Your Cart ({totalItems})</h1>

      <div className="cart-layout">
        <section className="cart-items">
          {cartItems.map((item) => (
            <article key={item.id} className="cart-item">
              <Link
                href={`/products/${item.id}`}
                className="cart-image-wrapper"
                aria-label={`View ${item.title}`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="cart-image"
                  sizes="130px"
                />
              </Link>

              <div className="cart-item-info">
                <Link
                  href={`/products/${item.id}`}
                  className="cart-title-link"
                >
                  <h2>{item.title}</h2>
                </Link>

                <p className="cart-unit-price">
                  ${item.price.toFixed(2)} each
                </p>

                <div className="quantity-row">
                  <span>Quantity</span>

                  <div className="quantity-controls">
                    <button
                      type="button"
                      onClick={() => decreaseQuantity(item.id)}
                      disabled={item.quantity === 1}
                      aria-label={`Decrease quantity of ${item.title}`}
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      type="button"
                      onClick={() => increaseQuantity(item.id)}
                      aria-label={`Increase quantity of ${item.title}`}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="cart-item-actions">
                <strong>
                  ${(item.price * item.quantity).toFixed(2)}
                </strong>

                <button
                  type="button"
                  className="remove-button"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </article>
          ))}
        </section>

        <aside className="order-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Total items</span>
            <strong>{totalItems}</strong>
          </div>

          <div className="summary-row total-row">
            <span>Total</span>
            <strong>${totalPrice.toFixed(2)}</strong>
          </div>

          <Link href="/products" className="continue-shopping-button">
            Continue Shopping
          </Link>
        </aside>
      </div>
    </section>
  );
}