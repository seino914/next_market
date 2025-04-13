import { NextResponse } from "next/server";
import { supabase } from "@/app/utils/database";

export async function GET() {
  try {
    const { data, error } = await supabase.from("items").select();

    if (error) {
      throw error;
    }

    return NextResponse.json({ message: "読み取り成功", data });
  } catch (error) {
    return NextResponse.json(
      { message: "読み取り失敗：" + error },
      { status: 500 }
    );
  }
}
