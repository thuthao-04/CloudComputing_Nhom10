"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import Link from "next/link";
import { supabase } from "./lib/supabaseClient";
import { useEffect, useState } from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    // Lấy session hiện tại
    supabase.auth.getSession().then(({ data }) => setUserEmail(data.session?.user.email ?? null));

    // Lắng nghe thay đổi auth
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user.email ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUserEmail(null);
  };

  return (
    <html lang="vi">
      <body className="bg-light text-dark min-vh-100 d-flex flex-column">
        <header
          className="py-1 shadow-sm"
          style={{ background: "linear-gradient(90deg, #8ef2e5ff 0%, #fbc2eb 100%)" }}
        >
          <div className="container d-flex justify-content-between align-items-center">
            <h1 className="fs-6 mb-0 fw-bold text-white">🌸 Cloud Computing-N10</h1>
            <nav className="d-flex gap-2 align-items-center">
              <Link href="/" className="text-white text-decoration-none fw-semibold px-3 py-1 rounded-3 nav-link-hover">
                Trang chủ
              </Link>
              <Link href="/users" className="text-white text-decoration-none fw-semibold px-3 py-1 rounded-3 nav-link-hover">
                Người dùng
              </Link>
              <Link href="/products" className="text-white text-decoration-none fw-semibold px-3 py-1 rounded-3 nav-link-hover">
                Sản phẩm
              </Link>

              {!userEmail ? (
                <Link
                  href="auth/login"
                  className="text-white text-decoration-none fw-semibold px-3 py-1 rounded-3 nav-link-hover"
                >
                  Login
                </Link>
              ) : (
                <button
                  className="btn btn-sm btn-light ms-2"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              )}
            </nav>
          </div>
        </header>

        <main className="container my-5 flex-grow-1">{children}</main>

        <footer className="text-center py-4 text-muted border-top mt-auto">
          © {new Date().getFullYear()} Quản lý dữ liệu với Supabase & Next.js 🌷
        </footer>
      </body>
    </html>
  );
}
