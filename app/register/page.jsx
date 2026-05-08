"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signUp, signIn, useSession } from "../../lib/auth-client";
import toast from "react-hot-toast";

import { BsSun, BsGoogle, BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { FiMail, FiLock, FiUser, FiImage, FiArrowRight } from "react-icons/fi";

export default function RegisterPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const [form, setForm] = useState({
    name: "",
    email: "",
    photoUrl: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (session) router.push("/");
  }, [session, router]);

  const validate = () => {
    const errs = {};

    if (!form.name.trim()) errs.name = "Name is required";

    if (!form.email) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      errs.email = "Enter a valid email";

    if (form.photoUrl && !/^https?:\/\/.+/.test(form.photoUrl))
      errs.photoUrl = "Enter valid URL";

    if (!form.password) errs.password = "Password is required";
    else if (form.password.length < 6)
      errs.password = "Min 6 characters required";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      const result = await signUp.email({
        name: form.name.trim(),
        email: form.email,
        password: form.password,
        image: form.photoUrl || undefined,
        callbackURL: "/login",
      });

      if (result?.error) {
        toast.error(result.error.message || "Registration failed");
      } else {
        toast.success("Account created");
        router.push("/login");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);

    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch {
      toast.error("Google sign-in failed");
      setGoogleLoading(false);
    }
  };

  const inputClass = (field) =>
    `w-full pl-10 pr-4 py-3.5 bg-white border-2 rounded-xl text-sm focus:outline-none transition-all ${
      errors[field] ? "border-red-400" : "border-gray-200"
    }`;

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#0d3b3b] via-[#0e5b5b] to-[#0f7b7b] items-center justify-center p-12">
        <div className="text-center text-white">
          <div className="w-20 h-20 mx-auto mb-6 bg-white/10 flex items-center justify-center rounded-full">
            <BsSun className="text-4xl" />
          </div>
          <h2 className="text-4xl font-bold mb-4">Join Summer Club</h2>
          <p className="text-white/70 max-w-xs mx-auto">
            Create account and start shopping
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 p-6">
        <div className="w-full max-w-md">
          <Link href="/" className="flex items-center gap-2 mb-6">
            <BsSun />
            <span className="font-bold">SunCart</span>
          </Link>

          <h1 className="text-3xl font-bold mb-1">Create Account</h1>

          <p className="text-sm text-gray-500 mb-6">
            Already have account?{" "}
            <Link href="/login" className="text-blue-500">
              Sign in
            </Link>
          </p>

          <button
            onClick={handleGoogle}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-2 bg-white border py-3 rounded-xl mb-4"
          >
            <BsGoogle />
            Continue with Google
          </button>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="relative">
                <FiUser className="absolute left-3 top-3.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  className={inputClass("name")}
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name}</p>
              )}
            </div>

            <div>
              <div className="relative">
                <FiMail className="absolute left-3 top-3.5 text-gray-400" />
                <input
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  className={inputClass("email")}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email}</p>
              )}
            </div>

            <div>
              <div className="relative">
                <FiImage className="absolute left-3 top-3.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Photo URL (optional)"
                  value={form.photoUrl}
                  onChange={(e) =>
                    setForm({ ...form, photoUrl: e.target.value })
                  }
                  className={inputClass("photoUrl")}
                />
              </div>
              {errors.photoUrl && (
                <p className="text-red-500 text-xs">{errors.photoUrl}</p>
              )}
            </div>

            <div>
              <div className="relative">
                <FiLock className="absolute left-3 top-3.5 text-gray-400" />
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  className={inputClass("password")}
                />

                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-3.5 text-gray-500"
                >
                  {showPass ? <BsEyeSlashFill /> : <BsEyeFill />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded-xl flex items-center justify-center gap-2"
            >
              {loading ? "Creating..." : "Create Account"}
              <FiArrowRight />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}