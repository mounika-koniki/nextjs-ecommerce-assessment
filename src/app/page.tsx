import Link from "next/link";

export default function HomePage() {
  return (
    <main className="home-page">
      <section className="hero-section">
        <p className="hero-label">WELCOME TO SIMPLE STORE</p>

        <h1>Shop products easily.</h1>

        <p className="hero-description">
          Browse products, filter by category, view product details, and manage
          your cart in one place.
        </p>

        <div className="hero-actions">
          <Link href="/products" className="primary-button">
            Browse Products
          </Link>

          {/* <Link href="/cart" className="secondary-button">
            View Cart
          </Link> */}
        </div>
      </section>

      <section className="home-features">
        <div className="feature-card">
          <h2>Browse Products</h2>
          <p>Explore products fetched from the API.</p>
        </div>

        <div className="feature-card">
          <h2>Filter Categories</h2>
          <p>Find products quickly using category filters.</p>
        </div>

        <div className="feature-card">
          <h2>Manage Cart</h2>
          <p>Add items, update quantity, and check the total price.</p>
        </div>
      </section>
    </main>
  );
}