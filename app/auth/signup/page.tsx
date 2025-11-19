"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { UserAuth } from "@/types/user";
import Link from "next/link";

export default function SignupPage() {
  const [form, setForm] = useState<UserAuth>({
    id: 0,
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    created_at: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await res.json();

      if (!res.ok) {
        setMessage(result.error || "Đăng ký thất bại");
      } else {
        setMessage(`Đăng ký thành công: ${result.user.name}`);
        setTimeout(() => router.push("/auth/login"), 1500);
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
      className="d-flex justify-content-center align-items-center"
     
    >
      <div className="col-md-4">
        <div className="card shadow-lg rounded-4 border-0 overflow-hidden">
          <div className="card-body p-5">
            <h2
              className="mb-4 text-center fw-bold"
              style={{ color: "#0288d1", fontFamily: "Arial, sans-serif" }}
            >
              Đăng ký
            </h2>

            {message && (
              <div
                className="alert text-center"
                style={{ backgroundColor: "#b3e5fc", color: "#01579b" }}
              >
                {message}
              </div>
            )}

            {["name", "email", "password", "phone", "address"].map((field) => (
              <input
                key={field}
                type={field === "password" ? "password" : "text"}
                name={field}
                placeholder={
                  field === "name"
                    ? "Họ và tên"
                    : field === "email"
                    ? "Email"
                    : field === "password"
                    ? "Mật khẩu"
                    : field === "phone"
                    ? "Số điện thoại"
                    : "Địa chỉ"
                }
                className="form-control form-control-lg rounded-pill shadow-sm mb-3"
                value={form[field as keyof UserAuth] || ""}
                onChange={handleChange}
                style={{ color: "#01579b" }}
              />
            ))}

            <button
              className="btn btn-lg w-100 rounded-pill fw-bold"
              onClick={handleSignup}
              disabled={loading}
              style={{
                background: "linear-gradient(90deg, #0288d1, #26c6da)",
                border: "none",
                color: "#fff",
              }}
            >
              {loading ? "Đang xử lý..." : "Đăng ký"}
            </button>

            <p className="text-center mt-4 mb-0" style={{ color: "#0277bd" }}>
              Bạn đã có tài khoản?{" "}
              <Link
                href="/auth/login"
                className="text-decoration-none fw-bold"
                style={{ color: "#0288d1" }}
              >
                Đăng nhập
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
