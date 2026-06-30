// import { Product } from "@/lib/types";

// const BASE_URL = "https://fakestoreapi.com";

// export async function getProducts(category?: string): Promise<Product[]> {
//   const url = category
//     ? `${BASE_URL}/products/category/${encodeURIComponent(category)}`
//     : `${BASE_URL}/products`;

//   const response = await fetch(url, {
//     next: { revalidate: 60 },
//   });

//   if (!response.ok) {
//     throw new Error("Failed to fetch products");
//   }

//   return response.json();
// }

// export async function getCategories(): Promise<string[]> {
//   const response = await fetch(`${BASE_URL}/products/categories`, {
//     next: { revalidate: 3600 },
//   });

//   if (!response.ok) {
//     throw new Error("Failed to fetch categories");
//   }

//   return response.json();
// }

// export async function getProductById(id: string): Promise<Product> {
//   const response = await fetch(`${BASE_URL}/products/${id}`, {
//     next: { revalidate: 60 },
//   });

//   if (!response.ok) {
//     throw new Error("Failed to fetch product");
//   }

//   return response.json();
// }

import { Product } from "@/lib/types";

const BASE_URL = "https://fakestoreapi.com";

export async function getProducts(category?: string): Promise<Product[]> {
  const url = category
    ? `${BASE_URL}/products/category/${encodeURIComponent(category)}`
    : `${BASE_URL}/products`;

  try {
    const response = await fetch(url, {
      cache: "no-store",
    });

    console.log("Fetching URL:", url);
    console.log("Response Status:", response.status);

    if (!response.ok) {
      const body = await response.text();
      console.error("Response Body:", body);

      throw new Error(`Failed to fetch products. Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch Error:", error);
    throw error;
  }
}

export async function getCategories(): Promise<string[]> {
  const url = `${BASE_URL}/products/categories`;

  try {
    const response = await fetch(url, {
      cache: "no-store",
    });

    console.log("Fetching Categories:", url);
    console.log("Response Status:", response.status);

    if (!response.ok) {
      const body = await response.text();
      console.error("Response Body:", body);

      throw new Error(`Failed to fetch categories. Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Category Fetch Error:", error);
    throw error;
  }
}

export async function getProductById(id: string): Promise<Product> {
  const url = `${BASE_URL}/products/${id}`;

  try {
    const response = await fetch(url, {
      cache: "no-store",
    });

    console.log("Fetching Product:", url);
    console.log("Response Status:", response.status);

    if (!response.ok) {
      const body = await response.text();
      console.error("Response Body:", body);

      throw new Error(`Failed to fetch product. Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Product Fetch Error:", error);
    throw error;
  }
}