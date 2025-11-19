"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      setMessage("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await res.json();

      if (!res.ok) {
        setMessage(result.error || "Đăng nhập thất bại");
      } else {
        setMessage(`Xin chào ${result.user.name}!`);
        setTimeout(() => router.push("/"), 1000);
      }
    } catch (err) {
      console.error(err);
      setMessage("Có lỗi xảy ra, vui lòng thử lại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center "
      style={{
        color: "#333",
      }}
    >
      <div className="col-md-4">
        <div className="card shadow-lg rounded-4 border-0 overflow-hidden">
          <div className="card-body p-5">
            <h2
              className="mb-4 text-center fw-bold"
              style={{ color: "#0288d1" , fontFamily: 'Arial, sans-serif'}} 
            >
              Đăng nhập
            </h2>

            {message && (
              <div
                className="alert text-center"
                style={{ backgroundColor: "#b3e5fc", color: "#01579b" }}
              >
                {message}
              </div>
            )}

            <div className="mb-3">
              <input
                type="email"
                placeholder="Email"
                className="form-control form-control-lg rounded-pill shadow-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ color: "#01579b" }}
              />
            </div>

            <div className="mb-4">
              <input
                type="password"
                placeholder="Mật khẩu"
                className="form-control form-control-lg rounded-pill shadow-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ color: "#01579b" }}
              />
            </div>

            <button
              className="btn btn-lg w-100 rounded-pill fw-bold"
              onClick={handleLogin}
              disabled={loading}
              style={{
                background: "linear-gradient(90deg, #0288d1, #26c6da)", 
                border: "none",
                color: "#fff",
              }}
            >
              {loading ? "Đang xử lý..." : "Đăng nhập"}
            </button>

            <p className="text-center mt-4 mb-0" style={{ color: "#0277bd" }}>
              Bạn chưa có tài khoản?{" "}
              <Link
                href="/auth/signup"
                className="text-decoration-none fw-bold"
                style={{ color: "#0288d1" }}
              >
                Đăng ký
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
