import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById } from "@/lib/api";
import AddToCartButton from "@/components/AddToCartButton";


type ProductDetailPageProps = {
  params: Promise<{
    id: string;

  }>;
};

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const product = await getProductById(id);

    return {
      title: product.title,
      description: product.description,
      alternates: {
        canonical: `/products/${id}`,
      },
    };
  } catch {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }
}

export const revalidate = 60;

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;

  try {
    const product = await getProductById(id);

    return (
      <section className="product-detail-page">
        <Link href="/products" className="back-link">
          ← Back to Products
        </Link>

        <div className="product-detail">
          <div className="product-detail-image-wrapper">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="product-detail-image"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          <div className="product-detail-content">
            <p className="product-category">{product.category}</p>

            <h1>{product.title}</h1>

            <p className="product-rating">
              ★ {product.rating.rate} ({product.rating.count} reviews)
            </p>

            <p className="product-detail-price">
              ${product.price.toFixed(2)}
            </p>

            <p className="product-description">{product.description}</p>

            <AddToCartButton product={product} />
          </div>
        </div>
      </section>
    );
  } catch {
    notFound();
  }
}