import { section, show } from "../utils/output";

// 装饰器工厂
function Tagged(tag: string): ClassDecorator {
  return (target) => {
    Object.defineProperty(target.prototype, "__tag", {
      value: tag,
      enumerable: false
    });
  };
}

function LogCall(_target: object, propertyKey: string | symbol, descriptor: PropertyDescriptor): void {
  const original = descriptor.value as (...args: unknown[]) => unknown;

  descriptor.value = function (...args: unknown[]) {
    console.log(`调用方法 ${String(propertyKey)}，参数:`, args);
    return original.apply(this, args);
  };
}

interface Pet {
  play(): string;
}

abstract class Animal {
  protected energy = 100;

  protected constructor(public readonly name: string) {}

  abstract speak(): string;

  move(distance: number): string {
    this.energy -= distance;
    return `${this.name} 移动了 ${distance} 米`;
  }
}

@Tagged("family-pet")
class Dog extends Animal implements Pet {
  static species = "Canis familiaris";

  #chipId: string;
  private tricks: string[] = [];

  constructor(name: string, chipId: string) {
    super(name);
    this.#chipId = chipId;
  }

  get chipId(): string {
    return this.#chipId;
  }

  set chipId(value: string) {
    if (!value.startsWith("chip-")) {
      throw new Error("芯片编号必须以 chip- 开头");
    }
    this.#chipId = value;
  }

  speak(): string {
    return `${this.name}: woof`;
  }

  @LogCall
  learn(trick: string): void {
    this.tricks.push(trick);
  }

  play(): string {
    return `${this.name} 正在练习 ${this.tricks.join(", ") || "基础动作"}`;
  }

  getEnergy(): number {
    return this.energy;
  }
}

export function runClassesDecoratorsLesson(): void {
  section("04 类、继承和装饰器");

  const dog = new Dog("Miso", "chip-001");
  dog.learn("sit");
  dog.chipId = "chip-002";

  show("类实例", {
    species: Dog.species,
    speak: dog.speak(),
    move: dog.move(8),
    play: dog.play(),
    chipId: dog.chipId,
    energy: dog.getEnergy(),
    tag: (dog as unknown as { __tag?: string }).__tag
  });
}
