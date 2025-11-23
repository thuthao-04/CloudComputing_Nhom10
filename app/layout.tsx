"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import Link from "next/link";
import { useAuth } from "./hooks/useAuth";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading, logout } = useAuth();

  return (
    <html lang="vi">
      <body
        className="d-flex flex-column min-vh-100"
        style={{ background: "linear-gradient(135deg, #e0f7fa 0%, #c6e1e4 100%)" }}
      >
        <header
          className="py-4 shadow-sm"
          style={{ background: "linear-gradient(90deg, #0288d1 0%, #26c6da 100%)" }}
        >
          <div className="container d-flex justify-content-between align-items-center">
            <h1 className="fs-6 mb-0 fw-bold text-white">🌸 Cloud Computing-N10</h1>

            <nav className="d-flex gap-2 align-items-center">
              <Link
                href="/"
                className="text-white text-decoration-none fw-semibold px-3 py-1 rounded-3 nav-link-hover"
              >
                Trang chủ
              </Link>

              {/* Chỉ hiển thị khi đã đăng nhập */}
              {!loading && isAuthenticated && (
                <>
                  <Link
                    href="/users"
                    className="text-white text-decoration-none fw-semibold px-3 py-1 rounded-3 nav-link-hover"
                  >
                    Người dùng
                  </Link>
                  <Link
                    href="/products"
                    className="text-white text-decoration-none fw-semibold px-3 py-1 rounded-3 nav-link-hover"
                  >
                    Sản phẩm
                  </Link>
                </>
              )}

              {/* Chỉ hiển thị khi chưa đăng nhập */}
              {!loading && !isAuthenticated && (
                <Link
                  href="/auth/login"
                  className="text-white text-decoration-none fw-semibold px-3 py-1 rounded-3 nav-link-hover"
                >
                  Login
                </Link>
              )}

              {/* Đăng xuất khi đã đăng nhập */}
              {!loading && isAuthenticated && (
                <button
                  onClick={logout}
                  className="btn btn-danger fw-semibold px-3 py-1 rounded-3"
                >
                  Đăng xuất
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
