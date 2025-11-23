"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; 

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Kiểm tra trạng thái đăng nhập
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/auth/check");
        const data = await res.json();
        setIsAuthenticated(data.isAuthenticated);
      } catch (error) {
        console.error("Error checking auth:", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Hàm đăng xuất
  const logout = async () => {
    try {
      await fetch("/auth/logout", {
        method: "POST",
      });

      setIsAuthenticated(false);

      // 👉 Sau khi logout, chuyển về trang Login
      router.push("/auth/login");

    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return { isAuthenticated, loading, logout };
}
