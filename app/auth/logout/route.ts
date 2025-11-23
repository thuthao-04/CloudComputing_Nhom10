import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json(
    { message: "Logged out and cleared all user data" },
    { status: 200 }
  );

  // Xóa cookie token = Đã đăng xuất
  response.headers.append(
    "Set-Cookie",
    "token=; Path=/; HttpOnly; Max-Age=0; SameSite=Lax"
  );

  // Nếu bạn có thêm cookie khác → Xóa luôn
  response.headers.append(
    "Set-Cookie",
    "userId=; Path=/; HttpOnly; Max-Age=0; SameSite=Lax"
  );

  response.headers.append(
    "Set-Cookie",
    "session=; Path=/; HttpOnly; Max-Age=0; SameSite=Lax"
  );

  return response;
}
