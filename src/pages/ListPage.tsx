import {
  Badge,
  Block,
  BlockTitle,
  Button,
  Card,
  Chip,
  Link,
  List,
  ListButton,
  ListGroup,
  ListItem,
  MenuList,
  MenuListItem,
  Navbar,
} from 'konsta/react'
import { useState } from 'react'
import DemoSection from '../components/DemoSection.tsx'
import { SparkleIcon } from '../components/icons.tsx'

const tasks = [
  { id: 'outline', title: '生成内容大纲', note: '已完成', done: true },
  { id: 'body', title: '撰写核心段落', note: '生成中 68%', done: false },
  { id: 'tone', title: '检查语气与格式', note: '等待中', done: false },
]

function ListPage() {
  const [completed, setCompleted] = useState<string[]>(['outline'])

  const toggle = (id: string) =>
    setCompleted((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    )

  return (
    <>
      <Navbar title="列表" />

      <BlockTitle>列表样式</BlockTitle>
      <Block>
        <DemoSection
          title="List / ListItem"
          description="inset 让列表内缩，strong 使用分组标题底色，dividers 控制分隔线。"
        >
          <List inset strong dividers>
            <ListItem
              title="标题"
              subtitle="副标题用于补充说明"
              after={<Badge>新</Badge>}
            />
            <ListItem title="仅标题" chevron link />
            <ListItem
              title="带媒体图标"
              subtitle="media 槽位可放图标或头像"
              media={<SparkleIcon className="size-6" />}
            />
            <ListItem title="文本内容" text="text 用于多行描述，适合放较长的说明文字。" />
          </List>
        </DemoSection>

        <DemoSection
          title="ListButton"
          description="整行可点击的操作项，常用于表单提交或危险操作。"
        >
          <List inset>
            <ListButton onClick={() => setCompleted(['outline', 'body', 'tone'])}>
              全部标记为完成
            </ListButton>
            <ListButton onClick={() => setCompleted([])}>清空进度</ListButton>
            <ListButton className="text-red-500" onClick={() => setCompleted([])}>
              删除全部任务
            </ListButton>
          </List>
        </DemoSection>

        <DemoSection
          title="ListGroup"
          description="带分组标题的列表，适合把任务按状态归类。"
        >
          <ListGroup>
            <ListItem
              groupTitle
              title="进行中的任务"
              after={<Badge>{tasks.length - completed.length}</Badge>}
            />
            {tasks.map((task) => (
              <ListItem
                key={task.id}
                link
                title={task.title}
                subtitle={task.note}
                after={
                  <Chip
                    outline={!completed.includes(task.id)}
                    onClick={() => toggle(task.id)}
                  >
                    {completed.includes(task.id) ? '已完成' : '标记'}
                  </Chip>
                }
              />
            ))}
            <ListItem groupTitle title="已完成" />
            {completed.length === 0 ? (
              <ListItem title="暂无已完成任务" />
            ) : (
              completed.map((id) => (
                <ListItem
                  key={id}
                  title={tasks.find((task) => task.id === id)?.title ?? id}
                  after={<Badge colors={{ bg: 'bg-green-500' }}>✓</Badge>}
                />
              ))
            )}
          </ListGroup>
        </DemoSection>
      </Block>

      <BlockTitle>菜单与卡片</BlockTitle>
      <Block className="pb-10">
        <DemoSection
          title="MenuList / MenuListItem"
          description="下拉菜单列表，active 表示当前选中项。"
        >
          <MenuList className="max-w-xs">
            <MenuListItem active>重命名</MenuListItem>
            <MenuListItem>复制副本</MenuListItem>
            <MenuListItem subtitle="立即同步到云端">立即同步</MenuListItem>
            <MenuListItem>删除</MenuListItem>
          </MenuList>
        </DemoSection>

        <DemoSection
          title="Card"
          description="支持 header / footer、分隔线与不同类型的边框。"
        >
          <Card
            header="本周创作"
            footer={
              <div className="flex items-center justify-between">
                <span>共 12 次生成</span>
                <Link>查看全部</Link>
              </div>
            }
            headerDivider
            footerDivider
          >
            <p className="text-sm leading-6 opacity-70">
              Card 是 iOS 分组视觉的基础容器，headerDivider 与 footerDivider
              会在标题和页脚位置补上发丝线。
            </p>
          </Card>

          <Card outline className="mb-0">
            <p className="text-sm opacity-70">outline 形态：只有描边，没有底色。</p>
          </Card>
        </DemoSection>

        <DemoSection title="Link" description="iOS 主题下的强调色文本链接。">
          <div className="flex flex-wrap items-center gap-4">
            <Link>默认链接</Link>
            <Link onClick={() => setCompleted([])}>重置进度</Link>
            <Link iconOnly>
              <SparkleIcon className="size-5" />
            </Link>
          </div>
          <div className="mt-4">
            <Button rounded small onClick={() => setCompleted(['outline'])}>
              恢复初始状态
            </Button>
          </div>
        </DemoSection>
      </Block>
    </>
  )
}

export default ListPage
