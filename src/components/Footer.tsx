import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <strong>Simple Store</strong>
          <p>Browse products and manage your cart easily.</p>
        </div>

        <ul className="footer-features">
          <li>Easy browsing</li>
          <li>Category filter</li>
          <li>Cart management</li>
        </ul>

        <ul className="footer-features">
          <li>Easy browsing</li>
          <li>Category filter</li>
          <li>Cart management</li>
        </ul>

        {/* <nav className="footer-links" aria-label="Footer navigation">
          <Link href="/products">Products</Link>
          <Link href="/cart">Cart</Link>
        </nav> */}
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Simple Store. All rights reserved.
      </div>
    </footer>
  );
}