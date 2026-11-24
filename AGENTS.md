# 服务平台前端编码规范

## Google 风格中文注释

本规范适用于本仓库新增和修改的 TypeScript、React 和样式代码，也适用于由 AI 辅助编写的代码。

- 注释正文使用简体中文。标识符、接口字段和 JSDoc 标签沿用代码中的英文拼写。
- 为新增或修改的主要页面组件、导出的业务函数和自定义 Hook 编写 JSDoc。首句概括职责，必要时补充调用约束、副作用或业务规则。
- TypeScript 中以类型声明为准。用 @param 说明参数的业务含义，用 @returns 说明有业务意义的返回值，用 @throws 说明调用方需要处理的异常。根据实际情况选用标签。
- 用行内注释说明复杂判断、异步状态处理和布局断点的设计原因。清晰的 JSX 结构、赋值和样板代码可以通过命名和结构表达。
- 更改逻辑时同步更新相关注释。示例使用占位值，避免在注释中写入真实凭据或内部地址。

## TypeScript 示例

```typescript
/**
 * 生成服务平台登录表单的提交参数。
 *
 * 账号首尾空白会被移除。密码原样保留，因为空格可能是密码的一部分。
 *
 * @param values 从登录表单读取的服务平台账号和密码。
 * @returns 供登录提交处理使用的字段对象。
 */
function buildLoginPayload(values: { account: string; password: string }) {
  return { account: values.account.trim(), password: values.password }
}
```

## 提交前自查

- 主要组件和业务函数的注释是否用中文说明了职责及适用约束。
- 注释中的参数、返回值和行为是否与实际实现一致。
