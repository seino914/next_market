import { NextResponse } from "next/server";
import { supabase } from "@/app/utils/database";

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

    return NextResponse.json({ message: "アイテム作成成功", data });
  } catch (error) {
    return NextResponse.json(
      { message: "アイテム作成失敗：" + error },
      { status: 500 }
    );
  }
}
