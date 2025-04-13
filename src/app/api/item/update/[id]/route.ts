import { NextResponse } from "next/server";
import { supabase } from "@/app/utils/database";

export async function PATCH(
  request: Request,
  context: { params: { id: string } }
) {
  const params = context.params;
  const reqBody = await request.json();

  try {
    const { data, error } = await supabase
      .from("items")
      .update(reqBody)
      .eq("id", params.id)
      .select();

    if (error) {
      throw error;
    }

    return NextResponse.json({
      message: "アイテム更新成功",
      data,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "アイテム更新失敗：" + error },
      { status: 500 }
    );
  }
}
