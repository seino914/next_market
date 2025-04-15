import { NextResponse } from "next/server";
import { supabase } from "@/app/utils/database";

export const revalidate = 0;

export async function GET() {
  try {
    const { data, error } = await supabase.from("items").select();

    if (error) {
      throw error;
    }

    return NextResponse.json({
      message: "全てのアイテム読み取り成功",
      data,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "全てのアイテム読み取り失敗：" + error },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const reqBody = await request.json();

  try {
    const { data, error } = await supabase
      .from("items")
      .insert(reqBody)
      .select();

    if (error) {
      throw error;
    }

    return NextResponse.json({
      message: "アイテム作成成功",
      data,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "アイテム作成失敗：" + error },
      { status: 500 }
    );
  }
}
