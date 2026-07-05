# TypeScript 初学者入门学习项目

这是一个完整的 TypeScript 学习项目，使用 `fnm` 管理 Node.js 版本，覆盖初学者常见且重要的 TypeScript 语法：基础类型、函数、对象、接口、类、装饰器、泛型、高级类型、模块、命名空间、异步和错误处理。

## 环境要求

- `fnm`：Fast Node Manager，用于切换 Node.js 版本。
- `Node.js`：本项目通过 `.node-version` 指定 `24.16.0`。
- `npm`：Node Package Manager，用于安装依赖和运行脚本。

## 快速开始

```bash
fnm install
fnm use
npm install
npm run dev
```

## 常用命令

```bash
npm run dev        # 直接运行 src/index.ts
npm run typecheck  # 只检查类型，不生成 dist
npm run build      # 编译到 dist
npm start          # 运行编译后的 JavaScript
npm run clean      # 删除 dist
```

## 学习顺序

1. `src/lessons/01-basic-types.ts`：基础类型、联合类型、字面量类型、枚举、元组。
2. `src/lessons/02-functions.ts`：函数声明、箭头函数、重载、可选参数、剩余参数、`this` 参数。
3. `src/lessons/03-objects-interfaces.ts`：对象、接口、类型别名、交叉类型、索引签名。
4. `src/lessons/04-classes-decorators.ts`：类、继承、抽象类、访问修饰符、装饰器。
5. `src/lessons/05-generics.ts`：泛型函数、泛型类、约束、`keyof`、工具类型。
6. `src/lessons/06-advanced-types.ts`：类型收窄、类型守卫、断言函数、条件类型、模板字面量类型。
7. `src/lessons/07-modules-namespaces.ts`：模块导入导出、命名空间、声明合并。
8. `src/lessons/08-async-errors.ts`：`Promise`、`async/await`、错误处理。
9. `exercises/01-practice.ts`：练习文件，可以边学边改。

## 建议

先运行 `npm run dev` 看输出，再逐个打开 lesson 文件阅读和修改。每次修改后运行 `npm run typecheck`，这是学习 TypeScript 最快的反馈方式。
