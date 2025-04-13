import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/utils/database";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  const reqBody = await request.json();
  const { id } = await params;

  try {
    const { data, error } = await supabase
      .from("items")
      .update(reqBody)
      .eq("id", id)
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
