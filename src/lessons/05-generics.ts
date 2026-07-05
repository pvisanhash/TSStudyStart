import { section, show } from "../utils/output";

type HasId = {
  id: string | number;
};

interface Repository<T extends HasId> {
  add(item: T): void;
  findById(id: T["id"]): T | undefined;
  all(): T[];
}

class MemoryRepository<T extends HasId> implements Repository<T> {
  private items = new Map<T["id"], T>();

  add(item: T): void {
    this.items.set(item.id, item);
  }

  findById(id: T["id"]): T | undefined {
    return this.items.get(id);
  }

  all(): T[] {
    return [...this.items.values()];
  }
}

type Nullable<T> = {
  [Key in keyof T]: T[Key] | null;
};

type ApiResult<T> = T extends Error
  ? { ok: false; error: T }
  : { ok: true; data: T };

type ElementOf<T> = T extends Array<infer Item> ? Item : T;

type Paginated<T, Meta = { total: number }> = {
  items: T[];
  meta: Meta;
};

export function runGenericsLesson(): void {
  section("05 泛型和工具类型");

  function identity<T>(value: T): T {
    return value;
  }

  function pair<Key extends string, Value>(key: Key, value: Value): Record<Key, Value> {
    return { [key]: value } as Record<Key, Value>;
  }

  function getProperty<TObject, TKey extends keyof TObject>(object: TObject, key: TKey): TObject[TKey] {
    return object[key];
  }

  type Course = {
    id: string;
    title: string;
    lessons: number;
    published: boolean;
  };

  type CourseDraft = Partial<Course>;
  type CourseSummary = Pick<Course, "id" | "title">;
  type CourseWithoutStatus = Omit<Course, "published">;
  type RequiredCourse = Required<Course>;
  type ReadonlyCourse = Readonly<Course>;
  type CourseFlags = Record<keyof Course, boolean>;
  type CourseTitle = ReturnType<() => string>;
  type AwaitedCourse = Awaited<Promise<Course>>;
  type NullableCourse = Nullable<Course>;
  type SuccessResult = ApiResult<Course>;
  type ErrorResult = ApiResult<Error>;
  type LessonItem = ElementOf<string[]>;
  type CoursePage = Paginated<Course>;

  const repository = new MemoryRepository<Course>();
  const course: Course = {
    id: "ts-101",
    title: "TypeScript 入门",
    lessons: 8,
    published: true
  };

  repository.add(course);

  const draft: CourseDraft = { title: "草稿课程" };
  const summary: CourseSummary = { id: course.id, title: course.title };
  const withoutStatus: CourseWithoutStatus = { id: course.id, title: course.title, lessons: course.lessons };
  const requiredCourse: RequiredCourse = course;
  const readonlyCourse: ReadonlyCourse = course;
  const flags: CourseFlags = { id: true, title: true, lessons: true, published: true };
  const title: CourseTitle = "工具类型 ReturnType";
  const awaitedCourse: AwaitedCourse = course;
  const nullableCourse: NullableCourse = { id: null, title: course.title, lessons: null, published: true };
  const success: SuccessResult = { ok: true, data: course };
  const failure: ErrorResult = { ok: false, error: new Error("示例错误") };
  const lessonItem: LessonItem = "generic";
  const page: CoursePage = { items: repository.all(), meta: { total: 1 } };

  show("泛型函数", { identity: identity("保持原类型"), pair: pair("level", "beginner") });
  show("泛型约束和索引访问", { found: repository.findById("ts-101"), titleByKey: getProperty(course, "title") });
  show("工具类型", { draft, summary, withoutStatus, requiredCourse, readonlyCourse, flags, title });
  show("高级泛型类型", { awaitedCourse, nullableCourse, success, failure: failure.error.message, lessonItem, page });
}
