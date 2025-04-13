import { NextResponse } from "next/server";
import { supabase } from "@/app/utils/database";

export async function GET(context: { params: { id: string } }) {
  const params = await context.params;

  try {
    const { data, error } = await supabase
      .from("items")
      .select()
      .eq("id", params.id)
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({
      message: "アイテム読み取り成功",
      data,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "アイテム読み取り失敗：" + error },
      { status: 500 }
    );
  }
}
