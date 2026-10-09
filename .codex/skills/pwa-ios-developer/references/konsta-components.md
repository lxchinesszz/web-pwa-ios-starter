# Konsta UI 组件规范

## 选择与核对

先复用现有业务组件，再直接使用或组合 Konsta。通过已安装版本的类型、源码与已有用法确认 API；需要外部资料时查对应版本官方文档。下表是候选映射，不保证所有版本的属性相同。

未安装 Konsta 时先判断依赖接入是否属于需求，不生成无法解析的导入。已有统一封装时沿用。

| 场景 | 候选组件 | 要点 |
| --- | --- | --- |
| 应用与页面 | App、Page | 按版本配置 iOS 主题，兼容现有 provider、滚动及安全区 |
| 导航返回 | Navbar、NavbarBackLink | 必须使用 Navbar，采用 top-0 sticky；返回接入项目路由 |
| 操作与链接 | Button、Link | 区分动作和导航语义 |
| 平行一级导航 | Tabbar、ToolbarPane、TabbarLink | 多个平行一级页面使用；非平行页面不设计 |
| 分组列表 | Block、BlockTitle、List、ListItem | 沿用项目分组样式 |
| 字段与搜索 | ListInput、Searchbar | 保留标签、错误与合适的键盘类型 |
| 日期区间 | 项目现有 DateRangePicker 或范围选择组件 | 一个字段、一次范围选择；禁止拆成开始/结束两个输入 |
| 布尔与选择 | Toggle、Radio、Checkbox | 与选择语义及保存方式一致 |
| 数量范围 | Stepper、Range | 精确数据保留直接输入方式 |
| 进度等待 | Progressbar、Preloader | 区分确定进度与不确定等待 |
| 局部编辑 | Sheet | 内容及键盘不阻断完成路径 |
| 操作菜单 | Actions 系列 | 次要或上下文操作 |
| 确认提示 | Dialog 系列 | 说明对象、影响及恢复方式 |
| 短暂反馈 | Toast | 不承载唯一错误或恢复入口 |
| 单个页面主操作 | Fab | 右下角独立圆形，无整行底栏背景；不使用全宽 Button 替代 |
| 连续会话 | Messages、Message、Messagebar | 仅在实际会话场景使用 |

## Navbar 固定结构

顶部导航栏必须使用 `konsta/react` 的 `Navbar`，采用以下结构，不用自定义 HTML/CSS 模拟。已有业务导航封装可以复用，但内部必须使用 `Navbar`。

```tsx
<Navbar
  title="Navbar"
  subtitle="Subtitle"
  className="top-0 sticky"
  medium={size === 'Medium'}
  large={size === 'Large'}
  transparent={isTransparent}
  right={<Link navbar>Right</Link>}
/>
```

- `Navbar` 和 `Link` 从 `konsta/react` 导入。示例文案替换为真实标题、副标题和操作名称。
- `size`、`isTransparent` 表示页面配置，不要求增加设置控件或交互状态。`medium` 与 `large` 互斥，普通尺寸两者均为 false；固定尺寸页面可直接使用对应布尔属性。
- 无副标题时省略 `subtitle`；无右侧操作时省略 `right`。有操作时给 `Link navbar` 接入真实事件或导航地址，不保留无响应的示例链接。
- 返回通过 `left` 槽放置 `NavbarBackLink` 并接入项目导航。根页面不为凑齐结构添加返回按钮。
- 保留 `top-0 sticky`，将导航栏置于适当的页面滚动上下文，检查顶部安全区和滚动层级，避免父级 overflow 或重复内边距破坏吸顶效果。

## 平行一级页面的 Tabbar 示例

仅用于收件箱、日历、上传中心等平行一级页面。采用以下固定结构；示例中的 `currentTab` 和 `navigateToTab` 接入目标项目现有路由或状态。图标标识符代表项目已有图标组件，实际使用时补齐导入，不为示例新增图标库。组件 API 按已安装版本核对。

```tsx
<Tabbar labels icons className="left-0 bottom-0 fixed">
  <ToolbarPane>
    <TabbarLink
      active={currentTab === 'inbox'}
      onClick={() => navigateToTab('inbox')}
      icon={
        <Icon
          ios={<EnvelopeFill className="w-7 h-7" />}
          material={<MdEmail className="w-6 h-6" />}
        />
      }
      label="收件箱"
    />
    <TabbarLink
      active={currentTab === 'calendar'}
      onClick={() => navigateToTab('calendar')}
      icon={
        <Icon
          ios={<Calendar className="w-7 h-7" />}
          material={<MdToday className="w-6 h-6" />}
        />
      }
      label="日历"
    />
    <TabbarLink
      active={currentTab === 'upload'}
      onClick={() => navigateToTab('upload')}
      icon={
        <Icon
          ios={<CloudUploadFill className="w-7 h-7" />}
          material={<MdFileUpload className="w-6 h-6" />}
        />
      }
      label="上传"
    />
  </ToolbarPane>
</Tabbar>
```

