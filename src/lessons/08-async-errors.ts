import { section, show } from "../utils/output";

class CourseLoadError extends Error {
  constructor(public readonly courseId: string, message: string) {
    super(message);
    this.name = "CourseLoadError";
  }
}

type RemoteCourse = {
  id: string;
  title: string;
};

function delay<T>(value: T, ms: number): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), ms);
  });
}

async function fetchCourse(id: string): Promise<RemoteCourse> {
  if (id === "missing") {
    throw new CourseLoadError(id, "课程不存在");
  }

  return delay({ id, title: "异步 TypeScript" }, 10);
}

export async function runAsyncErrorsLesson(): Promise<void> {
  section("08 异步和错误处理");

  const course = await fetchCourse("async-101");
  show("async/await", course);

  try {
    await fetchCourse("missing");
  } catch (error: unknown) {
    if (error instanceof CourseLoadError) {
      show("自定义错误", { courseId: error.courseId, message: error.message });
      return;
    }

    if (error instanceof Error) {
      show("普通错误", error.message);
      return;
    }

    show("未知错误", String(error));
  }
}
