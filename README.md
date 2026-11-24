# 卓工协会服务平台前端

本仓库是卓工协会服务平台的独立前端工程，采用 React、Next.js App Router 和 TypeScript。

## 本地开发

在 Ubuntu（WSL）中使用 Node.js 24 和 npm。使用 nvm 时，可运行 `nvm install` 和 `nvm use` 切换到项目记录的版本。

```bash
npm ci
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000)。如果端口已占用，以终端显示的地址为准。

## 检查与构建

```bash
npm run lint
npm run build
npm run start
```

`npm run start` 用于在本地运行构建后的版本。页面路由放在 `src/app/` 下，当前首页用于验证工程启动，服务平台登录页将在后续实现。

## 注释规范

本项目采用 **Google 风格中文注释**。主要页面组件、导出的业务函数和自定义 Hook 使用中文 JSDoc，并按需说明参数、返回值和异常。规则和示例见 [AGENTS.md](./AGENTS.md#google-风格中文注释)。
