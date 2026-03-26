"use client";

import { useState } from "react";
import { ProductsType } from "@/types";
import Categories from "./Categories";
import ProductCard from "./ProductCard";
import Link from "next/link";
import Filter from "./Filter";

// TEMPORARY
const internalProducts: ProductsType = [
  {
    id: 1,
    name: "Cold Brew Coffee",
    shortDescription:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    description:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    price: 250,
    sizes: ["250ml", "1L", "2L"],
    colors: ["black", "white"],
    images: {
      "250ml": "/products/cold_brew_bottle-250ml.png",
      "1L": "/products/cold_brew_coffee-1L.png",
      "2L": "/products/cold_brew_coffee-2L.png"
    },
  },
  {
    id: 2,
    name: "Guji uraga tome beans",
    shortDescription:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    description:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    price: 500,
    sizes: ["200g"],
    colors: [""],
    images: { "200g": "/products/Guji_uraga_tome_beans-200g.png" },
  },
  {
    id: 3,
    name: "Caturra and Bourbon Beans",
    shortDescription:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    description:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    price: 400,
    sizes: ["200g"],
    colors: [""],
    images: {
      "200g": "/products/Caturra_Bourbon-200g.png",
    },
  },
  {
    id: 4,
    name: "Kapangan Natural Beans",
    shortDescription:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    description:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    price: 300,
    sizes: ["200g"],
    colors: [""],
    images: { "200g": "/products/Kapangan_Natural_beans-200g.png" },
  },
  {
    id: 5,
    name: "",
    shortDescription:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    description:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    price: 49.9,
    sizes: [""],
    colors: [""],
    images: {
      s: "/products/5s.png",
      m: "/products/5m.png",
      l: "/products/5l.png",
    },
  },
  {
    id: 6,
    name: "",
    shortDescription:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    description:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    price: 59.9,
    sizes: [""],
    colors: [""],
    images: { "40": "/products/6-40.png", "42": "/products/6-42.png", "43": "/products/6-43.png", "44": "/products/6-44.png" },
  },
  {
    id: 7,
    name: "",
    shortDescription:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    description:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    price: 69.9,
    sizes: [""],
    colors: [""],
    images: { "40": "/products/7-40.png", "42": "/products/7-42.png", "43": "/products/7-43.png" },
  },
  {
    id: 8,
    name: "",
    shortDescription:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    description:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    price: 59.9,
    sizes: [""],
    colors: [""],
    images: { s: "/products/8s.png", m: "/products/8m.png", l: "/products/8l.png" },
  },
];

const ProductList = ({
  category,
  params,
  products: externalProducts,
}: {
  category?: string;
  params?: "homepage" | "products";
  products?: ProductsType;
}) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // When a products prop is passed (e.g. from tests or custom callers),
  // use inline category filtering instead of the URL-based Categories component.
  if (externalProducts) {
    const uniqueCategories = Array.from(
      new Set(externalProducts.map((p) => p.category).filter(Boolean))
    ) as string[];

    const filtered = activeCategory
      ? externalProducts.filter((p) => p.category === activeCategory)
      : externalProducts;

    return (
      <div className="w-full">
        {uniqueCategories.length > 0 && (
          <div className="flex gap-2 mb-4">
            {uniqueCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 rounded-md text-sm border ${
                  activeCategory === cat
                    ? "bg-black text-white border-black"
                    : "border-gray-300 text-gray-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-12">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Categories />
      {params === "products" && <Filter />}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-12">
        {internalProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Link
        href={category ? `/products/?category=${category}` : "/products"}
        className="flex justify-end mt-4 underline text-sm text-gray-500 dark:text-gray-400"
      >
        View all products
      </Link>
    </div>
  );
};

export default ProductList;
