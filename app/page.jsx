"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ProductCard from "../components/ProductCard";
import products from "../data/products.json";
import {
  BsSun,
  BsDroplet,
  BsWind,
  BsHeart,
  BsStarFill,
  BsArrowRight,
  BsChevronLeft,
  BsChevronRight,
  BsUmbrella,
  BsEyeglasses,
  BsShieldCheck,
} from "react-icons/bs";
import { FiShoppingBag, FiArrowRight, FiGift } from "react-icons/fi";

const slides = [
  {
    id: 1,
    badge: "Summer 2025 Collection",
    heading: "Feel The Sun,\nLive The Vibe",
    sub: "50% OFF on all summer essentials. Limited time only.",
    cta: "Shop the Sale",
    ctaLink: "/products",
    bg: "from-[#0c1a2e] via-[#0f3460] to-[#1e5f74]",
    accent: "#ff6b4a",
    icon: BsUmbrella,
    tag: "SUMMER SALE",
    tagColor: "bg-coral-500",
  },
  {
    id: 2,
    badge: "New Arrivals",
    heading: "Hot Deals\nThis Season",
    sub: "Freshly stocked — sunglasses, swimwear, skincare & more.",
    cta: "Explore Now",
    ctaLink: "/products",
    bg: "from-[#0d3b3b] via-[#0e5b5b] to-[#0f7b7b]",
    accent: "#14b8a6",
    icon: BsDroplet,
    tag: "HOT DEALS",
    tagColor: "bg-teal-500",
  },
  {
    id: 3,
    badge: "Exclusive Offers",
    heading: "Glow Up This\nSummer Season",
    sub: "Premium skincare & beach accessories for your best summer yet.",
    cta: "Get Glowing",
    ctaLink: "/products",
    bg: "from-[#3d1a0c] via-[#7a3410] to-[#c05410]",
    accent: "#ffd166",
    icon: BsSun,
    tag: "EXCLUSIVE",
    tagColor: "bg-amber-500",
  },
];

