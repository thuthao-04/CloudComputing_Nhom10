import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../lib/supabaseClient";
import bcrypt from "bcrypt";
import type { UserAuth, User } from "@/types/user";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as UserAuth;
    const { name, email, password, phone, address } = body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from("users")
      .insert([{ name, email, password: hashedPassword, phone, address }])
      .select();

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    return NextResponse.json({ user: data[0] as User });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Có lỗi server" }, { status: 500 });
  }
}
