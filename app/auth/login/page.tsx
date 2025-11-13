"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) alert(error.message);
      else {
        alert("Đăng nhập thành công!");
        router.push("/"); // redirect về home
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-4">
        <h2 className="mb-4 text-center">Đăng nhập</h2>

        <input
          type="email"
          placeholder="Email Công ty"
          className="form-control mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          className="form-control mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="btn btn-primary w-100"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Đang xử lý..." : "Login"}
        </button>

        <p className="mt-3 text-center">
          Chưa có tài khoản?{" "}
          <Link href="/auth/signup" className="text-primary">
            Đăng ký công ty
          </Link>
        </p>
      </div>
    </div>
  );
}
