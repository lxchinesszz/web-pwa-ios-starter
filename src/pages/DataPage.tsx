import {
  Badge,
  Block,
  BlockTitle,
  Card,
  Glass,
  Icon,
  List,
  ListItem,
  Navbar,
  NavbarBackLink,
  Progressbar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from 'konsta/react'
import { useNavigate } from 'react-router-dom'
import DemoSection from '../components/DemoSection.tsx'
import { ChartIcon, ChatIcon, SparkleIcon } from '../components/icons.tsx'

const pipeline = [
  { id: 'outline', title: '生成内容大纲', status: '已完成', progress: 1, tone: 'bg-green-500' },
  { id: 'body', title: '撰写核心段落', status: '生成中', progress: 0.68, tone: 'bg-primary' },
  { id: 'tone', title: '检查语气与格式', status: '等待中', progress: 0.12, tone: 'bg-orange-400' },
]

function DataPage() {
  const navigate = useNavigate()

  return (
    <>
      <Navbar
        title="数据与表格"
        left={<NavbarBackLink text="更多" onClick={() => navigate('/more')} />}
      />

      <BlockTitle>表格</BlockTitle>
      <Block>
        <DemoSection
          title="Table / TableHead / TableBody / TableRow / TableCell"
          description="header 行与普通行的样式差异由 header 属性控制，发丝线由组件自动补齐。"
        >
          <div className="overflow-x-auto">
            <Table>
              <TableHead>
                <TableRow header>
                  <TableCell header>任务</TableCell>
                  <TableCell header>状态</TableCell>
                  <TableCell header>进度</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pipeline.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="whitespace-nowrap">{row.title}</TableCell>
                    <TableCell>
                      <Badge colors={{ bg: row.tone }}>{row.status}</Badge>
                    </TableCell>
                    <TableCell className="w-32">
                      <Progressbar progress={row.progress} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DemoSection>
      </Block>

      <BlockTitle>容器与图标</BlockTitle>
      <Block className="pb-10">
        <DemoSection
          title="Glass"
          description="毛玻璃容器，需要背后有内容才能看出模糊效果，highlight 会响应指针位置。"
        >
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-orange-400 p-6">
            <Glass highlight className="rounded-2xl p-4">
              <p className="text-sm font-semibold">毛玻璃卡片</p>
              <p className="mt-1 text-xs leading-5 opacity-70">
                Glass 在 iOS 主题下使用 backdrop-blur，常用于导航栏与标签栏的底层。
              </p>
            </Glass>
          </div>
        </DemoSection>

        <DemoSection
          title="Icon / Badge"
          description="Icon 按主题渲染 ios 或 material 节点，并可在角标处挂 Badge。"
        >
          <div className="flex items-center gap-6">
            <Icon ios={<SparkleIcon className="size-7" />} badge="3" />
            <Icon ios={<ChatIcon className="size-7" />} badge="12" />
            <Icon ios={<ChartIcon className="size-7" />} />
          </div>
          <p className="mt-3 text-xs opacity-60">
            角标使用 small Badge，可通过 badgeColors 覆盖配色。
          </p>
        </DemoSection>

        <DemoSection
          title="Card 与列表组合"
          description="Card 内嵌 List 是后台数据页常见的信息分组方式。"
        >
          <Card header="本月用量" headerDivider className="mb-0">
            <List nested>
              <ListItem title="生成次数" after="128" />
              <ListItem title="消耗额度" after="64%" />
              <ListItem
                title="配额使用"
                after={<Badge colors={{ bg: 'bg-primary' }}>正常</Badge>}
              />
            </List>
            <div className="px-4 pb-4">
              <Progressbar progress={0.64} />
            </div>
          </Card>
        </DemoSection>
      </Block>
    </>
  )
}

export default DataPage
