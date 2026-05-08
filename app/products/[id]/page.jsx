"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useSession } from "../../../lib/auth-client";
import products from "../../../data/products.json";
import {
  BsStarFill,
  BsStarHalf,
  BsStar,
  BsArrowLeft,
  BsCheckCircleFill,
  BsShieldCheck,
  BsTruck,
  BsQuestionCircle,
} from "react-icons/bs";
import { FiShoppingCart, FiHeart, FiShare2, FiLock } from "react-icons/fi";

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1 text-sm">
      {[1, 2, 3, 4, 5].map((i) => {
        if (i <= Math.floor(rating)) {
          return <BsStarFill key={i} className="text-amber-400" />;
        }
        if (i === Math.ceil(rating) && rating % 1 >= 0.5) {
          return <BsStarHalf key={i} className="text-amber-400" />;
        }
        return <BsStar key={i} className="text-gray-300" />;
      })}
    </div>
  );
}

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { data: session, isPending } = useSession();

  const product = products.find((p) => String(p.id) === String(params.id));

  useEffect(() => {
    if (!isPending && !session) {
      sessionStorage.setItem("redirectAfterLogin", `/products/${params.id}`);
      router.push(`/login?redirect=${encodeURIComponent(`/products/${params.id}`)}`);
    }
  }, [session, isPending, router, params.id]);

  if (isPending) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-sand-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-coral-200 border-t-coral-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 font-medium">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-sand-50">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 bg-coral-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiLock className="text-coral-500 text-3xl" />
          </div>
          <h2 className="font-display font-bold text-2xl text-ocean-900 mb-2">Login Required</h2>
          <p className="text-gray-500 mb-6">Sign in to view full product details and make purchases.</p>
          <Link
            href={`/login?redirect=/products/${params.id}`}
            className="btn-summer px-8 py-3 rounded-full font-semibold inline-block"
          >
            Sign In to Continue
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-sand-50">
        <div className="text-center">
          <BsQuestionCircle className="text-6xl text-gray-300 mx-auto mb-4" />
          <h2 className="font-display font-bold text-2xl text-ocean-900 mb-2">Product Not Found</h2>
          <Link
            href="/products"
            className="btn-summer px-6 py-2.5 rounded-full font-semibold mt-4 inline-block"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen pt-20 bg-sand-50">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-sm">
          <Link href="/" className="text-gray-400 hover:text-coral-500 transition-colors">Home</Link>
          <span className="text-gray-300">/</span>
          <Link href="/products" className="text-gray-400 hover:text-coral-500 transition-colors">Products</Link>
          <span className="text-gray-300">/</span>
          <span className="text-ocean-900 font-medium truncate">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-coral-500 transition-colors mb-8"
        >
          <BsArrowLeft /> Back to Products
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 aspect-square">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />

              {product.badge && (
                <span className="absolute top-5 left-5 text-sm font-bold px-3 py-1.5 rounded-full badge-sale">
                  {product.badge}
                </span>
              )}

              {discount && (
                <span className="absolute top-5 right-5 bg-green-500 text-white text-sm font-bold px-3 py-1.5 rounded-full">
                  -{discount}%
                </span>
              )}
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { Icon: BsShieldCheck, text: "Secure Payment" },
                { Icon: BsTruck, text: "Fast Delivery" },
                { Icon: BsCheckCircleFill, text: "Quality Assured" },
              ].map(({ Icon, text }) => (
                <div key={text} className="bg-white rounded-xl p-4 text-center border border-gray-100 shadow-sm">
                  <Icon className="text-teal-500 text-2xl mx-auto mb-2" />
                  <span className="text-xs text-gray-500 font-medium">{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-bold text-white bg-ocean-gradient px-3 py-1 rounded-full uppercase tracking-wider">
                {product.category}
              </span>
              <span className="text-sm text-gray-400 font-medium">{product.brand}</span>
            </div>

            <h1 className="font-display font-bold text-3xl md:text-4xl text-ocean-900 leading-tight mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-6">
              <StarRating rating={product.rating} />
              <span className="text-sm font-semibold text-ocean-900">{product.rating}</span>
              <span className="text-sm text-gray-400">/ 5.0</span>
            </div>

            <div className="flex items-center gap-4 mb-6 p-6 bg-gradient-to-r from-coral-50 to-orange-50 rounded-2xl border border-coral-100">
              <div>
                <span className="font-display font-bold text-4xl text-coral-500">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-gray-400 text-lg line-through ml-3">${product.originalPrice}</span>
                )}
              </div>
              {discount && (
                <span className="bg-green-100 text-green-700 text-sm font-bold px-3 py-1 rounded-full">
                  Save {discount}%
                </span>
              )}
            </div>

            <p className="text-gray-600 leading-relaxed mb-8 text-[15px]">{product.description}</p>

            {product.features && product.features.length > 0 && (
              <div className="mb-8">
                <h3 className="font-display font-bold text-base text-ocean-900 mb-4">Key Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 bg-sand-50 border border-sand-200 rounded-xl px-4 py-3">
                      <BsCheckCircleFill className="text-teal-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-8 flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  product.stock > 5 ? "bg-green-500" : "bg-amber-500"
                }`}
              />
              <span className="text-sm text-gray-600 font-medium">
                {product.stock > 5
                  ? `In Stock — ${product.stock} units available`
                  : `Only ${product.stock} left in stock!`}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button className="flex-1 btn-summer py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all">
                <FiShoppingCart size={20} />
                Add to Cart
              </button>

              <button className="px-6 py-4 rounded-2xl border-2 border-gray-200 hover:border-coral-300 hover:bg-coral-50 transition-all">
                <FiHeart size={22} />
              </button>

              <button className="px-6 py-4 rounded-2xl border-2 border-gray-200 hover:border-ocean-400 hover:bg-ocean-50 transition-all">
                <FiShare2 size={22} />
              </button>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-ocean-900 mb-8">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/products/${p.id}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-gray-100 p-4 flex gap-4 transition-all"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-24 h-24 object-cover rounded-xl flex-shrink-0 group-hover:scale-105 transition-transform"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="text-xs text-ocean-500 font-medium">{p.category}</span>
                    <h4 className="font-display font-bold text-sm text-ocean-900 line-clamp-2 mt-1 mb-1">
                      {p.name}
                    </h4>
                    <p className="text-coral-500 font-bold">${p.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}