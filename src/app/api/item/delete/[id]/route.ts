import { NextResponse } from "next/server";
import { supabase } from "@/app/utils/database";

export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  const params = await context.params;

  try {
    const { data, error } = await supabase
      .from("items")
      .delete()
      .eq("id", params.id)
      .select();

    if (error) {
      throw error;
    }

    return NextResponse.json({
      message: "アイテム削除成功",
      data,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "アイテム削除失敗：" + error },
      { status: 500 }
    );
  }
}
