import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";
import { Product } from "@/lib/types";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="product-card">
      <Link
        href={`/products/${product.id}`}
        className="product-image-link"
      >
        <div className="product-image-wrapper">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="product-image"
            sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 25vw"
          />
        </div>
      </Link>

      <div className="product-card-content">
        <p className="product-category">{product.category}</p>

        <Link href={`/products/${product.id}`}>
          <h2 className="product-title">{product.title}</h2>
        </Link>

        <p className="product-rating">
          ★ {product.rating.rate} ({product.rating.count})
        </p>

        <p className="product-price">
          ${product.price.toFixed(2)}
        </p>

        <AddToCartButton product={product} />
      </div>
    </article>
  );
}