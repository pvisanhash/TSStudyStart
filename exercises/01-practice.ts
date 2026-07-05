type TodoStatus = "todo" | "doing" | "done";

interface Todo {
  id: string;
  title: string;
  status: TodoStatus;
  tags: string[];
}

export function createTodo(title: string, tags: string[] = []): Todo {
  return {
    id: crypto.randomUUID(),
    title,
    status: "todo",
    tags
  };
}

export function finishTodo(todo: Todo): Todo {
  return {
    ...todo,
    status: "done"
  };
}

export function groupByStatus(todos: Todo[]): Record<TodoStatus, Todo[]> {
  return todos.reduce<Record<TodoStatus, Todo[]>>(
    (groups, todo) => {
      groups[todo.status].push(todo);
      return groups;
    },
    {
      todo: [],
      doing: [],
      done: []
    }
  );
}

const first = createTodo("阅读 01-basic-types.ts", ["type"]);
const second = finishTodo(createTodo("运行 npm run typecheck", ["tooling"]));

console.log(groupByStatus([first, second]));
