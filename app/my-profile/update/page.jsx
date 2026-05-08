"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession, updateUser } from "../../../lib/auth-client";
import toast from "react-hot-toast";
import { 
  FiUser, 
  FiImage, 
  FiArrowLeft, 
  FiCheck, 
  FiEdit 
} from "react-icons/fi";
import { BsSun } from "react-icons/bs";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [form, setForm] = useState({ name: "", image: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login?redirect=/my-profile/update");
      return;
    }

    if (session?.user) {
      setForm({
        name: session.user.name || "",
        image: session.user.image || "",
      });
      setPreview(session.user.image || "");
    }
  }, [session, isPending, router]);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) {
      errs.name = "Name is required";
    }
    if (form.image && !/^https?:\/\/.+/.test(form.image)) {
      errs.image = "Please enter a valid image URL starting with http:// or https://";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const result = await updateUser({
        name: form.name.trim(),
        image: form.image || undefined,
      });

      if (result?.error) {
        toast.error(result.error.message || "Failed to update profile");
      } else {
        toast.success("Profile updated successfully!");
        router.push("/my-profile");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-sand-50">
        <div className="w-12 h-12 border-4 border-coral-200 border-t-coral-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) return null;

  const user = session.user;

  return (
    <div className="min-h-screen bg-sand-50 pt-20">
      <div className="bg-hero-gradient py-12 relative overflow-hidden">
        <div className="max-w-2xl mx-auto px-4 relative z-10 text-center">
          <span className="text-coral-400 text-xs font-semibold uppercase tracking-widest mb-3 block">
            Account Settings
          </span>
          <h1 className="font-display font-bold text-3xl md:text-4xl text-white flex items-center justify-center gap-3">
            <FiEdit className="text-3xl" />
            Update Profile
          </h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-coral-500 transition-colors mb-8"
        >
          <FiArrowLeft /> Back to Profile
        </button>

        <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-coral-50 to-orange-50 border-b border-coral-100 px-6 py-5 flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-coral-200 shadow flex-shrink-0">
              {preview ? (
                <img
                  src={preview}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                  onError={() => setPreview("")}
                />
              ) : (
                <div className="w-full h-full bg-coral-gradient flex items-center justify-center">
                  <span className="text-white font-display font-bold text-3xl">
                    {user.name?.charAt(0)?.toUpperCase() || "U"}
                  </span>
                </div>
              )}
            </div>
            <div>
              <p className="font-semibold text-ocean-900 text-lg">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
              <span className="inline-flex items-center gap-1 text-xs text-teal-600 bg-teal-50 px-3 py-1 rounded-full font-medium mt-2">
                <FiCheck size={14} /> Verified Account
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6" noValidate>
            <div>
              <h2 className="font-display font-bold text-lg text-ocean-900 mb-1">
                Update Information
              </h2>
              <p className="text-sm text-gray-500">
                Update your name and profile photo. Email cannot be changed.
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-ocean-900 mb-1.5">
                Full Name <span className="text-coral-500">*</span>
              </label>
              <div className="relative">
                <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={(e) => {
                    setForm({ ...form, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: "" });
                  }}
                  className={`w-full pl-10 pr-4 py-3.5 bg-sand-50 border-2 rounded-xl focus:outline-none transition-all ${
                    errors.name
                      ? "border-red-300 focus:border-red-400"
                      : "border-gray-200 focus:border-coral-300 focus:bg-white"
                  }`}
                />
              </div>
              {errors.name && <p className="text-red-500 text-xs mt-1.5">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-ocean-900 mb-1.5">
                Profile Photo URL <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <div className="relative">
                <FiImage className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="url"
                  placeholder="https://example.com/your-photo.jpg"
                  value={form.image}
                  onChange={(e) => {
                    setForm({ ...form, image: e.target.value });
                    setPreview(e.target.value);
                    if (errors.image) setErrors({ ...errors, image: "" });
                  }}
                  className={`w-full pl-10 pr-4 py-3.5 bg-sand-50 border-2 rounded-xl focus:outline-none transition-all ${
                    errors.image
                      ? "border-red-300 focus:border-red-400"
                      : "border-gray-200 focus:border-coral-300 focus:bg-white"
                  }`}
                />
              </div>
              {errors.image && <p className="text-red-500 text-xs mt-1.5">{errors.image}</p>}

              {preview && (
                <div className="mt-4 p-4 bg-sand-50 rounded-xl border border-sand-200 flex items-center gap-4">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-16 h-16 rounded-xl object-cover border border-gray-100"
                    onError={() => setPreview("")}
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-ocean-900">Image Preview</p>
                    <p className="text-xs text-gray-400 truncate">{preview}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-gray-50 rounded-xl border border-gray-200 p-5">
              <p className="text-xs text-gray-400 font-medium mb-1">Email Address</p>
              <p className="font-semibold text-gray-600">{user.email}</p>
              <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 btn-summer py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Updating Profile...
                  </>
                ) : (
                  <>
                    <FiCheck /> Update Profile
                  </>
                )}
              </button>

              <Link
                href="/my-profile"
                className="flex-1 py-4 rounded-2xl border-2 border-gray-200 text-gray-600 font-semibold text-center hover:bg-gray-50 transition-all"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}