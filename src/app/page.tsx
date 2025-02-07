"use client";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Todo } from "@/types/todo";
import { useEffect, useState } from "react";
import { TodoItem } from "./components/todo-item";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import axios from "axios";
import { todo } from "node:test";

const FormSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Todo title must have at least 2 characters" })
    .max(255, { message: "Todo title can't have more than 255 characters" }),
});

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
    },
  });

  useEffect(() => {
    fetch("/api/todo")
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
      });
  }, []);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const response = await axios.post("/api/todo", data);
      setTodos([...todos, response.data]);
      toast.success("Todo implemented successfully");
      form.reset();
    } catch (error) {
      console.error(error);
      toast.error("Can't add todo");
    }
  };

  const onDelete = (id: string) => {
    const newTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center flex-col gap-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-[400px] flex gap-4 items-center">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input autoFocus placeholder="Write your todo..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Add</Button>
        </form>
      </Form>
      <ul className="pl-4 list-disc w-full max-w-[400px]">
        {todos.map((todo) => (
          <TodoItem onDelete={onDelete} todo={todo} key={todo.id} />
        ))}
      </ul>
    </div>
  );
}
