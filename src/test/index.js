// 这种方式导出多个对象,当使用import时,可以使用impor {} from index 指定使用哪个模块

export function foo() {
  return "foo"
}

export function bar() {
  console.log("bar")
}


