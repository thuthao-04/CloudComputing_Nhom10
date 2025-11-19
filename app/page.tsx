import { head } from "framer-motion/client";
import Link from "next/link";

export default function HomePage() {
  return (
    <main
      className="d-flex flex-column justify-content-center align-items-center"
      style={{height: "50vh"}}
    >
      <div
        className="text-center p-5 rounded-4 shadow-lg"
        style={{ backgroundColor: "rgba(255,255,255,0.85)" }}
      >
        <h1 className="mb-4 fw-bold" style={{ color: "#0288d1" }}>
          🌥️ Trang Quản Lý
        </h1>
        <p className="mb-4" style={{ color: "#01579b" }}>
          Chọn mục cần quản lý:
        </p>
        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <Link
            href="/users"
            className="btn btn-lg fw-bold"
            style={{
              background: "linear-gradient(90deg, #0288d1, #26c6da)",
              color: "#fff",
              border: "none",
              borderRadius: "50px",
              padding: "0.75rem 2rem",
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
          >
            Quản lý người dùng
          </Link>
          <Link
            href="/products"
            className="btn btn-lg fw-bold"
            style={{
              background: "linear-gradient(90deg, #43a047, #66bb6a)",
              color: "#fff",
              border: "none",
              borderRadius: "50px",
              padding: "0.75rem 2rem",
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
          >
            Quản lý sản phẩm
          </Link>
        </div>
      </div>
    </main>
  );
}
