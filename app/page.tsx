"use client";

// import { head } from "framer-motion/client";
import Link from "next/link";
import { useAuth } from "./hooks/useAuth";
import { useRouter } from "next/navigation";
export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  // xử lý khi click vào quản lý người dùng
  const handleUsersClick = (e: React.MouseEvent<HTMLAnchorElement>) => {

    e.preventDefault();
    //if loading
    if (loading) return;

    // nếu chưa đăng nhập
    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }else{

    // nếu đã đăng nhập
    router.push("/users");
    }
  };
  //Hàm xử lý khi click vào quản lý sản phẩm
  const handleProductsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    //if loading
    if (loading) return;
    // nếu chưa đăng nhập

    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }else{
      // nếu đã đăng nhập
      router.push("/products");
    }
  };
  // render
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
            onClick={handleUsersClick}
            className="btn btn-lg fw-bold"
            style={{
              background: "linear-gradient(90deg, #0288d1, #26c6da)",
              color: "#fff",
              border: "none",
              borderRadius: "50px",
              padding: "0.75rem 2rem",
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
              transition: "transform 0.2s, box-shadow 0.2s",
              cursor: loading ? "wait" : "pointer",
            }}
          >
            Quản lý người dùng
          </Link>
          <Link
            href="/products"
            onClick={handleProductsClick}
            className="btn btn-lg fw-bold"
            style={{
              background: "linear-gradient(90deg, #43a047, #66bb6a)",
              color: "#fff",
              border: "none",
              borderRadius: "50px",
              padding: "0.75rem 2rem",
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
              transition: "transform 0.2s, box-shadow 0.2s",
              cursor: loading ? "wait" : "pointer",
            }}
          >
            Quản lý sản phẩm
          </Link>
        </div>
      </div>
    </main>
  );
}
