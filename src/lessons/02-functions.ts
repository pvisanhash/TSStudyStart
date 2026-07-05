import { section, show } from "../utils/output";

type Calculator = (left: number, right: number) => number;

interface CourseContext {
  title: string;
  level: "beginner" | "advanced";
}

export function runFunctionsLesson(): void {
  section("02 函数");

  function add(left: number, right = 0): number {
    return left + right;
  }

  const multiply: Calculator = (left, right) => left * right;

  function greet(name: string, greeting?: string): string {
    return `${greeting ?? "你好"}, ${name}`;
  }

  function sumAll(...numbers: number[]): number {
    return numbers.reduce((total, item) => total + item, 0);
  }

  function parseInput(value: string): string[];
  function parseInput(value: number): string;
  function parseInput(value: string | number): string[] | string {
    return typeof value === "string" ? value.split("") : value.toFixed(2);
  }

  // this 参数只参与类型检查，编译成 JavaScript 后不会变成真实参数。
  function describeCourse(this: CourseContext, prefix: string): string {
    return `${prefix}: ${this.title} (${this.level})`;
  }

  function mapNumbers(values: number[], callback: (value: number, index: number) => string): string[] {
    return values.map(callback);
  }

  const course: CourseContext = {
    title: "TypeScript",
    level: "beginner"
  };

  show("普通函数和箭头函数", { add: add(2, 3), multiply: multiply(4, 5) });
  show("可选参数和剩余参数", { greet: greet("小夏"), sum: sumAll(1, 2, 3, 4) });
  show("函数重载", { stringInput: parseInput("TS"), numberInput: parseInput(3.14159) });
  show("this 参数", describeCourse.call(course, "课程"));
  show("回调函数", mapNumbers([10, 20], (value, index) => `第 ${index + 1} 个值是 ${value}`));
}
