import { section, show } from "../utils/output";

export function runBasicTypesLesson(): void {
  section("01 基础类型");

  const courseName: string = "TypeScript 入门";
  const lessonCount: number = 8;
  const isFriendly: boolean = true;
  const maxSafeInteger: bigint = 9007199254740991n;
  const uniqueKey: symbol = Symbol("course");

  show("原始类型", { courseName, lessonCount, isFriendly, maxSafeInteger, uniqueKey: uniqueKey.description });

  const scores: number[] = [88, 92, 100];
  const tags: Array<string> = ["type", "interface", "generic"];

  // 元组 tuple：每个位置的类型和数量都可以被约束。
  const student: [name: string, age: number, active?: boolean] = ["小夏", 20, true];

  enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT"
  }

  const enum HttpStatus {
    Ok = 200,
    Created = 201,
    NotFound = 404
  }

  type Id = string | number; // 联合类型
  type Theme = "light" | "dark" | "system"; // 联合的字面量类型
  type Point = {
    x: number;
    y: number;
  }; // 对象字面量类型

  interface UserProfile {
    id: Id;
    name: string;
    theme: Theme;
    location?: Point;
  }

  const user: UserProfile = {
    id: "u-1001",
    name: "Ada",
    theme: "system",
    location: { x: 10, y: 20 }
  };

  const countByLevel: Record<string, number> = {
    beginner: 12,
    intermediate: 5
  };

  let unknownValue: unknown = "先检查类型，再使用";
  let anyValue: any = "any 会关闭类型保护，真实项目中少用";
  anyValue = 42;

  if (typeof unknownValue === "string") {
    unknownValue = unknownValue.toUpperCase();
  }

  function logOnly(message: string): void {
    console.log(message);
  }

  function fail(message: string): never {
    throw new Error(message);
  }

  show("数组和元组", { scores, tags, student });
  show("枚举", { direction: Direction.Up, ok: HttpStatus.Ok });
  show("对象类型", { user, countByLevel, unknownValue, anyValue });
  logOnly("void 表示函数不返回有意义的值");

  // never 常用于“理论上不会发生”的分支。这里不调用 fail，避免中断示例程序。
  show("never 示例函数名", fail.name);
}