function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goToSlide = (dir) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent((prev) => (prev + dir + slides.length) % slides.length);
      setAnimating(false);
    }, 300);
  };

  useEffect(() => {
    const timer = setInterval(() => goToSlide(1), 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];
  const IconComponent = slide.icon;

  return (
    <section
      className={`relative min-h-[90vh] md:min-h-screen bg-gradient-to-br ${slide.bg} flex items-center wave-divider transition-all duration-700 overflow-hidden`}
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20" style={{ background: slide.accent }} />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-10" style={{ background: slide.accent }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className={`transition-all duration-500 ${animating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}>
            <div className="flex items-center gap-3 mb-6">
              <span className={`${slide.tagColor} text-white text-xs font-bold px-4 py-1.5 rounded-full tracking-widest`}>
                {slide.tag}
              </span>
              <span className="text-white/60 text-sm">{slide.badge}</span>
            </div>

            <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-6 whitespace-pre-line">
              {slide.heading}
            </h1>

            <p className="text-white/70 text-lg mb-8 max-w-md leading-relaxed">
              {slide.sub}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={slide.ctaLink}
                className="btn-summer px-8 py-4 rounded-full font-bold text-base flex items-center gap-2 shadow-2xl"
              >
                <FiShoppingBag /> {slide.cta}
                <BsArrowRight />
              </Link>
              <Link
                href="/products"
                className="glass text-white px-6 py-4 rounded-full font-semibold text-base hover:bg-white/20 transition-all"
              >
                Browse All
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 mt-10 pt-8 border-t border-white/10">
              {[
                { val: "500+", label: "Products" },
                { val: "50K+", label: "Happy Customers" },
                { val: "4.9★", label: "Avg Rating" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-display font-bold text-2xl text-white">{stat.val}</div>
                  <div className="text-white/50 text-xs">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Icon */}
          <div className="hidden lg:flex items-center justify-center">
            <IconComponent
              className="text-[180px] text-white/90 animate-float"
              style={{ filter: `drop-shadow(0 30px 60px ${slide.accent}60)` }}
            />
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current ? "w-8 h-2.5 bg-coral-400" : "w-2.5 h-2.5 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => goToSlide(-1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 glass w-11 h-11 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all z-20"
      >
        <BsChevronLeft />
      </button>
      <button
        onClick={() => goToSlide(1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 glass w-11 h-11 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all z-20"
      >
        <BsChevronRight />
      </button>
    </section>
  );
}

/* Summer Care Tips */
const tips = [
  {
    icon: BsSun,
    title: "Apply SPF 50+ Daily",
    body: "Reapply sunscreen every 2 hours, especially after swimming. Don't skip areas like the back of your neck and ears.",
    color: "from-amber-50 to-orange-50",
    border: "border-amber-200",
    iconBg: "bg-amber-100",
  },
  {
    icon: BsDroplet,
    title: "Stay Hydrated",
    body: "Drink at least 8–10 glasses of water daily in summer. Add electrolytes if you're active outdoors.",
    color: "from-sky-50 to-cyan-50",
    border: "border-sky-200",
    iconBg: "bg-sky-100",
  },
  {
    icon: BsShieldCheck,
    title: "Moisturize After Sun",
    body: "Salt, sand, and UV rays strip your skin. Use a nourishing after-sun lotion with aloe vera.",
    color: "from-green-50 to-teal-50",
    border: "border-green-200",
    iconBg: "bg-green-100",
  },
  {
    icon: BsEyeglasses,
    title: "Protect Your Eyes",
    body: "Wear sunglasses with 100% UV400 protection. Polarized lenses reduce glare.",
    color: "from-violet-50 to-purple-50",
    border: "border-violet-200",
    iconBg: "bg-violet-100",
  },
  {
    icon: FiGift,
    title: "Eat Hydrating Foods",
    body: "Watermelon, cucumber, and berries are packed with water and antioxidants.",
    color: "from-pink-50 to-rose-50",
    border: "border-pink-200",
    iconBg: "bg-pink-100",
  },
  {
    icon: BsWind,
    title: "Wear Breathable Fabrics",
    body: "Choose linen, cotton, and moisture-wicking fabrics in light colors.",
    color: "from-lime-50 to-emerald-50",
    border: "border-lime-200",
    iconBg: "bg-lime-100",
  },
];

/* Top Brands */
const brands = [
  { name: "SunShade", tagline: "Premium UV Eyewear", icon: BsEyeglasses, color: "from-purple-800 to-emerald-600" },
  { name: "CoastalThread", tagline: "Sustainable Summer Fashion", icon: BsHeart, color: "bg-ocean-gradient" },
  { name: "DermGlow", tagline: "Science-Backed Skincare", icon: BsShieldCheck, color: "bg-summer-gradient" },
  { name: "TideRider", tagline: "Performance Swimwear", icon: BsDroplet, color: "from-teal-500 to-emerald-600" },
];

export default function HomePage() {
  const popularProducts = products.slice(0, 3);

  return (
    <>
      <HeroSlider />

      {/* Popular Products */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <span className="text-coral-500 font-semibold text-sm uppercase tracking-widest">
              Trending Now
            </span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-ocean-900 mt-2">
              Popular Products
            </h2>
          </div>
          <Link
            href="/products"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-coral-500 font-semibold hover:gap-3 transition-all"
          >
            View All Products <FiArrowRight />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {popularProducts.map((product, i) => (
            <div
              key={product.id}
              className="animate__animated animate__fadeInUp"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* Summer Care Tips */}
      <section className="py-20 bg-gradient-to-b from-sand-50 to-sand-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-14">
            <span className="text-teal-500 font-semibold text-sm uppercase tracking-widest">
              Expert Advice
            </span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-ocean-900 mt-2">
              Summer Care Tips
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Stay healthy, glowing, and protected all season long.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tips.map((tip, i) => {
              const Icon = tip.icon;
              return (
                <div
                  key={i}
                  className={`bg-gradient-to-br ${tip.color} border ${tip.border} rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className={`w-12 h-12 ${tip.iconBg} rounded-xl flex items-center justify-center text-2xl mb-4`}>
                    <Icon />
                  </div>
                  <h3 className="font-display font-bold text-ocean-900 text-base mb-2">
                    {tip.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{tip.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Top Brands */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-coral-500 font-semibold text-sm uppercase tracking-widest">
            Trusted Brands
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-ocean-900 mt-2">
            Top Brands
          </h2>
          <p className="text-gray-500 mt-3">We partner with the best summer lifestyle brands.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {brands.map((brand, i) => {
            const Icon = brand.icon;
            return (
              <div
                key={i}
                className={`bg-gradient-to-br ${brand.color} rounded-2xl p-6 text-white text-center hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="text-5xl mb-4">
                  <Icon />
                </div>
                <h3 className="font-display font-bold text-xl mb-1">{brand.name}</h3>
                <p className="text-white/75 text-xs">{brand.tagline}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 mb-4">
        <div className="max-w-7xl mx-auto bg-hero-gradient rounded-3xl p-10 md:p-16 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-2">
                Ready for Your Best Summer?
              </h2>
              <p className="text-white/60">Shop all essentials and get free shipping on orders over $75.</p>
            </div>
            <Link
              href="/products"
              className="btn-summer px-8 py-4 rounded-full font-bold text-base flex items-center gap-2 whitespace-nowrap shadow-2xl flex-shrink-0"
            >
              <FiShoppingBag /> Shop Now <BsArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}