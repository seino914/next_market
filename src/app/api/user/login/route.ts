import { NextResponse } from "next/server";
import { supabase } from "@/app/utils/database";
import { SignJWT } from "jose";

export async function POST(request: Request) {
  const reqBody = await request.json();

  try {
    const { data, error } = await supabase
      .from("users")
      .select()
      .eq("email", reqBody.email)
      .single();

    if (!error) {
      if (data.password === reqBody.password) {
        const secretKey = new TextEncoder().encode(
          "next-market-route-handlers"
        );

        const payload = {
          email: reqBody.email,
        };

        const token = await new SignJWT(payload)
          .setProtectedHeader({ alg: "HS256" })
          .setExpirationTime("1d") // トークン有効期限
          .sign(secretKey);

        console.log(token);

        return NextResponse.json({
          message: "ログイン成功",
          token,
        });
      } else {
        return NextResponse.json({
          message: "ログイン失敗：パスワードが間違っています",
          error,
        });
      }
    } else {
      return NextResponse.json({
        message: "ログイン失敗：ユーザーを追加してください",
        error,
      });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "ログイン失敗：" + error },
      { status: 500 }
    );
  }
}
