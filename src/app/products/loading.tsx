export default function Loading() {
  return (
    <section>
      <h1 className="page-title">Products</h1>

      <div className="products-grid">
        {Array.from({ length: 8 }).map((_, index) => (
          <div className="product-card skeleton-card" key={index}>
            <div className="skeleton skeleton-image" />
            <div className="skeleton skeleton-text" />
            <div className="skeleton skeleton-text small" />
            <div className="skeleton skeleton-text small" />
          </div>
        ))}
      </div>
    </section>
  );
}