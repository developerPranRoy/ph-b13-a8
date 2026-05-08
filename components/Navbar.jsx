"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useSession, signOut } from "../lib/auth-client";
import toast from "react-hot-toast";
import { FiMenu, FiX, FiUser, FiLogOut } from "react-icons/fi";
import { BsSun } from "react-icons/bs";

export default function Navbar() {
  const { data: session, isPending } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropRef = useRef(null);

  const user = session?.user;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out successfully!");
    setDropdownOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg shadow-black/5"
          : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center shadow-md">
              <BsSun className="text-white text-lg" />
            </div>
            <span className="font-display font-bold text-xl md:text-2xl text-ocean-900 group-hover:text-coral-500 transition-colors">
              Sun<span className="text-coral-500">Cart</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {[
              { href: "/", label: "Home" },
              { href: "/products", label: "Products" },
              ...(user ? [{ href: "/my-profile", label: "My Profile" }] : []),
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body font-medium text-ocean-900 hover:text-coral-500 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-coral-500 after:transition-all hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {isPending ? (
              <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
            ) : user ? (
              <div className="relative" ref={dropRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 group"
                >
                  <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-coral-400 ring-2 ring-coral-100 transition-all group-hover:ring-coral-300">
                    {user.image ? (
                      <img
                        src={user.image}
                        alt={user.name || "User"}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center text-white font-bold text-sm">
                        {user.name?.charAt(0)?.toUpperCase() || "U"}
                      </div>
                    )}
                  </div>
                  <span className="font-medium text-ocean-900 text-sm hidden sm:block">
                    {user.name?.split(" ")[0]}
                  </span>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 top-12 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-50 bg-sand-50">
                      <p className="text-xs text-gray-500 font-medium">Signed in as</p>
                      <p className="text-sm font-semibold text-ocean-900 truncate">
                        {user.email}
                      </p>
                    </div>

                    <Link
                      href="/my-profile"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-sand-100 transition-colors"
                    >
                      <FiUser className="text-coral-500" /> My Profile
                    </Link>

                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors text-left"
                    >
                      <FiLogOut /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="font-medium text-ocean-900 hover:text-coral-500 transition-colors text-sm px-4 py-2"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="btn-summer px-5 py-2 rounded-full text-sm font-semibold shadow-md"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden p-2 rounded-xl text-ocean-900 hover:bg-sand-100 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white/98 backdrop-blur-md border-t border-gray-100 px-4 py-4 space-y-1">
          {[
            { href: "/", label: "Home" },
            { href: "/products", label: "Products" },
            ...(user ? [{ href: "/my-profile", label: "My Profile" }] : []),
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block py-3 px-4 rounded-xl font-medium text-ocean-900 hover:bg-sand-100 hover:text-coral-500 transition-all"
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-3 border-t border-gray-100 space-y-2">
            {user ? (
              <button
                onClick={handleSignOut}
                className="w-full py-3 px-4 rounded-xl font-medium text-red-500 hover:bg-red-50 transition-colors text-left flex items-center gap-2"
              >
                <FiLogOut /> Sign Out
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="block py-3 px-4 rounded-xl font-medium text-ocean-900 hover:bg-sand-100 transition-colors text-center"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMenuOpen(false)}
                  className="block btn-summer py-3 px-4 rounded-xl font-semibold text-center"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}