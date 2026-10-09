# 组件与设计约定

以下为来自 pwa-ios-developer 的可独立使用基线。不要依赖其绝对安装路径；可用时核对当前规范。

## 固定导航

```jsx
<Navbar
  title="页面标题"
  subtitle="副标题"
  className="top-0 sticky"
  medium={size === 'Medium'}
  large={size === 'Large'}
  transparent={isTransparent}
  right={<Link navbar onClick={handleAction}>操作</Link>}
/>
```

`size` 和 `isTransparent` 是页面配置，不必做成设置界面；medium/large 互斥，无副标题或操作可省略。返回使用 `left={<NavbarBackLink ... />}`，实际切回来源页面。

收件箱、日历、上传中心、我的等可独立进入的同级目的地是平行页面，使用：

```jsx
<Tabbar labels icons className="left-0 bottom-0 fixed">
  <ToolbarPane>
    <TabbarLink active={tab === 'inbox'} onClick={() => setTab('inbox')}
      icon={<Icon ios={<InboxIcon />} />} label="收件箱" />
    {/* 按实际产品加入其余平行页面 */}
  </ToolbarPane>
</Tabbar>
```

图标必须是有实现和导入的组件或 SVG，不保留未定义占位符。徽标反映模拟数据状态，不随意添加数字。上传若只是动作，用按钮；详情、编辑或流程步骤非平行页面，不显示底栏。单页原型删除模板中的 Tabbar，不为套用示例发明页面。

## 组件选择

| 场景 | 组件 |
| --- | --- |
| 根与页面 | App、Page |
| 导航和操作 | Navbar、NavbarBackLink、Link、Button |
| 平行一级导航 | Tabbar、ToolbarPane、TabbarLink、Icon |
| 分组与列表 | Block、BlockTitle、List、ListItem |
| 字段和搜索 | ListInput、Searchbar |
| 日期区间 | DateRangePicker 或范围选择组件：单字段、同一日历选择起止日期 |
| 单个页面级主操作 | Fab：右下角独立圆形，无整行背景 |
| 选择 | Toggle、Radio、Checkbox、Stepper、Range |
| 弹层 | Sheet、Actions、Dialog 系列 |
| 反馈 | Toast、Progressbar、Preloader |

按目标版本类型或源码核对 API，不用浏览器 alert 或手写弹层替代 Konsta。业务组件可组合基础组件与语义化内容。

## 日期区间（固定规则）

旅行日期、入住日期等由开始和结束组成的业务值，在页面上必须表现为一个范围字段。禁止将它设计成“开始日期”和“结束日期”两个独立的 `ListInput` 或原生日期输入。

```jsx
<DateRangePicker
  label="旅行日期"
  startDate={draft.startDate}
  endDate={draft.endDate}
  onChange={(startDate, endDate) =>
    setDraft((current) => ({ ...current, startDate, endDate }))
  }
/>
```

效果稿中的范围组件必须真实可操作：点击唯一字段后，在同一个日历或 Konsta `Sheet` 中先选开始日、再选结束日，高亮连续区间，并提供取消、重新选择和确认。确认后一次性更新两个值，取消保留旧值；结束日不能早于开始日，错误靠近范围字段显示。

优先复用目标项目的 `DateRangePicker`。没有可复用组件时，在效果稿源码中实现有业务名称的范围组件，使用 Konsta 容器和操作组件承载交互。不要以两个输入框临时替代，也不要把静态文本伪装成可用选择器。

单个日期或日期时间点不属于范围，例如生日、账单日期、消费发生时间，继续使用单值输入组件。

## 样式与布局

### 单个页面主操作（固定规则）

创建、添加、记一笔等单个常驻入口采用右下角圆形 `Fab`。不使用接近全屏宽的 Button，不添加底部白条、毛玻璃、渐变遮罩或分割线；只有按钮自身带品牌色背景和适量阴影。按钮周围直接透出页面。

```jsx
<Fab
  component="button"
  className="single-action-fab"
  aria-label="创建旅行"
  icon={<Plus className="w-7 h-7" aria-hidden="true" />}
  onClick={onCreate}
/>
```

`Fab` 必须从 `konsta/react` 导入，`Plus` 从已有图标库导入，回调接入实际预览交互。省略 `text`，不使用文本加号。动作名称和图标按业务调整。

```css
.single-action-fab {
  position: fixed;
  right: calc(20px + env(safe-area-inset-right));
  bottom: calc(20px + env(safe-area-inset-bottom));
  width: 56px;
  height: 56px;
  border-radius: 50%;
  z-index: 20;
}

.content-with-single-action {
  padding-bottom: calc(96px + env(safe-area-inset-bottom));
}
```

给滚动内容应用留白类，使末项可以滚动到按钮上方。有 Tabbar 时根据它的实际高度上移 Fab，内容留白同步增加，安全区仅计算一次。不要为同一操作再加全宽按钮。此规则不把表单内保存/确认、弹窗操作或多操作工具栏改成 Fab。

### 基础样式

完整复用模板 index.css 中两条导入和根容器、`.k-page` 规则。`.k-page` 是 Page 默认类，不人为生成仿制节点。页面允许正常滚动并关闭边界回弹，不能通过整体 overflow hidden 截掉内容。

复用项目品牌与语义令牌，缺少时采用系统字体、清晰标题、分组列表和少量强调色。手机内容留白可从 16–20px 起步，触控区以 44px 为目标。正文可换行，图标操作有可访问名称；自定义颜色覆盖浅深主题，动画尊重减少动态效果偏好。

Navbar 在主滚动上下文中吸顶，Tabbar 仅在平行一级页共享。内容底部预留底栏实际高度及安全区；不要重复计算组件已经处理的安全区。模板底部留白是起点，需随实际组件尺寸验证。
