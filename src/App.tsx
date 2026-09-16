import {useEffect, useState, type FormEvent} from 'react'
import {App as KonstaApp, Page} from 'konsta/react'
import {appConfig} from '../app.config.ts'
import './App.css'
import PwaUpdatePrompt from './PwaUpdatePrompt.tsx'

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

const suggestions = [
    '把一个粗略想法整理成发布计划',
    '写一篇友好的产品发布公告',
    '将会议笔记整理为行动清单',
]

const modes = ['灵感', '写作', '分析']

const buildTime = new Intl.DateTimeFormat('zh-CN', {
    dateStyle: 'medium',
    timeStyle: 'short',
}).format(new Date(__BUILD_TIME__))

function SparkleIcon({className = 'size-5'}: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M12 2.75c.48 4.87 4.38 8.77 9.25 9.25-4.87.48-8.77 4.38-9.25 9.25C11.52 16.38 7.62 12.48 2.75 12 7.62 11.52 11.52 7.62 12 2.75Z"
                fill="currentColor"/>
        </svg>
    )
}

function ArrowIcon() {
    return (
        <svg className="size-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="m9 18 6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}

function App() {
    const [prompt, setPrompt] = useState('')
    const [answer, setAnswer] = useState('')
    const [isOnline, setIsOnline] = useState(() => navigator.onLine)
    const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null)
    const [isInstalled, setIsInstalled] = useState(false)
    const [mode, setMode] = useState('灵感')
    const [creativity, setCreativity] = useState(72)
    const [fastMode, setFastMode] = useState(true)
    const [outputFormat, setOutputFormat] = useState('文章')
    const [activeNav, setActiveNav] = useState('创作')

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

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const idea = prompt.trim()
        if (!idea) return

        setAnswer(`这是一个不错的方向。建议先为“${idea}”定义一个清晰目标，再完成最小可用版本，并根据真实反馈持续迭代。`)
    }

    const handleInstall = async () => {
        if (!installPrompt) return
        await installPrompt.prompt()
        const {outcome} = await installPrompt.userChoice
        if (outcome === 'accepted') setIsInstalled(true)
        setInstallPrompt(null)
    }

    return (
        <KonstaApp theme="ios" safeAreas>
            <Page className="app-shell">
                <div className="ambient ambient-one"/>
                <div className="ambient ambient-two"/>

                <header
                    className="safe-area-header relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
                    <a href={import.meta.env.BASE_URL}
                       className="flex items-center gap-3 text-slate-950 no-underline dark:text-white">
            <span
                className="grid size-10 place-items-center rounded-2xl bg-violet-600 text-white shadow-lg shadow-violet-600/25">
              <SparkleIcon/>
            </span>
                        <span className="text-base font-bold tracking-tight">{appConfig.name}</span>
                        <span
                            title={`构建时间：${buildTime}`}
                            className="rounded-full border border-violet-200/80 bg-violet-50 px-2 py-0.5 font-mono text-[10px] font-bold text-violet-600 dark:border-violet-400/20 dark:bg-violet-400/10 dark:text-violet-300"
                        >
                            v{__APP_VERSION__}
                        </span>
                    </a>

                    <div className="flex items-center gap-2">
            <span
                className="hidden items-center gap-2 rounded-full border border-white/70 bg-white/65 px-3 py-2 text-xs font-semibold text-slate-600 shadow-sm backdrop-blur-xl sm:flex dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
              <span className={`size-2 rounded-full ${isOnline ? 'bg-emerald-500' : 'bg-amber-500'}`}/>
                {isOnline ? '在线可用' : '离线模式'}
            </span>
                        <button
                            type="button"
                            onClick={handleInstall}
                            disabled={!installPrompt || isInstalled}
                            className="rounded-full bg-slate-950 px-4 py-2.5 text-xs font-bold text-white transition hover:-translate-y-0.5 hover:bg-violet-700 disabled:cursor-default disabled:opacity-45 dark:bg-white dark:text-slate-950 dark:hover:bg-violet-200"
                        >
                            {isInstalled ? '已安装' : '安装应用'}
                        </button>
                    </div>
                </header>

                <main
                    className="safe-area-content relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 pb-10 pt-12 sm:px-8 sm:pt-16 lg:px-10 lg:pt-20">
                    <section className="mx-auto max-w-3xl text-center">
                        <div
                            className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-200/70 bg-violet-50/80 px-3 py-1.5 text-xs font-bold text-violet-700 backdrop-blur dark:border-violet-400/20 dark:bg-violet-400/10 dark:text-violet-200">
                            <SparkleIcon className="size-3.5"/>
                            AI 驱动 · 可安装 · 支持离线
                        </div>
                        <h1 className="text-balance text-5xl font-black leading-[0.98] tracking-[-0.055em] text-slate-950 sm:text-7xl dark:text-white">
                            让每一个小想法
                            <span
                                className="block bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-400 bg-clip-text text-transparent">
                都变得真正有用
              </span>
                        </h1>
                        <p className="mx-auto mt-7 max-w-2xl text-pretty text-base leading-7 text-slate-600 sm:text-lg dark:text-slate-300">
                            一个专为轻量 AI 产品准备的精致起点。跨设备快速运行、一键安装，让产品始终围绕最重要的创意展开。
                        </p>
                    </section>

                    <section className="mx-auto mt-12 w-full max-w-3xl sm:mt-14">
                        <div
                            className="demo-card rounded-[2rem] border border-white/80 bg-white/75 p-3 shadow-2xl shadow-violet-950/10 backdrop-blur-2xl sm:p-4 dark:border-white/10 dark:bg-slate-900/65">
                            <form onSubmit={handleSubmit}
                                  className="rounded-[1.4rem] border border-slate-200/80 bg-white p-3 shadow-inner dark:border-white/10 dark:bg-slate-950">
                                <label htmlFor="idea" className="sr-only">向演示助手提问</label>
                                <textarea
                                    id="idea"
                                    value={prompt}
                                    onChange={(event) => setPrompt(event.target.value)}
                                    placeholder="今天想创造什么？"
                                    rows={3}
                                    className="w-full resize-none bg-transparent px-3 py-2 text-base leading-7 text-slate-900 outline-none placeholder:text-slate-400 dark:text-white"
                                />
                                <div
                                    className="flex items-center justify-between gap-3 border-t border-slate-100 px-2 pt-3 dark:border-white/10">
                                    <span className="text-xs font-medium text-slate-400">演示回复 · 无需 API</span>
                                    <button type="submit"
                                            className="flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-violet-600/20 transition hover:bg-violet-700 active:scale-95">
                                        立即生成 <ArrowIcon/>
                                    </button>
                                </div>
                            </form>

                            {answer && (
                                <div
                                    className="answer-enter mx-1 mt-3 flex gap-3 rounded-2xl bg-violet-50 p-4 text-left text-sm leading-6 text-slate-700 dark:bg-violet-400/10 dark:text-slate-200">
                  <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg bg-violet-600 text-white">
                    <SparkleIcon className="size-4"/>
                  </span>
                                    <p>{answer}</p>
                                </div>
                            )}
                        </div>

                        <div className="mt-4 flex flex-wrap justify-center gap-2">
                            {suggestions.map((suggestion) => (
                                <button
                                    key={suggestion}
                                    type="button"
                                    onClick={() => setPrompt(suggestion)}
                                    className="rounded-full border border-slate-200/80 bg-white/60 px-3 py-2 text-xs font-medium text-slate-600 backdrop-blur transition hover:border-violet-300 hover:text-violet-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-violet-400/50 dark:hover:text-violet-200"
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    </section>

                    <section className="mt-20">
                        <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                            <div className="text-left">
                                <span className="text-xs font-bold tracking-[0.2em] text-violet-500">组件示例</span>
                                <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 dark:text-white">组合你的
                                    AI 工作流</h2>
                            </div>
                            <p className="max-w-md text-left text-sm leading-6 text-slate-500 sm:text-right dark:text-slate-400">常用交互均已适配移动端与桌面端，可直接调整并接入真实业务。</p>
                        </div>

                        <div className="grid gap-4 lg:grid-cols-2">
                            <article className="component-card">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="text-xs font-bold text-violet-500">模型参数</span>
                                        <h3 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">选择创作方式</h3>
                                    </div>
                                    <span
                                        className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">自动保存</span>
                                </div>

                                <div className="mt-6 grid grid-cols-3 rounded-xl bg-slate-100 p-1 dark:bg-slate-950">
                                    {modes.map((item) => (
                                        <button key={item} type="button" onClick={() => setMode(item)}
                                                className={`rounded-lg px-3 py-2 text-sm font-bold transition ${mode === item ? 'bg-white text-violet-700 shadow-sm dark:bg-slate-800 dark:text-violet-300' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}>
                                            {item}
                                        </button>
                                    ))}
                                </div>

                                <div className="mt-6">
                                    <div className="mb-3 flex items-center justify-between text-sm">
                                        <label htmlFor="creativity"
                                               className="font-semibold text-slate-700 dark:text-slate-200">创意程度</label>
                                        <span
                                            className="font-mono text-violet-600 dark:text-violet-300">{creativity}%</span>
                                    </div>
                                    <input id="creativity" type="range" min="0" max="100" value={creativity}
                                           onChange={(event) => setCreativity(Number(event.target.value))}
                                           className="w-full accent-violet-600"/>
                                </div>

                                <div
                                    className="mt-6 flex items-center justify-between rounded-2xl border border-slate-200/70 p-4 dark:border-white/10">
                                    <div>
                                        <p className="text-sm font-bold text-slate-800 dark:text-white">快速生成</p>
                                        <p className="mt-1 text-xs text-slate-400">优先响应速度，适合快速探索</p>
                                    </div>
                                    <button type="button" role="switch" aria-checked={fastMode}
                                            onClick={() => setFastMode((value) => !value)}
                                            className={`relative h-7 w-12 rounded-full transition ${fastMode ? 'bg-violet-600' : 'bg-slate-300 dark:bg-slate-700'}`}>
                                        <span
                                            className={`absolute top-1 size-5 rounded-full bg-white shadow transition ${fastMode ? 'left-6' : 'left-1'}`}/>
                                        <span className="sr-only">切换快速生成</span>
                                    </button>
                                </div>
                            </article>

                            <article className="component-card">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <span className="text-xs font-bold text-fuchsia-500">任务队列</span>
                                        <h3 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">本次生成进度</h3>
                                    </div>
                                    <button type="button"
                                            className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 hover:border-violet-300 hover:text-violet-700 dark:border-white/10 dark:text-slate-300">查看全部
                                    </button>
                                </div>
                                <div className="mt-6 space-y-4">
                                    {[
                                        ['生成内容大纲', '已完成', '100%', 'bg-emerald-500'],
                                        ['撰写核心段落', '生成中', '68%', 'bg-violet-500'],
                                        ['检查语气与格式', '等待中', '12%', 'bg-orange-400'],
                                    ].map(([title, status, progress, color]) => (
                                        <div key={title}>
                                            <div className="mb-2 flex items-center justify-between text-sm"><span
                                                className="font-semibold text-slate-700 dark:text-slate-200">{title}</span><span
                                                className="text-xs text-slate-400">{status}</span></div>
                                            <div
                                                className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                                                <div className={`h-full rounded-full ${color}`}
                                                     style={{width: progress}}/>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div
                                    className="mt-6 flex items-center gap-3 rounded-2xl bg-slate-950 p-4 text-white dark:bg-violet-600">
                                    <span
                                        className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/10"><SparkleIcon/></span>
                                    <div className="min-w-0 flex-1"><p className="text-sm font-bold">预计 18
                                        秒后完成</p><p
                                        className="mt-1 truncate text-xs text-white/60">任务会在后台继续运行</p></div>
                                    <button type="button"
                                            className="text-xs font-bold text-violet-300 dark:text-white">取消
                                    </button>
                                </div>
                            </article>

                            <article className="component-card">
                                <span className="text-xs font-bold text-orange-500">内容输入</span>
                                <h3 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">添加参考素材</h3>
                                <button type="button"
                                        className="mt-5 flex w-full flex-col items-center rounded-2xl border-2 border-dashed border-slate-200 px-5 py-7 text-center transition hover:border-violet-400 hover:bg-violet-50/50 dark:border-white/10 dark:hover:bg-violet-400/5">
                                    <span
                                        className="grid size-11 place-items-center rounded-2xl bg-violet-100 text-xl text-violet-700 dark:bg-violet-400/10 dark:text-violet-300">＋</span>
                                    <span
                                        className="mt-3 text-sm font-bold text-slate-700 dark:text-white">点击上传或拖拽文件</span>
                                    <span className="mt-1 text-xs text-slate-400">支持 PDF、DOCX、TXT，最大 20 MB</span>
                                </button>
                                <div
                                    className="mt-4 flex items-center gap-3 rounded-2xl border border-slate-100 p-3 dark:border-white/10">
                                    <span
                                        className="grid size-9 place-items-center rounded-xl bg-red-50 text-xs font-black text-red-500 dark:bg-red-400/10">PDF</span>
                                    <div className="min-w-0 flex-1"><p
                                        className="truncate text-sm font-semibold text-slate-700 dark:text-slate-200">产品需求说明.pdf</p>
                                        <p className="mt-0.5 text-xs text-slate-400">2.4 MB · 已就绪</p></div>
                                    <button type="button" aria-label="移除文件"
                                            className="grid size-8 place-items-center rounded-full text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10">×
                                    </button>
                                </div>
                            </article>

                            <article className="component-card">
                                <span className="text-xs font-bold text-sky-500">输出设置</span>
                                <h3 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">选择内容格式</h3>
                                <div className="mt-5 grid grid-cols-2 gap-3">
                                    {['文章', '清单', '表格', '演示稿'].map((format) => (
                                        <button key={format} type="button" onClick={() => setOutputFormat(format)}
                                                className={`rounded-2xl border p-4 text-left transition ${outputFormat === format ? 'border-violet-500 bg-violet-50 text-violet-700 ring-2 ring-violet-500/10 dark:bg-violet-400/10 dark:text-violet-200' : 'border-slate-200 text-slate-600 hover:border-violet-300 dark:border-white/10 dark:text-slate-300'}`}>
                                            <span className="block text-sm font-bold">{format}</span><span
                                            className="mt-1 block text-xs opacity-60">适合快速分享</span>
                                        </button>
                                    ))}
                                </div>
                                <div className="mt-5 flex flex-wrap gap-2">
                                    {['简体中文', '专业语气', '中等篇幅'].map((tag) => <span key={tag}
                                                                                             className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-500 dark:bg-white/5 dark:text-slate-300">{tag}</span>)}
                                    <button type="button"
                                            className="rounded-full border border-dashed border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-400 hover:border-violet-400 hover:text-violet-600 dark:border-white/20">＋
                                        添加
                                    </button>
                                </div>
                            </article>
                        </div>

                        <nav aria-label="演示导航"
                             className="mt-5 grid grid-cols-4 gap-1 rounded-[2rem] border border-slate-200/70 bg-white/70 p-3 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/[0.045]">
                            {['首页', '创作', '历史', '我的'].map((item) => (
                                <button key={item} type="button" onClick={() => setActiveNav(item)}
                                        className={`rounded-2xl px-3 py-3 text-xs font-bold transition sm:text-sm ${activeNav === item ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/20' : 'text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-white/5 dark:hover:text-white'}`}>
                                    <span className="mb-1 block text-base"
                                          aria-hidden="true">{item === '首页' ? '⌂' : item === '创作' ? '✦' : item === '历史' ? '◷' : '○'}</span>{item}
                                </button>
                            ))}
                        </nav>
                    </section>

                    <section className="mt-20 grid gap-4 sm:grid-cols-3">
                        {[
                            ['01', '开箱即可塑造', '基于 React、TypeScript、Tailwind CSS 与 Konsta UI 的清晰基础。'],
                            ['02', '为 PWA 而生', '内置安装提示、离线缓存、应用图标和自动更新能力。'],
                            ['03', '专注快速发布', '响应式默认配置与聚焦的组件，让下一个想法更快上线。'],
                        ].map(([number, title, description]) => (
                            <article key={number}
                                     className="rounded-3xl border border-slate-200/70 bg-white/45 p-6 text-left backdrop-blur dark:border-white/10 dark:bg-white/[0.035]">
                                <span className="font-mono text-xs font-bold text-violet-500">{number}</span>
                                <h2 className="mt-4 text-lg font-bold tracking-tight text-slate-900 dark:text-white">{title}</h2>
                                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{description}</p>
                            </article>
                        ))}
                    </section>
                </main>

                <footer
                    className="safe-area-footer relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-7 text-xs text-slate-400 sm:px-8 lg:px-10">
                    <span>{appConfig.name} · {appConfig.footerNote}</span>
                    <span title={`构建时间：${buildTime}`}>v{__APP_VERSION__} · React + Vite + PWA</span>
                </footer>
                <PwaUpdatePrompt />
            </Page>
        </KonstaApp>
    )
}

export default App
