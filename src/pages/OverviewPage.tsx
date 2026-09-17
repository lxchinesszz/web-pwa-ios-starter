import {
    Badge,
    Block,
    BlockTitle,
    Button,
    Card,
    Chip,
    Fab, Link,
    List,
    ListItem,
    Navbar,
    Preloader,
    Progressbar,
} from 'konsta/react'
import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {appConfig} from '../../app.config.ts'
import DemoSection from '../components/DemoSection.tsx'
import {SparkleIcon} from '../components/icons.tsx'
import {allItems} from '../navigation.tsx'

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

const buildTime = new Intl.DateTimeFormat('zh-CN', {
    dateStyle: 'medium',
    timeStyle: 'short',
}).format(new Date(__BUILD_TIME__))

function OverviewPage() {
    const navigate = useNavigate()
    const [isOnline, setIsOnline] = useState(() => navigator.onLine)
    const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null)
    const [isInstalled, setIsInstalled] = useState(false)

    useEffect(() => {
        const handleOnline = () => setIsOnline(true)
        const handleOffline = () => setIsOnline(false)
        const handleInstallPrompt = (event: Event) => {
            event.preventDefault()
            setInstallPrompt(event as BeforeInstallPromptEvent)
        }
        const handleInstalled = () => {
            setIsInstalled(true)
            setInstallPrompt(null)
        }

        window.addEventListener('online', handleOnline)
        window.addEventListener('offline', handleOffline)
        window.addEventListener('beforeinstallprompt', handleInstallPrompt)
        window.addEventListener('appinstalled', handleInstalled)

        return () => {
            window.removeEventListener('online', handleOnline)
            window.removeEventListener('offline', handleOffline)
            window.removeEventListener('beforeinstallprompt', handleInstallPrompt)
            window.removeEventListener('appinstalled', handleInstalled)
        }
    }, [])

    const handleInstall = async () => {
        if (!installPrompt) return

        await installPrompt.prompt()
        const {outcome} = await installPrompt.userChoice
        if (outcome === 'accepted') setIsInstalled(true)
        setInstallPrompt(null)
    }

    return (
        <>
            <Navbar
                title="组件库总览"
                right={
                    <Badge className="me-2">{`v${__APP_VERSION__}`}</Badge>
                }
            />

            <Block>
                <div className="flex items-start gap-3">
          <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary text-white">
            <SparkleIcon className="size-6"/>
          </span>
                    <div className="min-w-0">
                        <h1 className="text-xl font-bold leading-tight">{appConfig.name}</h1>
                        <p className="mt-1.5 text-sm leading-6 opacity-70">{appConfig.description}</p>
                    </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                    <Badge>{`v${__APP_VERSION__}`}</Badge>
                    <Badge>React 19</Badge>
                    <Badge>PWA</Badge>
                    <Link className={'cursor-pointer'} onClick={() => window.open('https://konstaui.com/react')}>Konsta
                        UI</Link>
                </div>

                <div className="mt-4 flex items-center gap-2">
          <span
              className={`size-2.5 rounded-full ${isOnline ? 'bg-green-500' : 'bg-orange-400'}`}
          />
                    <span className="text-xs opacity-70">
            {isOnline ? '在线可用' : '离线模式'} · 构建于 {buildTime}
          </span>
                </div>

                <div className="mt-5 flex gap-2">
                    <Button
                        rounded
                        onClick={handleInstall}
                        disabled={!installPrompt || isInstalled}
                    >
                        {isInstalled ? '已安装' : '安装应用'}
                    </Button>
                    <Button rounded outline onClick={() => navigate('/form')}>
                        浏览组件
                    </Button>
                </div>
            </Block>

            <BlockTitle>按类别查看</BlockTitle>
            <List inset strong>
                {allItems.map((item) => (
                    <ListItem
                        key={item.path}
                        link
                        chevron
                        linkComponent="button"
                        onClick={() => navigate(item.path)}
                        title={item.label}
                        subtitle={item.description}
                        media={item.icon}
                    />
                ))}
            </List>

            <BlockTitle>组件展示</BlockTitle>
            <Block>
                <DemoSection
                    title="Badge / Chip"
                    description="轻量状态与标签，用于计数、分类和筛选。"
                >
                    <div className="flex flex-wrap items-center gap-2">
                        <Badge>默认</Badge>
                        <Badge small>9</Badge>
                        <Badge colors={{bg: 'bg-red-500'}}>99+</Badge>
                        <Chip media={<span className="size-2 rounded-full bg-green-500"/>}>已同步</Chip>
                        <Chip outline>草稿</Chip>
                    </div>
                </DemoSection>

                <DemoSection
                    title="Progressbar / Preloader"
                    description="Progressbar 的 progress 取值为 0–1；不确定进度请使用 Preloader。"
                >
                    <div className="space-y-4">
                        <Progressbar progress={0.32}/>
                        <Progressbar progress={0.68}/>
                        <Progressbar progress={1}/>
                        <div className="flex items-center gap-3 pt-1">
                            <Preloader/>
                            <span className="text-sm opacity-70">正在加载组件示例…</span>
                        </div>
                    </div>
                </DemoSection>

                <DemoSection
                    title="Fab"
                    description="右下角浮动操作按钮，固定定位不受滚动影响。"
                >
                    <p className="text-sm opacity-70">
                        点击右下角的按钮查看 Fab。它可以直接放在页面里，也可以放进 Popover。
                    </p>
                    <Fab
                        className="fixed bottom-28 right-4 z-30"
                        icon={<SparkleIcon className="size-6"/>}
                    />
                </DemoSection>

                <DemoSection
                    title="Card"
                    description="内容卡片，支持 header / footer 与分隔线。"
                >
                    <Card
                        className="mb-0"
                        header="卡片标题"
                        footer="卡片页脚"
                        headerDivider
                        footerDivider
                    >
                        <p className="text-sm leading-6 opacity-70">
                            Card 自带内边距与圆角，在 iOS 主题下会自动使用分组背景色。
                        </p>
                    </Card>
                </DemoSection>
            </Block>

            <Block className="pb-10 text-center">
                <p className="text-xs opacity-50">
                    {appConfig.name} · {appConfig.footerNote}
                </p>
            </Block>
        </>
    )
}

export default OverviewPage
