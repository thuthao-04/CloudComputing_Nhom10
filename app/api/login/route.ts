import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../lib/supabaseClient";
import bcrypt from "bcrypt";
import type { User } from "@/types/user";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json() as { email: string; password: string };

    // Lấy user theo email
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Email không tồn tại" }, { status: 400 });
    }

    // So sánh password
    const isMatch = await bcrypt.compare(password, (data as any).password);
    if (!isMatch) {
      return NextResponse.json({ error: "Mật khẩu không đúng" }, { status: 400 });
    }

    // Login thành công → set cookie token
    const res = NextResponse.json({ user: data });
    // Ở đây bạn có thể dùng JWT, mình demo token giả
    const token = "fake-jwt-token"; 
    res.cookies.set("token", token, { httpOnly: true, path: "/" });
    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Có lỗi server" }, { status: 500 });
  }
}
