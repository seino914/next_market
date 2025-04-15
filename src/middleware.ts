import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  // const token = await request.headers.get("Authorization")?.split(" ")[1];
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImR1bW15QGdtYWlsLmNvbSIsImV4cCI6MTc0NDc2Mjk0MH0.iZWkzOJmIrScjljh6ovcA91OCXTShGMCqJgZ1cyaprg";

  if (!token && request.method !== "GET") {
    return NextResponse.json({
      message: "アクセス権限がありません。ログインしてください",
    });
  }

  if (!token) {
    return NextResponse.json({ message: "トークンがありません" });
  }

  try {
    const secretKey = new TextEncoder().encode("next-market-route-handlers");
    const decodedJwt = await jwtVerify(token, secretKey);

    return NextResponse.next();
  } catch {
    return NextResponse.json({
      message: "トークンが正しくないのでログインしてください",
    });
  }
}

export const config = {
  matcher: ["/api/item/:path*"],
};
