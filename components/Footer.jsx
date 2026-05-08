"use client";

import Link from "next/link";
import { BsSun, BsInstagram, BsFacebook, BsTwitterX, BsYoutube } from "react-icons/bs";
import { FiMail, FiPhone, FiMapPin, FiPackage } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-ocean-900 text-white mt-20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 bg-coral-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-ocean-500/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          <div>
            <Link href="/" className="flex items-center gap-2 mb-5">
              <div className="w-9 h-9 rounded-xl bg-coral-gradient flex items-center justify-center">
                <BsSun className="text-white text-lg" />
              </div>
              <span className="font-display font-bold text-2xl">
                Sun<span className="text-coral-400">Cart</span>
              </span>
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Your one-stop destination for premium summer essentials. Embrace the sun in style.
            </p>

            <div className="flex items-center gap-3">
              {[
                { Icon: BsInstagram, href: "#", label: "Instagram" },
                { Icon: BsFacebook, href: "#", label: "Facebook" },
                { Icon: BsTwitterX, href: "#", label: "Twitter" },
                { Icon: BsYoutube, href: "#", label: "YouTube" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-coral-500 flex items-center justify-center transition-all hover:scale-110"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-white mb-5 text-base">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              {[
                { href: "/", label: "Home" },
                { href: "/products", label: "All Products" },
                { href: "/my-profile", label: "My Profile" },
                { href: "/login", label: "Sign In" },
                { href: "/register", label: "Create Account" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-coral-400 transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-coral-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-white mb-5 text-base">Categories</h4>
            <ul className="space-y-3 text-sm">
              {[
                "Sunglasses & Eyewear",
                "Summer Apparel",
                "Skincare & SPF",
                "Beach Accessories",
                "Swimwear",
                "Footwear",
              ].map((category) => (
                <li key={category}>
                  <Link
                    href="/products"
                    className="text-gray-400 hover:text-coral-400 transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-white mb-5 text-base">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 text-gray-400">
                <FiMapPin className="text-coral-400 mt-1 flex-shrink-0" />
                <span>42 Beach Boulevard,<br />Sunny Coast, SC 90210</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 hover:text-coral-400 transition-colors">
                <FiPhone className="text-coral-400 flex-shrink-0" />
                <a href="tel:+18001234567">+1 (800) 123-4567</a>
              </li>
              <li className="flex items-center gap-3 text-gray-400 hover:text-coral-400 transition-colors">
                <FiMail className="text-coral-400 flex-shrink-0" />
                <a href="mailto:hello@suncart.com">hello@suncart.com</a>
              </li>
            </ul>

            <div className="mt-6 p-4 rounded-2xl bg-white/5 border border-white/10 flex gap-3">
              <FiPackage className="text-coral-400 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-gray-400 leading-relaxed">
                Free shipping on orders over $75. Returns within 30 days.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-gray-500">
            © {new Date().getFullYear()} SunCart. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-gray-500 hover:text-coral-400 transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}