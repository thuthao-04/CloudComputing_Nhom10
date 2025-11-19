"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/navigation";

export function useRequireAuth() {
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      const sessionUser = data.session?.user;

      if (!sessionUser) {
        router.replace("/auth/login");
        setLoading(false);
        return;
      }

      // Lấy tên người dùng từ bảng users
      const { data: userData } = await supabase
        .from("users")
        .select("name")
        .eq("email", sessionUser.email)
        .single();

      setUserName(userData?.name ?? sessionUser.email);
      setLoading(false);
    };

    checkAuth();

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!session?.user) {
        router.replace("/auth/login");
        setUserName(null);
        setLoading(false);
      } else {
        const { data: userData } = await supabase
          .from("users")
          .select("name")
          .eq("email", session.user.email)
          .single();
        setUserName(userData?.name ?? session.user.email);
        setLoading(false);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, [router]);

  const logout = async () => {
    await supabase.auth.signOut();
    setUserName(null);
    router.replace("/auth/login");
  };

  return { loading, userName, logout };
}
