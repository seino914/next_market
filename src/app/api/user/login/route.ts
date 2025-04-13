import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/utils/database";

export async function GET() {
  try {
    const { data, error } = await supabase.from("users").select();

    if (error) {
      throw error;
    }

    return NextResponse.json({
      message: "ユーザー読み取り成功",
      data,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "ユーザー読み取り失敗：" + error },
      { status: 500 }
    );
  }
}

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
        return NextResponse.json({
          message: "ログイン成功",
          data,
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
