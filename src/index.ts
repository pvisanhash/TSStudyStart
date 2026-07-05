import {
  runAdvancedTypesLesson,
  runAsyncErrorsLesson,
  runBasicTypesLesson,
  runClassesDecoratorsLesson,
  runFunctionsLesson,
  runGenericsLesson,
  runModulesNamespacesLesson,
  runObjectsInterfacesLesson
} from "./lessons";

async function main(): Promise<void> {
  runBasicTypesLesson();
  runFunctionsLesson();
  runObjectsInterfacesLesson();
  runClassesDecoratorsLesson();
  runGenericsLesson();
  runAdvancedTypesLesson();
  runModulesNamespacesLesson();
  await runAsyncErrorsLesson();
}

main().catch((error: unknown) => {
  console.error("程序执行失败:", error);
  process.exitCode = 1;
});
