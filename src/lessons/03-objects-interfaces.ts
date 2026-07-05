import { section, show } from "../utils/output";

interface Person {
  readonly id: string;
  name: string;
  age?: number;
}

interface Learner extends Person {
  skills: string[];
  contact?: {
    email?: string;
    github?: string;
  };
}

interface ScoreBook {
  [subject: string]: number;
}

type Address = {
  city: string;
  street: string;
};

type WithTimestamp = {
  createdAt: Date;
  updatedAt: Date;
};

type LearnerRecord = Learner & {
  address: Address;
} & WithTimestamp;

export function runObjectsInterfacesLesson(): void {
  section("03 对象、接口和类型别名");

  const learner: LearnerRecord = {
    id: "learner-1",
    name: "Grace",
    age: 22,
    skills: ["JavaScript", "TypeScript"],
    contact: {
      email: "grace@example.com"
    },
    address: {
      city: "Shanghai",
      street: "Type Road"
    },
    createdAt: new Date("2026-01-01T00:00:00.000Z"),
    updatedAt: new Date("2026-06-01T00:00:00.000Z")
  };

  const { name, contact: { email = "未填写" } = {} } = learner;

  const scores: ScoreBook = {
    TypeScript: 95,
    JavaScript: 90
  };

  function printPerson(person: Person): string {
    return `${person.name} (${person.id})`;
  }

  show("接口继承和交叉类型", learner);
  show("对象解构默认值", { name, email });
  show("索引签名", scores);
  show("结构化类型系统", printPerson({ id: "temp", name: "临时学习者" }));
}
