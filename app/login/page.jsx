"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn, useSession } from "../../lib/auth-client";
import toast from "react-hot-toast";

import {
  BsSun,
  BsGoogle,
  BsEyeFill,
  BsEyeSlashFill,
  BsBag,
  BsRocketTakeoff,
  BsBoxSeam,
  BsHeart,
} from "react-icons/bs";

import {
  FiMail,
  FiLock,
  FiArrowRight,
  FiAlertCircle,
} from "react-icons/fi";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();

  const redirect = searchParams.get("redirect") || "/";

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (session) router.push(redirect);
  }, [session, router, redirect]);

  const validate = () => {
    const errs = {};

    if (!form.email) {
      errs.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errs.email = "Enter a valid email";
    }

    if (!form.password) {
      errs.password = "Password is required";
    } else if (form.password.length < 6) {
      errs.password = "Password must be at least 6 characters";
    }

    setErrors(errs);

    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      const result = await signIn.email({
        email: form.email,
        password: form.password,
        callbackURL: redirect,
      });

      if (result?.error) {
        toast.error(
          result.error.message || "Invalid credentials. Please try again."
        );
      } else {
        toast.success("Welcome back");
        router.push(redirect);
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);

    try {
      await signIn.social({
        provider: "google",
        callbackURL: redirect,
      });
    } catch {
      toast.error("Google sign-in failed. Please try again.");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-hero-gradient relative overflow-hidden flex-col items-center justify-center p-12">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/5 animate-float"
              style={{
                width: `${80 + i * 40}px`,
                height: `${80 + i * 40}px`,
                top: `${10 + i * 15}%`,
                left: `${5 + i * 18}%`,
                animationDelay: `${i * 0.7}s`,
              }}
            />
          ))}

          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <div className="relative z-10 text-center">
          <div className="w-20 h-20 bg-coral-gradient rounded-2xl flex items-center justify-center mx-auto mb-8 sun-pulse shadow-2xl">
            <BsSun className="text-white text-4xl" />
          </div>

          <h2 className="font-display font-bold text-4xl text-white mb-4 leading-tight">
            Welcome Back to
            <br />
            <span className="text-gradient">SunCart</span>
          </h2>

          <p className="text-white/60 text-base max-w-xs mx-auto leading-relaxed">
            Sign in to explore the best summer essentials and manage your
            orders.
          </p>

          <div className="mt-10 space-y-4 text-left max-w-xs mx-auto">
            <div className="flex items-center gap-3 text-white/75 text-sm">
              <BsBag className="text-teal-300 text-lg" />
              <span>Exclusive member discounts</span>
            </div>

            <div className="flex items-center gap-3 text-white/75 text-sm">
              <BsRocketTakeoff className="text-teal-300 text-lg" />
              <span>Fast checkout experience</span>
            </div>

            <div className="flex items-center gap-3 text-white/75 text-sm">
              <BsBoxSeam className="text-teal-300 text-lg" />
              <span>Track your orders easily</span>
            </div>

            <div className="flex items-center gap-3 text-white/75 text-sm">
              <BsHeart className="text-teal-300 text-lg" />
              <span>Save your wishlist</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center bg-sand-50 p-6 pt-24 lg:pt-6">
        <div className="w-full max-w-md animate__animated animate__fadeIn">
          <Link href="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-xl bg-coral-gradient flex items-center justify-center">
              <BsSun className="text-white" />
            </div>

            <span className="font-display font-bold text-xl text-ocean-900">
              Sun<span className="text-coral-500">Cart</span>
            </span>
          </Link>

          <h1 className="font-display font-bold text-3xl text-ocean-900 mb-1">
            Sign In
          </h1>

          <p className="text-gray-500 text-sm mb-8">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-coral-500 font-semibold hover:underline"
            >
              Create one
            </Link>
          </p>

          <button
            onClick={handleGoogle}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3.5 rounded-xl transition-all mb-5 text-sm shadow-sm"
          >
            {googleLoading ? (
              <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-700 rounded-full animate-spin" />
            ) : (
              <BsGoogle
                className="text-lg"
                style={{ color: "#4285F4" }}
              />
            )}

            Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-gray-200" />

            <span className="text-gray-400 text-xs font-medium px-2">
              or sign in with email
            </span>

            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label className="block text-sm font-semibold text-ocean-900 mb-1.5">
                Email Address
              </label>

              <div className="relative">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

                <input
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => {
                    setForm({ ...form, email: e.target.value });

                    if (errors.email) {
                      setErrors({ ...errors, email: "" });
                    }
                  }}
                  className={`w-full pl-10 pr-4 py-3.5 bg-white border-2 rounded-xl text-sm focus:outline-none transition-all input-summer ${errors.email
                      ? "border-red-300 focus:border-red-400"
                      : "border-gray-200"
                    }`}
                />
              </div>

              {errors.email && (
                <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                  <FiAlertCircle />
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-semibold text-ocean-900">
                  Password
                </label>

                <Link
                  href="#"
                  className="text-xs text-coral-500 hover:underline font-medium"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

                <input
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => {
                    setForm({ ...form, password: e.target.value });

                    if (errors.password) {
                      setErrors({ ...errors, password: "" });
                    }
                  }}
                  className={`w-full pl-10 pr-11 py-3.5 bg-white border-2 rounded-xl text-sm focus:outline-none transition-all input-summer ${errors.password
                      ? "border-red-300 focus:border-red-400"
                      : "border-gray-200"
                    }`}
                />

                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPass ? <BsEyeSlashFill /> : <BsEyeFill />}
                </button>
              </div>

              {errors.password && (
                <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                  <FiAlertCircle />
                  {errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-summer py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 mt-2 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In <FiArrowRight />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-6">
            By signing in, you agree to our{" "}
            <Link
              href="#"
              className="text-coral-500 hover:underline"
            >
              Terms
            </Link>{" "}
            &{" "}
            <Link
              href="#"
              className="text-coral-500 hover:underline"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}