`Tabbar`、`ToolbarPane`、`TabbarLink` 和 `Icon` 来自 `konsta/react`。仅面向 iOS 时可省略 Material 图标分支。需要徽标时在 `Icon` 上使用 `badge` 和 `badgeColors`，数值来自真实业务状态，不复制固定示例数字。

此结构由平行一级页面的共享布局持有，非平行的详情、编辑、步骤页不渲染。为固定底栏预留内容空间，安全区不重复计算；验证切换、当前选中态和浏览器返回行为。

## 组合与表单

### 日期区间：单个范围组件

业务值包含开始和结束日期时，界面只提供一个有明确标签的范围字段，例如“旅行日期”“入住日期”。字段展示完整区间，点击后打开同一个日历/Sheet，在一个连续流程中选择开始日和结束日。

```tsx
<DateRangePicker
  label="旅行日期"
  startDate={draft.startDate}
  endDate={draft.endDate}
  onChange={(startDate, endDate) => {
    setDraft((current) => ({ ...current, startDate, endDate }))
  }}
/>
```

- 优先复用项目已有范围选择组件；没有时创建一个有清晰职责的 `DateRangePicker`，内部可组合 Konsta `ListItem`、`Sheet`、`Button` 与日历能力。
- 不并排或分组放置两个 `type="date"`、两个 `ListInput`，也不让用户先后进入两个互不关联的日期输入。
- 首次点击选择开始日，随后在同一日历中选择结束日；高亮完整区间，并提供清晰的重新选择、取消和确认路径。
- 结束日不得早于开始日。变更开始日导致原结束日失效时，由组件清空结束日或按业务规则调整，并明确显示当前选择状态。
- 确认时将起止日期作为一个原子变更提交给表单；取消不修改原值。字段错误显示在范围字段附近。
- 字段的可访问名称表达整个范围，键盘和屏幕阅读器可识别开始、结束、选中区间及不可选日期。
- 单个日期（生日、账单日）或单个日期时间点（消费发生时间）仍使用对应的单值组件，不强行使用范围选择器。

### 单个主操作：圆形 Fab

适用于列表/详情页的创建、添加、记一笔等常驻入口。直接使用 Konsta `Fab`，不包在全宽背景栏中。以下 `Plus` 来自项目现有图标库，`onCreate` 接入真实动作；记账入口替换为对应名称与回调。

```tsx
<Fab
  component="button"
  className="single-action-fab"
  aria-label="创建旅行"
  icon={<Plus className="w-7 h-7" aria-hidden="true" />}
  onClick={onCreate}
/>
```

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

`Fab` 从 `konsta/react` 导入，不设置 `text`，按钮本身的背景沿用品牌色。内容容器应用留白类；有 Tabbar 时根据实际占用高度调整按钮和内容偏移。不要增加整行底栏、背景面板或重复主按钮。表单提交仍使用 `Button`，不套用此入口样式。

- 沿用根节点 provider 和路由结构，确认组件与布局分别负责的滚动、安全区与固定位置，不复制预设根结构。
- 返回接入现有导航规则；根页面通常不显示返回。
- 短表单可用 Sheet；字段多或需要稳定 URL 时优先独立页面。
- 不可逆操作在执行前说明影响；可恢复操作按产品规则提供确认或可靠撤销。
- 普通字段优先现有封装或 ListInput；错误靠近字段，不只靠禁用按钮暗示失败。
- 输入类型、步进和范围按业务定义。金额考虑精度、零值、负值与区域格式，不统一要求大于零。
- 单日期和日期时间点沿用项目组件或适当的原生输入；日期区间必须使用上面的单个范围组件，并验证先后关系。
- 处理提交中、失败和重复提交；自动聚焦考虑移动端键盘影响。

## 图标与组件边界

复用项目图标库或 SVG，保持视觉一致；纯图标按钮添加可访问名称，不用 emoji 或零散文字符号代替正式操作图标，不默认安装某个图标库。

业务组件按目标领域命名，组合 Konsta 和语义化 HTML，状态接入现有数据流。为统一可访问性、主题或行为而存在的薄封装可以保留，不重复实现基础控件整套交互。

除上述固定导航组件规则外，Konsta 不能满足能力、平台语义或既有设计系统要求时，可采用合适实现并说明原因，检查键盘、焦点和可访问性，不假设组件自动处理全部行为。
