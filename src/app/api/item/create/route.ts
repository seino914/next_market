import { NextResponse } from "next/server";
import { supabase } from "@/app/utils/database";

export async function POST(request: Request) {
  const reqBody = await request.json();
  console.log(reqBody);

  try {
    await supabase.from("items").insert(reqBody);
    return NextResponse.json({ message: "アイテム作成成功" });
  } catch (error) {
    return NextResponse.json(
      { message: "アイテム作成失敗：：" + error },
      { status: 500 }
    );
  }
}
