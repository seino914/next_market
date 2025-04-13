import { NextResponse } from "next/server";
import { supabase } from "@/app/utils/database";
import { Params } from "@/app/types/types";

export async function DELETE(request: Request, context: { params: Params }) {
  const { id } = context.params;

  try {
    const { data, error } = await supabase
      .from("items")
      .delete()
      .eq("id", id)
      .select()
      .single();

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
