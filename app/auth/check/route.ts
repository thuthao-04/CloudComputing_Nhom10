import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // Lấy cookie token từ request
  const token = req.cookies.get("token")?.value;
  
  // Kiểm tra xem có token không
  // Trong thực tế, bạn nên verify token với JWT, nhưng ở đây là demo
  if (token && token === "fake-jwt-token") {
    return NextResponse.json({ isAuthenticated: true });
  }
  
  return NextResponse.json({ isAuthenticated: false });
}