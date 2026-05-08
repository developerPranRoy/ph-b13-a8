import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

export const metadata = {
  title: "SunCart – Summer Essentials Store",
  description:
    "Discover the best summer essentials — sunglasses, outfits, skincare, beach accessories & more.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>☀️</text></svg>",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-body bg-sand-50 min-h-screen flex flex-col">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#0c1a2e",
              color: "#fff",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              borderRadius: "12px",
              padding: "12px 20px",
            },
            success: {
              iconTheme: { primary: "#14b8a6", secondary: "#fff" },
            },
            error: {
              iconTheme: { primary: "#ff6b4a", secondary: "#fff" },
            },
          }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
