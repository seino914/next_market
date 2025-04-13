import { NextResponse } from "next/server";
import { supabase } from "@/app/utils/database";
import { Params } from "@/app/types/types";

export async function PUT(request: Request, context: { params: Params }) {
  const reqBody = await request.json();
  const params = await context.params;

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
