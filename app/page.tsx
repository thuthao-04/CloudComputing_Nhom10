"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "./lib/supabaseClient";
import { Session, AuthChangeEvent } from "@supabase/supabase-js";

export default function HomePage() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Check session on mount
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUserEmail(data.session?.user.email ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, session: Session | null) => {
        setUserEmail(session?.user.email ?? null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  // Login / Signup
  const handleAuth = async (type: "login" | "signup", email: string, password: string) => {
    setLoading(true);
    try {
      let res;
      if (type === "login") {
        res = await supabase.auth.signInWithPassword({ email, password });
      } else {
        res = await supabase.auth.signUp({ email, password });
      }

      if (res.error) alert(res.error.message);
      else if (res.data.user) setUserEmail(res.data.user.email ?? null);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUserEmail(null);
  };

  // Local state for input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className="container mt-5 text-center">
      <header className="d-flex justify-content-end mb-4 gap-3">
        {!userEmail ? (
          <div className="d-flex gap-2">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control form-control-sm"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control form-control-sm"
            />
            <button
              className="btn btn-primary btn-sm"
              onClick={() => handleAuth("login", email, password)}
              disabled={loading}
            >
              Login
            </button>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => handleAuth("signup", email, password)}
              disabled={loading}
            >
              Sign Up
            </button>
          </div>
        ) : (
          <div className="d-flex align-items-center gap-2">
            <span>Xin chào, {userEmail}</span>
            <button className="btn btn-danger btn-sm" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </header>

      <h1 className="mb-4">Trang Quản Lý</h1>
      <p>Chọn mục cần quản lý:</p>
      <div className="d-flex justify-content-center gap-3 mt-3">
        <Link href="/users" className="btn btn-primary">
          Quản lý người dùng
        </Link>
        <Link href="/products" className="btn btn-success">
          Quản lý sản phẩm
        </Link>
      </div>
    </main>
  );
}
