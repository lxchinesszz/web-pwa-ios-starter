# 使用模板创建新应用

本文档供开发者和 AI Agent 使用。每个应用必须位于自己的独立目录中，并在该目录内完成初始化。不要在一个应用目录中生成另一个应用。

## 创建流程

1. 将本模板复制到新应用目录，复制时排除 `.git/`、`node_modules/`、`.pnpm-store/`、`dist/` 和编辑器临时文件。
2. 进入新应用目录。
3. 运行初始化命令：

   ```bash
   node scripts/init-app.mjs \
     --name "旅行规划助手" \
     --short-name "旅行助手" \
     --slug "trip-planner" \
     --description "使用 AI 快速生成旅行计划" \
     --theme-color "#863bff"
   ```

4. 运行 `pnpm install`。模板通过 `pnpm-workspace.yaml` 将依赖存储在 `~/.pnpm-store`，所有应用共享，不会重新下载或保存相同包的完整副本。
5. 替换 `public/favicon.svg`，再运行 `pnpm generate:pwa-assets`。
6. 根据需求修改 `src/App.tsx` 及相关组件。应用元数据统一从根目录 `app.config.ts` 读取。
7. 运行 `pnpm lint && pnpm build`。
8. 本地确认后，由用户明确要求时再运行 `pnpm deploy`。

## AI Agent 约束

- 开始修改前先读取 `AGENTS.md`、`NEW_APP.md` 和 `app.config.ts`。
- 应用名称、短名称、描述、slug、PWA 颜色和页脚说明只在 `app.config.ts` 中维护。
- 不要在 `vite.config.ts`、`src/App.tsx`、`index.html` 或部署命令中重新写死应用元数据。
- 保留现有的 PWA 安装、离线缓存、版本显示和手动更新能力。
- `slug` 必须使用 kebab-case，并同时作为 Vite base、PWA scope、start URL 和远端部署目录。
- 新应用版本从 `0.1.0` 开始；`pnpm deploy` 会先自动递增补丁版本。
- 未经用户允许，不执行部署、删除目录或覆盖已存在的其他应用。

## 配置说明

根目录 `app.config.ts` 是应用元数据的唯一来源：

```ts
export const appConfig = {
  name: '旅行规划助手',
  shortName: '旅行助手',
  description: '使用 AI 快速生成旅行计划',
  slug: 'trip-planner',
  lang: 'zh-CN',
  themeColor: '#863bff',
  backgroundColor: '#ffffff',
  footerNote: 'PWA 应用',
}
```

部署地址、PWA manifest 和页面品牌信息都会从这份配置生成。

## 常用命令

```bash
pnpm install
pnpm clean
pnpm dev
pnpm generate:pwa-assets
pnpm lint
pnpm build
pnpm deploy
```

`pnpm deploy` 会修改版本号并上传构建产物，因此只在确认发布时执行。
