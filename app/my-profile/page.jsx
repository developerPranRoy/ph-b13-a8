"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession, signOut } from "../../lib/auth-client";
import toast from "react-hot-toast";
import {
  FiUser, FiMail, FiEdit2, FiLogOut, FiShoppingBag,
  FiHeart, FiStar, FiSettings, FiArrowRight,
} from "react-icons/fi";
import { BsSun, BsCalendar3, BsShieldCheck } from "react-icons/bs";

export default function MyProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login?redirect=/my-profile");
    }
  }, [session, isPending, router]);

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out successfully!");
    router.push("/");
  };

  if (isPending) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-sand-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-coral-200 border-t-coral-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!session) return null;

  const user = session.user;
  const memberSince = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long" })
    : "2025";

  const stats = [
    { icon: FiShoppingBag, label: "Orders", value: "0", color: "text-coral-500", bg: "bg-coral-50" },
    { icon: FiHeart, label: "Wishlist", value: "0", color: "text-pink-500", bg: "bg-pink-50" },
    { icon: FiStar, label: "Reviews", value: "0", color: "text-amber-500", bg: "bg-amber-50" },
  ];

  return (
    <div className="min-h-screen bg-sand-50 pt-20">
      <div className="bg-hero-gradient py-12 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute right-0 top-0 w-64 h-64 bg-coral-500/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/2" />
          <div className="absolute left-0 bottom-0 w-48 h-48 bg-teal-400/10 rounded-full blur-3xl -translate-x-1/3 translate-y-1/2" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <span className="text-coral-400 text-xs font-semibold uppercase tracking-widest mb-3 block">
            My Account
          </span>
          <h1 className="font-display font-bold text-3xl md:text-4xl text-white">
            My Profile
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden animate__animated animate__fadeIn">
              <div className="bg-gradient-to-br from-coral-500 to-orange-500 h-24 relative">
                <div className="absolute inset-0 opacity-20"
                  style={{ backgroundImage: "radial-gradient(circle at 70% 50%, white 1px, transparent 1px)", backgroundSize: "20px 20px" }}
                />
              </div>

              <div className="px-6 pb-6 -mt-12 text-center">
                <div className="relative inline-block">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-white shadow-xl mx-auto">
                    {user.image ? (
                      <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-coral-gradient flex items-center justify-center">
                        <span className="text-white font-display font-bold text-3xl">
                          {user.name?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                </div>

                <h2 className="font-display font-bold text-xl text-ocean-900 mt-4 mb-1">
                  {user.name}
                </h2>
                <p className="text-gray-500 text-sm mb-4 flex items-center justify-center gap-1.5 truncate">
                  <FiMail className="flex-shrink-0 text-coral-400" />
                  {user.email}
                </p>

                <div className="flex items-center justify-center gap-2 bg-sand-50 rounded-xl px-3 py-2 mb-5">
                  <BsCalendar3 className="text-coral-400 text-sm" />
                  <span className="text-xs text-gray-500">Member since {memberSince}</span>
                </div>

                <div className="space-y-2">
                  <Link
                    href="/my-profile/update"
                    className="w-full btn-summer py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2"
                  >
                    <FiEdit2 /> Update Profile
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="w-full py-3 rounded-xl border-2 border-red-100 bg-red-50 text-red-500 font-semibold text-sm hover:bg-red-100 transition-all flex items-center justify-center gap-2"
                  >
                    <FiLogOut /> Sign Out
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-4 bg-teal-50 border border-teal-100 rounded-2xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <BsShieldCheck className="text-teal-500 text-lg" />
              </div>
              <div>
                <p className="text-sm font-semibold text-teal-700">Account Verified</p>
                <p className="text-xs text-teal-500">Your account is secure & active</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-5">
            <div className="grid grid-cols-3 gap-4 animate__animated animate__fadeInUp">
              {stats.map(({ icon: Icon, label, value, color, bg }) => (
                <div key={label} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 text-center hover:shadow-md transition-shadow">
                  <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                    <Icon className={`${color} text-lg`} />
                  </div>
                  <div className="font-display font-bold text-2xl text-ocean-900">{value}</div>
                  <div className="text-xs text-gray-400 font-medium mt-0.5">{label}</div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate__animated animate__fadeInUp">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display font-bold text-base text-ocean-900">Account Details</h3>
                <Link
                  href="/my-profile/update"
                  className="flex items-center gap-1 text-coral-500 text-sm font-semibold hover:gap-2 transition-all"
                >
                  <FiEdit2 size={13} /> Edit
                </Link>
              </div>

              <div className="space-y-4">
                {[
                  { label: "Full Name", value: user.name, icon: FiUser },
                  { label: "Email Address", value: user.email, icon: FiMail },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} className="flex items-center gap-4 p-4 bg-sand-50 rounded-xl border border-sand-200">
                    <div className="w-9 h-9 bg-coral-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="text-coral-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-gray-400 font-medium">{label}</p>
                      <p className="text-sm font-semibold text-ocean-900 truncate">{value}</p>
                    </div>
                  </div>
                ))}

                {user.image && (
                  <div className="flex items-center gap-4 p-4 bg-sand-50 rounded-xl border border-sand-200">
                    <div className="w-9 h-9 bg-coral-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FiUser className="text-coral-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-gray-400 font-medium">Profile Photo</p>
                      <p className="text-xs text-ocean-500 truncate font-medium">{user.image}</p>
                    </div>
                    <img src={user.image} alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate__animated animate__fadeInUp">
              <h3 className="font-display font-bold text-base text-ocean-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { href: "/products", label: "Browse Products", icon: FiShoppingBag, color: "text-coral-500" },
                  { href: "/my-profile/update", label: "Update Profile", icon: FiEdit2, color: "text-teal-500" },
                ].map(({ href, label, icon: Icon, color }) => (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-coral-200 hover:bg-sand-50 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`${color} text-lg`} />
                      <span className="text-sm font-semibold text-ocean-900">{label}</span>
                    </div>
                    <FiArrowRight className="text-gray-300 group-hover:text-coral-400 transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
