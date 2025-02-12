import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export const PUT = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const { title, checked } = await req.json();
  const [existingTodo] = await sql(`SELECT * FROM todos where id=$1`, [id]);
  if (!existingTodo) {
    return NextResponse.json({ message: "todo not found!" }, { status: 404 });
  }
  await sql(`UPDATE todos set title=$1, checked=$2 WHERE id=$3`, [title, checked, id]);
  const [newTodo] = await sql(`SELECT * FROM todos where id=$1`, [id]);
  return NextResponse.json(newTodo);
};

export const DELETE = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const [existingTodo] = await sql(`SELECT * FROM todos where id=$1`, [id]);
  if (!existingTodo) {
    return NextResponse.json({ message: "todo not found!" }, { status: 404 });
  }
  await sql(`DELETE FROM todos  WHERE id=$1`, [id]);
  return NextResponse.json(existingTodo);
};
