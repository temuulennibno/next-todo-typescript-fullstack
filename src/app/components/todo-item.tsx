import { Button } from "@/components/ui/button";
import { Todo } from "@/types/todo";
import { X } from "lucide-react";

export const TodoItem = ({ todo }: { todo: Todo }) => {
  return (
    <li className="flex justify-between items-center">
      <label className="flex gap-4 items-center">
        <input type="checkbox" defaultChecked={todo.checked} />
        {todo.title}
      </label>
      <Button variant="outline">
        <X />
      </Button>
    </li>
  );
};
