# 类型声明目录

如果后续需要放全局类型声明或第三方库补充声明，可以在这里新增 `.d.ts` 文件。

示例：

```ts
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_BASE_URL?: string;
    }
  }
}

export {};
```
