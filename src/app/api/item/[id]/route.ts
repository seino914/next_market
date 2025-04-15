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

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  const reqBody = await request.json();
  const { id } = await params;

  try {
    const { data: loginData, error: loginError } = await supabase
      .from("items")
      .select()
      .eq("id", id)
      .single();

    if (loginError) {
      throw loginError;
    }

    if (loginData.email !== reqBody.email) {
      return NextResponse.json(
        { message: "ユーザーが一致しません" },
        { status: 401 }
      );
    }

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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  const reqBody = await request.json();
  const { id } = await params;

  try {
    const { data: loginData, error: loginError } = await supabase
      .from("items")
      .select()
      .eq("id", id)
      .single();

    if (loginError) {
      throw loginError;
    }

    if (loginData.email !== reqBody.email) {
      return NextResponse.json(
        { message: "ユーザーが一致しません" },
        { status: 401 }
      );
    }

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
