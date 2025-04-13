import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/utils/database";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  const { id } = await params;

  try {
    const { data, error } = await supabase
      .from("users")
      .select()
      .eq("id", id)
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({
      message: "ユーザー読み取り成功",
      data,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "ユーザー読み取り失敗：" + error },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  const reqBody = await request.json();
  const { id } = await params;

  try {
    const { data, error } = await supabase
      .from("users")
      .update(reqBody)
      .eq("id", id)
      .select();

    if (error) {
      throw error;
    }

    return NextResponse.json({
      message: "ユーザー更新成功",
      data,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "ユーザー更新失敗：" + error },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  const { id } = await params;

  try {
    const { data, error } = await supabase
      .from("users")
      .delete()
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({
      message: "ユーザー削除成功",
      data,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "ユーザー削除失敗：" + error },
      { status: 500 }
    );
  }
}
