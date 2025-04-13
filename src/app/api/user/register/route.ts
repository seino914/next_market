import { NextResponse } from "next/server";
import { supabase } from "@/app/utils/database";

export async function GET() {
  try {
    const { data, error } = await supabase.from("users").select();

    if (error) {
      throw error;
    }

    return NextResponse.json({
      message: "全てのユーザー読み取り成功",
      data,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "全てのユーザー読み取り失敗：" + error },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const reqBody = await request.json();

  try {
    const { data, error } = await supabase
      .from("users")
      .insert(reqBody)
      .select();

    if (error) {
      throw error;
    }

    return NextResponse.json({
      message: "ユーザー登録成功",
      data,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "ユーザー登録失敗：" + error },
      { status: 500 }
    );
  }
}
