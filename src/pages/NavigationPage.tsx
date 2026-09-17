import {
  Block,
  BlockTitle,
  Breadcrumbs,
  BreadcrumbsCollapsed,
  BreadcrumbsItem,
  BreadcrumbsSeparator,
  Button,
  Fab,
  Link,
  List,
  ListItem,
  Navbar,
  NavbarBackLink,
  Panel,
  Popover,
  Tabbar,
  TabbarLink,
  Toolbar,
  ToolbarPane,
} from 'konsta/react'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DemoSection from '../components/DemoSection.tsx'
import { ChatIcon, CompassIcon, HomeIcon, SparkleIcon } from '../components/icons.tsx'

const demoTabs = [
  { key: 'home', label: '首页', icon: <HomeIcon className="h-7 w-7" /> },
  { key: 'discover', label: '发现', icon: <CompassIcon className="h-7 w-7" /> },
  { key: 'chat', label: '消息', icon: <ChatIcon className="h-7 w-7" /> },
]

function NavigationPage() {
  const navigate = useNavigate()
  const [leftPanel, setLeftPanel] = useState(false)
  const [rightPanel, setRightPanel] = useState(false)
  const [activeTab, setActiveTab] = useState('home')
  const [popover, setPopover] = useState(false)
  const anchorRef = useRef<HTMLElement>(null)

  return (
    <>
      <Navbar
        title="导航"
        right={
          <Button small rounded outline onClick={() => setLeftPanel(true)}>
            抽屉
          </Button>
        }
      />

      <BlockTitle>导航栏变体</BlockTitle>
      <Block>
        <DemoSection
          title="Navbar"
          description="默认、outline 与 transparent/subnavbar 形态。演示用导航栏已改为 relative，避免与页面导航栏争抢吸顶位置。"
        >
          <div className="space-y-3">
            <div className="relative overflow-hidden rounded-2xl border border-black/5 dark:border-white/10">
              <Navbar
                className="relative"
                title="默认导航栏"
                left={<Link>返回</Link>}
                right={<Link>完成</Link>}
              />
              <div className="p-4 text-xs opacity-50">内容区域</div>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-black/5 dark:border-white/10">
              <Navbar className="relative" title="Outlined" outline />
              <div className="p-4 text-xs opacity-50">outline 会补上一条发丝线</div>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-black/5 dark:border-white/10">
              <Navbar
                className="relative"
                title="Transparent"
                transparent
                subnavbar={
                  <span className="text-xs opacity-60">subnavbar 可放筛选或标签</span>
                }
              />
              <div className="p-4 text-xs opacity-50">内容区域</div>
            </div>
          </div>
        </DemoSection>

        <DemoSection
          title="NavbarBackLink"
          description="系统返回按钮，onClick 交给路由处理。"
        >
          <div className="relative overflow-hidden rounded-2xl border border-black/5 dark:border-white/10">
            <Navbar
              className="relative"
              title="详情"
              left={
                <NavbarBackLink text="导航" onClick={() => navigate('/nav')} />
              }
            />
            <div className="p-4 text-xs opacity-50">左上是 NavbarBackLink</div>
          </div>
        </DemoSection>

        <DemoSection
          title="Breadcrumbs"
          description="面包屑导航，分隔符由 BreadcrumbsSeparator 渲染。"
        >
          <Breadcrumbs>
            <BreadcrumbsItem>
              <Link>首页</Link>
            </BreadcrumbsItem>
            <BreadcrumbsSeparator />
            <BreadcrumbsCollapsed />
            <BreadcrumbsSeparator />
            <BreadcrumbsItem>
              <Link>组件</Link>
            </BreadcrumbsItem>
            <BreadcrumbsSeparator />
            <BreadcrumbsItem active>导航</BreadcrumbsItem>
          </Breadcrumbs>
          <p className="mt-3 text-xs opacity-60">
            BreadcrumbsCollapsed 用于折叠中间层级。
          </p>
        </DemoSection>
      </Block>

      <BlockTitle>工具栏</BlockTitle>
      <Block>
        <DemoSection
          title="Toolbar / Tabbar / TabbarLink"
          description="顶部工具栏与底部标签栏。演示区域使用 relative 容器，让标签栏背景层正确落位。"
        >
          <div className="relative overflow-hidden rounded-2xl border border-black/5 dark:border-white/10">
            <Toolbar top outline>
              <Link>编辑</Link>
              <span className="text-sm font-semibold">工具栏</span>
              <Link>完成</Link>
            </Toolbar>

            <div className="p-6 text-center text-xs opacity-50">内容区域</div>

            <Tabbar labels icons>
              <ToolbarPane>
                {demoTabs.map((tab) => (
                  <TabbarLink
                    key={tab.key}
                    active={activeTab === tab.key}
                    label={tab.label}
                    icon={tab.icon}
                    onClick={() => setActiveTab(tab.key)}
                  />
                ))}
              </ToolbarPane>
            </Tabbar>
          </div>

          <p className="mt-3 text-xs opacity-60">
            当前标签：{activeTab} · ToolbarPane 只在 Tabbar 内启用滑动高亮
          </p>
        </DemoSection>

        <DemoSection
          title="Popover"
          description="锚定气泡菜单，target 接受 ref、元素或选择器；angle 控制是否显示箭头。"
        >
          <Button ref={anchorRef} rounded outline onClick={() => setPopover(true)}>
            打开气泡菜单
          </Button>
          <p className="mt-3 text-xs opacity-60">
            气泡由 target 定位，backdrop 点击后通过 onBackdropClick 关闭。
          </p>
        </DemoSection>
      </Block>

      <BlockTitle>抽屉与浮动入口</BlockTitle>
      <Block className="pb-28">
        <DemoSection
          title="Panel"
          description="左右侧滑抽屉，floating 让面板悬浮于安全区之内。"
        >
          <div className="flex flex-wrap gap-2">
            <Button rounded outline onClick={() => setLeftPanel(true)}>
              左侧抽屉
            </Button>
            <Button rounded outline onClick={() => setRightPanel(true)}>
              右侧抽屉
            </Button>
          </div>
          <p className="mt-3 text-xs opacity-60">
            面板通常放在页面外层，这里演示其 fixed 定位可以直接写在页面组件中。
          </p>
        </DemoSection>

        <DemoSection title="Link / Fab" description="文本链接与浮动操作按钮。">
          <div className="flex flex-wrap items-center gap-4">
            <Link>普通链接</Link>
            <Link onClick={() => navigate('/list')}>跳转到列表</Link>
            <Link iconOnly>
              <SparkleIcon className="size-5" />
            </Link>
          </div>

          <Fab
            className="fixed bottom-28 right-4 z-30"
            icon={<SparkleIcon className="size-6" />}
            text="新建"
            onClick={() => setRightPanel(true)}
          />
        </DemoSection>
      </Block>

      <Popover
        opened={popover}
        target={anchorRef}
        angle
        onBackdropClick={() => setPopover(false)}
      >
        <List nested>
          <ListItem
            link
            linkComponent="button"
            title="重命名"
            onClick={() => setPopover(false)}
          />
          <ListItem
            link
            linkComponent="button"
            title="复制副本"
            onClick={() => setPopover(false)}
          />
          <ListItem
            link
            linkComponent="button"
            title="删除"
            className="text-red-500"
            onClick={() => setPopover(false)}
          />
        </List>
      </Popover>

      <Panel
        side="left"
        opened={leftPanel}
        onBackdropClick={() => setLeftPanel(false)}
      >
        <Navbar
          title="左侧抽屉"
          left={
            <Link onClick={() => setLeftPanel(false)}>关闭</Link>
          }
        />
        <List>
          <ListItem
            link
            linkComponent="button"
            title="概览"
            onClick={() => navigate('/')}
          />
          <ListItem
            link
            linkComponent="button"
            title="表单"
            onClick={() => navigate('/form')}
          />
          <ListItem
            link
            linkComponent="button"
            title="列表"
            onClick={() => navigate('/list')}
          />
        </List>
      </Panel>

      <Panel
        side="right"
        floating
        opened={rightPanel}
        onBackdropClick={() => setRightPanel(false)}
      >
        <Navbar
          title="右侧抽屉"
          right={<Link onClick={() => setRightPanel(false)}>关闭</Link>}
        />
        <Block>
          <p className="text-sm opacity-70">
            floating 面板会保留上下安全区，适合放设置项或快捷操作。
          </p>
          <Button
            className="mt-4"
            rounded
            onClick={() => setRightPanel(false)}
          >
            知道了
          </Button>
        </Block>
      </Panel>
    </>
  )
}

export default NavigationPage
