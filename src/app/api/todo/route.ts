import { Todo } from "@/types/todo";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export const todos: Todo[] = [{ id: nanoid(), title: "Sereerei zaluusai", checked: true }];
const sql = neon(process.env.DATABASE_URL!);

export const GET = async () => {
  const result = await sql`SELECT * from todos`;
  return NextResponse.json(result);
};

export const POST = async (req: NextRequest) => {
  const { title } = await req.json();
  const newTodo = { id: nanoid(), title: title, checked: false };
  await sql(`INSERT INTO todos (id,title) VALUES ($1,$2)`, [newTodo.id, newTodo.title]);
  return NextResponse.json(newTodo);
};
