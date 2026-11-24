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

`npm run start` 用于在本地运行构建后的版本。页面路由放在 `src/app/` 下。服务平台登录页位于 `/login`。

## 注释规范

本项目采用 **Google 风格中文注释**。主要页面组件、导出的业务函数和自定义 Hook 使用中文 JSDoc，并按需说明参数、返回值和异常。规则和示例见 [AGENTS.md](./AGENTS.md#google-风格中文注释)。

## 登录联调

登录页按服务平台字段表 Account.json 使用 `username` 和 `password`，角色枚举沿用 `student`、`ta`、`mgmt`。服务平台管理身份沿用 `mgmt`。

浏览器统一提交 `POST /api/auth/login`，JSON 请求体为 `{ username, password }`，成功响应为 `{ role }`。服务端确定账号归属后调用对应的角色接口。角色接口路径为联调草案。

| 角色 | 服务端登录接口 | 成功后的入口 |
| --- | --- | --- |
| 学员 | `POST /api/auth/student/login` | `/today` |
| 助教 | `POST /api/auth/ta/login` | `/ta/attention` |
| 服务平台管理员 | `POST /api/auth/management/login` | `/mgmt/students` |

当前统一入口返回 503。正式联调需由服务端确认多角色账号的当前角色规则，接入真实会话，再对业务路由和接口做服务端鉴权。三端落地业务页待接入。
