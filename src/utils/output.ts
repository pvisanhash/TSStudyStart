export function section(title: string): void {
  console.log(`\n=== ${title} ===`);
}

export function show<T>(label: string, value: T): T {
  console.log(label, value);
  return value;
}

export function assertNever(value: never): never {
  throw new Error(`未处理的分支: ${JSON.stringify(value)}`);
}
