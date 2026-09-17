# 使用模板创建新应用

本文档供开发者和 AI Agent 使用。每个应用必须位于自己的独立目录中，并在该目录内完成初始化。不要在一个应用目录中生成另一个应用。

## 两种创建方式

| 方式 | 模板来源 | 执行范围 | 适用情况 |
| --- | --- | --- | --- |
| `node scripts/init-app.mjs` | 已复制到新目录的本地模板 | 只写入应用配置和版本 | 需要使用本地尚未推送的模板，或想逐步控制安装与构建 |
| `create-pwa-app` | GitHub 上的模板仓库 | 下载、初始化、安装依赖、生成图标、lint、build | 想从远端模板一次创建可运行的应用 |

两种方式都在**独立的新目录**中生成应用。不要在现有应用目录中再创建应用。两者都不会自动部署，也不会替你编写应用页面或设计正式图标。

## 方式一：复制本地模板后初始化

在应用目录之外，将本地模板复制到新目录。将 `/path/to/web-pwa-starter` 换成你的模板仓库路径：

```bash
rsync -a \
  --exclude='.git/' \
  --exclude='node_modules/' \
  --exclude='.pnpm-store/' \
  --exclude='dist/' \
  --exclude='.DS_Store' \
  /path/to/web-pwa-starter/ ./trip-planner/
cd trip-planner
```

在新目录运行初始化脚本：

```bash
node scripts/init-app.mjs \
  --name "旅行规划助手" \
  --short-name "旅行助手" \
  --slug "trip-planner" \
  --description "使用 AI 快速生成旅行计划" \
  --theme-color "#863bff"
pnpm install
```

**原理：** `scripts/init-app.mjs` 以脚本所在仓库为应用根目录，检查必填参数、`slug` 格式和颜色格式，然后写入根目录的 `app.config.ts`，并将 `package.json` 的包名改为 `slug`、版本改为 `0.1.0`。它不复制文件、不下载模板、不安装依赖，也不创建 Git 仓库。因此必须先复制模板并进入新目录；复制时要排除模板的 `.git/` 和生成文件。

模板通过 `pnpm-workspace.yaml` 将依赖存储在 `~/.pnpm-store`，不同应用可共用包内容。初始化后按[两种方式共同的后续步骤](#两种方式共同的后续步骤)继续。

## 方式二：使用全局命令从 GitHub 创建

先在本地模板仓库执行一次：

```bash
pnpm link --global
```

这会根据 `package.json` 的 `bin` 字段，将 `create-pwa-app` 注册为全局命令。它链接当前本地仓库中的命令脚本，但**新应用的模板内容来自 GitHub**。需要远端包含本地模板修改时，先把修改推送到 GitHub。

在应用目录之外运行：

```bash
create-pwa-app \
  --name "旅行规划助手" \
  --short-name "旅行助手" \
  --slug "trip-planner" \
  --description "使用 AI 快速生成旅行计划" \
  --theme-color "#863bff"
```

默认在当前目录创建 `trip-planner/`。可用 `--dir /path/to/trip-planner` 指定其他位置；目标目录已存在时命令会停止，不会覆盖。运行 `create-pwa-app --help` 可查看所有参数。

**原理：** `bin/create-pwa-app.mjs` 用 `git clone --depth 1` 从 `https://github.com/lxchinesszz/web-pwa-starter.git` 下载远端模板到新目录，移除克隆得到的 `.git/`，然后在新目录调用同一个 `scripts/init-app.mjs`。随后依次运行 `pnpm install`、`pnpm generate:pwa-assets`、`pnpm lint` 和 `pnpm build`。新应用与模板仓库没有 Git 历史关联；如果需要版本控制，可在新目录自行运行 `git init`。

## 两种方式共同的后续步骤

1. 替换 `public/favicon.svg` 为应用自己的图标，再运行 `pnpm generate:pwa-assets`。全局命令虽然已生成图标，但使用的是模板默认图标。
2. 根据需求修改 `src/App.tsx` 及相关组件。应用元数据统一从根目录 `app.config.ts` 读取。
3. 运行 `pnpm lint && pnpm build`。全局命令已自动运行一次；修改图标或页面后应重新验证。
4. 使用 `pnpm dev` 本地检查。只有在明确要求发布时才运行 `pnpm deploy`。

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
