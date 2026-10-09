---
name: pwa-ios-ui
description: 使用真实 React 与 Konsta UI 组件生成可交互的 iOS 风格 UI HTML 效果稿，并保留组件源码供 pwa-ios-developer 开发参考。适用于页面设计、产品原型和 HTML 预览；遵循既定 Navbar、Tabbar 和禁止回弹规则，不用纯 HTML 仿制组件，不直接修改生产应用。
---

# PWA iOS UI

将产品需求设计为使用真实 `konsta/react` 组件的可交互效果稿，交付可直接打开的 HTML 和可参考的 React 源码。可跨仓库使用，技能目录不决定目标业务。

## 设计依据

先读取 [组件与设计约定](references/ui-contract.md) 和 [生成与交付流程](references/workflow.md)。从 [React 模板](assets/template/main.jsx)、[基础样式](assets/template/index.css) 和 [构建脚本](assets/template/build.mjs) 开始。

本技能落实 `pwa-ios-developer` 已确定的组件规则。若该技能可用，读取它的 `SKILL.md`、`references/design-system.md`、`references/konsta-components.md` 和 `assets/index.css`，同步当前规则；不可用时使用本技能内置约定，不阻塞生成。不要执行开发技能的生产代码修改流程。用户当前明确要求优先于模板默认内容。

## 必须遵循

- 真实导入并渲染 `konsta/react`，以 `App theme="ios"` 和 `Page` 组织页面。禁止仅用 `data-component`、复制生成 DOM 或手写 CSS 假装使用组件。
- 导航栏必须使用 `Navbar className="top-0 sticky"`；标题、尺寸、透明效果和左右槽按组件属性配置。
- 多个平行一级页面使用 `Tabbar labels icons` → `ToolbarPane` → `TabbarLink`；非平行页面不设计 Tabbar。详情和编辑页面使用返回导航。
- 全局 `index.css` 中按模板顺序共同导入 Tailwind 和 Konsta；保留根容器和 `.k-page` 的禁止回弹规则。
- 使用真实组件处理按钮、列表、输入、弹层与反馈。原生 HTML 用于内容和必要布局，不替代已有通用组件。
- 单个页面级主操作（创建、添加、记一笔）使用右下角独立圆形 `Fab`；禁止全宽按钮及横贯底部的背景栏。仅按钮自身带品牌色背景，内容预留避让空间。表单保存/确认仍使用 `Button`，详见组件与设计约定。
- 日期区间必须用一个可交互的范围选择组件展示并选择起止日期，禁止生成两个独立的开始/结束日期输入。单日期和日期时间点仍使用单值组件。
- 使用本地模拟数据与 React 状态实现可操作流程，不连接真实写入接口。清楚区分模拟能力与生产能力。
- 根据目标项目的品牌、语言和业务设计，不预设旅行、账本、账号或后端。

## 产物与范围

默认保存到目标项目的 `previews/<feature-slug>/`，用户指定目录时遵循指定。生成前检查目标，避免覆盖已有成果；不修改生产入口或包配置，不将效果稿写入生产构建目录。

交付包含：

- `preview.html`：内嵌打包后的 React/Konsta JavaScript 与编译后的 CSS，可直接打开。HTML 是运行载体，组件源码仍是真实 JSX。
- `main.jsx`、`index.css`、`build.mjs`：可读、可重建的组件实现；用配置或拆分文件组织复杂原型。
- `handoff.md`：页面关系、组件/属性映射、状态与交互、模拟边界、依赖版本、重建命令和验证结果，供 `pwa-ios-developer` 参考。

多页面默认在一个 HTML 内通过状态切换，保持完整流程；用户需要画廊时再补充，不强制把每个状态拆成 HTML。生产开发复用源码中的组件结构与设计决策，按目标应用接入路由、状态、接口和持久化，不复制压缩后的 bundle。

## 验证

构建必须成功，确认 CSS 已编译、React/Konsta 已打包且没有依赖 CDN、裸模块导入或开发服务器。通过浏览器检查页面切换、返回、表单与弹层等实际实现的交互，以及 375px/390px、主题、吸顶、底部避让和滚动。无法执行视觉/设备检查时明确说明；不以构建通过冒充运行验证。
