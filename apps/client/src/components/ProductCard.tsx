"use client";

import useCartStore from "@/stores/cartStore";
import { ProductType } from "@/types";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

const ProductCard = ({ product }: { product: ProductType }) => {
  const [productTypes, setProductTypes] = useState({
    size: product.sizes[0],
    color: product.colors[0],
  });

  const { addToCart } = useCartStore();

  const handleProductType = ({
    type,
    value,
  }: {
    type: "size" | "color";
    value: string;
  }) => {
    setProductTypes((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity: 1,
      selectedSize: productTypes.size,
      selectedColor: productTypes.color,
    });
    toast.success("Product added to cart");
  };

  return (
    <div className="shadow-lg rounded-lg overflow-hidden bg-white dark:bg-gray-900 transition-colors">
      {/* IMAGE */}
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-[2/3] bg-gray-100 dark:bg-gray-800">
          <Image
            src={product.images?.[productTypes.size] || ""}
            alt={product.name}
            fill
            className="object-cover hover:scale-105 transition-all duration-300"
          />
        </div>
      </Link>
      {/* PRODUCT DETAIL */}
      <div className="flex flex-col gap-4 p-4">
        <h1 className="font-medium dark:text-white">{product.name}</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {product.shortDescription}
        </p>
        {/* PRODUCT TYPES */}
        <div className="flex items-center gap-4 text-xs">
          {/* SIZES */}
          <div className="flex flex-col gap-1">
            <span className="text-gray-500 dark:text-gray-400">Size</span>
            <select
              name="size"
              id="size"
              className="ring ring-gray-300 dark:ring-gray-700 rounded-md px-2 py-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors"
              onChange={(e) =>
                handleProductType({ type: "size", value: e.target.value })
              }
            >
              {product.sizes.map((size) => (
                <option key={size} value={size} className="dark:bg-gray-800">
                  {size.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
          {/* COLORS */}
          <div className="flex flex-col gap-1">
            <span className="text-gray-500 dark:text-gray-400">Color</span>
            <div className="flex items-center gap-2">
              {product.colors.map((color) => (
                <div
                  className={`cursor-pointer border-1 rounded-full p-[1.2px] transition-all ${
                    productTypes.color === color
                      ? "border-gray-600 dark:border-gray-300 ring-1 ring-gray-400 dark:ring-gray-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                  key={color}
                  onClick={() =>
                    handleProductType({ type: "color", value: color })
                  }
                  title={color}
                >
                  <div
                    className="w-[14px] h-[14px] rounded-full border border-gray-200 dark:border-gray-600"
                    style={{ backgroundColor: color }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* PRICE AND ADD TO CART BUTTON */}
        <div className="flex items-center justify-between">
          <p className="font-medium dark:text-white">
            ₱{product.price.toFixed(2)}
          </p>
          <button
            onClick={handleAddToCart}
            className="ring-1 ring-gray-300 dark:ring-gray-600 shadow-lg rounded-md px-2 py-1 text-sm cursor-pointer text-gray-900 dark:text-gray-100 hover:text-white dark:hover:text-black hover:bg-black dark:hover:bg-white transition-all duration-300 flex items-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;