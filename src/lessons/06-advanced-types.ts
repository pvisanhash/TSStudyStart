import { assertNever, section, show } from "../utils/output";

type Circle = {
  kind: "circle";
  radius: number;
};

type Rectangle = {
  kind: "rectangle";
  width: number;
  height: number;
};

type Shape = Circle | Rectangle;

type HttpMethod = "GET" | "POST";
type ApiPath = "/users" | "/courses";
type Endpoint = `${HttpMethod} ${ApiPath}`;

type Config = {
  apiBaseUrl: string;
  retry: number;
};

export function runAdvancedTypesLesson(): void {
  section("06 高级类型");

  function area(shape: Shape): number {
    switch (shape.kind) {
      case "circle":
        return Math.PI * shape.radius ** 2;
      case "rectangle":
        return shape.width * shape.height;
      default:
        return assertNever(shape);
    }
  }

  function isStringArray(value: unknown): value is string[] {
    return Array.isArray(value) && value.every((item) => typeof item === "string");
  }

  function assertConfig(value: unknown): asserts value is Config {
    if (
      typeof value !== "object" ||
      value === null ||
      typeof (value as Config).apiBaseUrl !== "string" ||
      typeof (value as Config).retry !== "number"
    ) {
      throw new Error("配置格式不正确");
    }
  }

  const readonlyLevels = ["beginner", "intermediate", "advanced"] as const;
  type Level = (typeof readonlyLevels)[number];

  const config = {
    apiBaseUrl: "https://example.com/api",
    retry: 3
  } satisfies Config;

  const endpoint: Endpoint = "GET /courses";
  const input: unknown = ["TypeScript", "Node.js"];
  const maybeConfig: unknown = config;

  assertConfig(maybeConfig);

  let parsedInput = "不是字符串数组";
  if (isStringArray(input)) {
    parsedInput = input.join(", ");
  }

  const date = new Date();
  const dateLabel = date instanceof Date ? date.toISOString() : "not date";

  const level: Level = readonlyLevels[0];

  show("可辨识联合和穷尽检查", {
    circle: area({ kind: "circle", radius: 3 }),
    rectangle: area({ kind: "rectangle", width: 4, height: 5 })
  });
  show("类型守卫和断言函数", { parsedInput, maybeConfig });
  show("as const / satisfies / 模板字面量类型", { level, config, endpoint, dateLabel });
}
