"use client";

import { useState, useMemo } from "react";
import ProductCard from "../../components/ProductCard";
import products from "../../data/products.json";
import { FiSearch, FiFilter, FiGrid, FiList } from "react-icons/fi";
import { BsSliders } from "react-icons/bs";

const categories = ["All", ...new Set(products.map((p) => p.category))];

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("All");
  const [sort, setSort] = useState("default");

  const filtered = useMemo(() => {
    let list = [...products];
    if (selectedCat !== "All") list = list.filter((p) => p.category === selectedCat);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    else if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [search, selectedCat, sort]);

  return (
    <div className="pt-20 min-h-screen bg-sand-50">
      <div className="bg-hero-gradient py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute right-0 top-0 w-64 h-64 bg-coral-500/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
          <div className="absolute left-0 bottom-0 w-48 h-48 bg-teal-400/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="text-coral-400 font-semibold text-sm uppercase tracking-widest">
            🛍️ Summer Collection
          </span>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-white mt-2 mb-3">
            All Products
          </h1>
          <p className="text-white/60 max-w-md mx-auto">
            Explore our complete summer essentials collection — from beach accessories to skincare.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-8">
          <div className="relative w-full lg:w-80">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-coral-400 focus:ring-2 focus:ring-coral-100 transition-all input-summer"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCat(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    selectedCat === cat
                      ? "bg-coral-gradient text-white shadow-md"
                      : "bg-white border border-gray-200 text-gray-600 hover:border-coral-300 hover:text-coral-500"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2">
              <BsSliders className="text-coral-500 text-sm" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="text-sm text-gray-700 focus:outline-none bg-transparent"
              >
                <option value="default">Sort By</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-6">
          Showing <span className="font-semibold text-ocean-900">{filtered.length}</span>{" "}
          {filtered.length === 1 ? "product" : "products"}
          {selectedCat !== "All" && (
            <span className="text-coral-500"> in {selectedCat}</span>
          )}
        </p>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product, i) => (
              <div
                key={product.id}
                className="animate__animated animate__fadeInUp"
                style={{ animationDelay: `${(i % 8) * 0.06}s`, animationFillMode: "both" }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="font-display font-bold text-xl text-ocean-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-500 text-sm">
              Try adjusting your search or filters.
            </p>
            <button
              onClick={() => { setSearch(""); setSelectedCat("All"); setSort("default"); }}
              className="mt-4 btn-summer px-6 py-2.5 rounded-full text-sm font-semibold"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
