import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/utils/database";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  const { id } = await params;

  try {
    const { data, error } = await supabase
      .from("items")
      .select()
      .eq("id", id)
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
