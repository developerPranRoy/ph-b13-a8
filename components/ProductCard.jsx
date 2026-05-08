"use client";

import Link from "next/link";
import { FiStar, FiShoppingCart, FiEye } from "react-icons/fi";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5 text-amber-400">
      {Array.from({ length: 5 }).map((_, i) => {
        const starNumber = i + 1;
        if (starNumber <= Math.floor(rating)) {
          return <BsStarFill key={i} size={14} />;
        }
        if (starNumber === Math.ceil(rating) && rating % 1 >= 0.5) {
          return <BsStarHalf key={i} size={14} />;
        }
        return <BsStar key={i} size={14} className="text-gray-300" />;
      })}
    </div>
  );
}

function getBadgeClass(badge) {
  if (!badge) return "";
  const lower = badge.toLowerCase();
  if (lower.includes("sale") || lower.includes("off")) return "bg-red-500 text-white";
  if (lower.includes("new")) return "bg-blue-500 text-white";
  if (lower.includes("top") || lower.includes("rated")) return "bg-amber-500 text-white";
  return "bg-emerald-500 text-white";
}

export default function ProductCard({ product }) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="product-card bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border border-gray-100 group transition-all duration-300">
      <div className="relative overflow-hidden h-56 bg-sand-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Link
            href={`/products/${product.id}`}
            className="btn-summer px-6 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg transform translate-y-6 group-hover:translate-y-0 transition-all duration-300"
          >
            <FiEye size={18} />
            Quick View
          </Link>
        </div>

        {product.badge && (
          <span
            className={`absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full ${getBadgeClass(product.badge)}`}
          >
            {product.badge}
          </span>
        )}

        {discount > 0 && (
          <span className="absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full bg-green-500 text-white">
            -{discount}%
          </span>
        )}
      </div>

      <div className="p-5">
        <span className="text-xs font-medium text-ocean-500 uppercase tracking-widest">
          {product.category}
        </span>

        <h3 className="font-display font-bold text-ocean-900 mt-2 mb-3 text-base leading-tight line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>

        <div className="flex items-center gap-2 mb-4">
          <StarRating rating={product.rating || 0} />
          <span className="text-xs text-gray-500 font-medium">
            {product.rating?.toFixed(1)} / 5
          </span>
        </div>

        <div className="flex items-center justify-between mb-5">
          <div className="flex items-baseline gap-2">
            <span className="font-display font-bold text-coral-500 text-2xl">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-gray-400 text-sm line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          {product.brand && (
            <span className="text-xs text-gray-400 font-medium">{product.brand}</span>
          )}
        </div>

        <div className="flex gap-2">
          <Link
            href={`/products/${product.id}`}
            className="flex-1 btn-summer text-center py-3 rounded-xl text-sm font-semibold transition-all"
          >
            View Details
          </Link>

          <button
            className="w-11 h-11 flex items-center justify-center border border-gray-200 hover:border-coral-300 hover:text-coral-500 rounded-xl transition-colors"
            aria-label="Add to cart"
          >
            <FiShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}