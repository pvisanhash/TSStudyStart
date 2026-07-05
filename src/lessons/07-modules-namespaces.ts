import { section, show } from "../utils/output";

export namespace Geometry {
  export type Rectangle = {
    width: number;
    height: number;
  };

  export function area(rectangle: Rectangle): number {
    return rectangle.width * rectangle.height;
  }
}

interface MergeDemo {
  name: string;
}

interface MergeDemo {
  version: number;
}

export const moduleValue = "这是一个具名导出";

export default function defaultExportMessage(): string {
  return "这是一个默认导出";
}

export function runModulesNamespacesLesson(): void {
  section("07 模块、命名空间和声明合并");

  const rectangle: Geometry.Rectangle = {
    width: 6,
    height: 7
  };

  const merged: MergeDemo = {
    name: "interface declaration merging",
    version: 1
  };

  show("命名空间", { rectangle, area: Geometry.area(rectangle) });
  show("声明合并", merged);
  show("模块导出", { moduleValue, defaultMessage: defaultExportMessage() });
}
