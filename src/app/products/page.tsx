import { getCategories, getProducts } from "@/lib/api";
import CategoryFilter from "@/components/CategoryFilter";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products | Simple Store",
  description: "Browse products available in Simple Store.",
  alternates: {
    canonical: "/products",
  },
};

type ProductsPageProps = {
  searchParams: Promise<{
    category?: string;
    page?: string;
  }>;
};

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const { category, page } = await searchParams;

  const currentPage = Number(page) || 1; 
  const productsPerPage = 8;

  const [products, categories] = await Promise.all([
    getProducts(category),
    getCategories(),
  ]);

const totalPages = Math.ceil(products.length / productsPerPage);

const startIndex = (currentPage - 1) * productsPerPage;

const paginatedProducts = products.slice(
  startIndex,
  startIndex + productsPerPage
);

  
return (
  <section>
    <h1 className="page-title">Products</h1>

    <CategoryFilter
      categories={categories}
      selectedCategory={category}
    />

    {products.length === 0 ? (
      <p>No products found.</p>
    ) : (
      <>
        <div className="products-grid">
          {paginatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          category={category}
        />
      </>
    )}
  </section>
);
}

