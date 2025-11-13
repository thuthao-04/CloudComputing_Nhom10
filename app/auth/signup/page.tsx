"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [companyName, setCompanyName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [industry, setIndustry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSignup = async () => {
    if (!companyName || !phone || !address || !industry || !email || !password) {
      alert("Vui lòng điền đầy đủ thông tin");
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ Tạo user trên Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        alert(authError.message);
        return;
      }

      // 2️⃣ Lưu thông tin công ty vào table "companies"
      const { error: dbError } = await supabase
        .from("companies")
        .insert([
          {
            user_id: authData.user?.id,
            company_name: companyName,
            phone,
            address,
            industry,
            email,
          },
        ]);

      if (dbError) {
        alert(dbError.message);
        return;
      }

      alert("Đăng ký công ty thành công! Kiểm tra email để xác thực.");
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h2 className="mb-4 text-center">Đăng ký công ty</h2>

        <input
          type="text"
          placeholder="Tên công ty"
          className="form-control mb-2"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Số điện thoại"
          className="form-control mb-2"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="text"
          placeholder="Địa chỉ"
          className="form-control mb-2"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="Ngành nghề"
          className="form-control mb-2"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
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
          className="btn btn-success w-100"
          onClick={handleSignup}
          disabled={loading}
        >
          {loading ? "Đang xử lý..." : "Đăng ký"}
        </button>

        <p className="mt-3 text-center">
          Đã có tài khoản?{" "}
          <Link href="/login" className="text-primary">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
