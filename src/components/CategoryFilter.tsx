"use client";

import { useRouter, useSearchParams } from "next/navigation";

type CategoryFilterProps = {
  categories: string[];
  selectedCategory?: string;
};

export default function CategoryFilter({
  categories,
  selectedCategory,
}: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleCategoryChange(category: string) {
    const params = new URLSearchParams(searchParams.toString());

    // Reset pagination whenever category changes
    params.delete("page");

    if (category === "all") {
      params.delete("category");
    } else {
      params.set("category", category);
    }

    const queryString = params.toString();

    router.push(queryString ? `/products?${queryString}` : "/products");
  }

  return (
    <div className="category-filter">
      <button
        type="button"
        className={
          !selectedCategory
            ? "category-button active"
            : "category-button"
        }
        onClick={() => handleCategoryChange("all")}
      >
        All
      </button>

      {categories.map((category) => (
        <button
          type="button"
          key={category}
          className={
            selectedCategory === category
              ? "category-button active"
              : "category-button"
          }
          onClick={() => handleCategoryChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}