import { useEffect, useState } from 'react'
import { useRegisterSW } from 'virtual:pwa-register/react'

const updateCheckInterval = 60 * 60 * 1000

function PwaUpdatePrompt() {
  const [registration, setRegistration] = useState<ServiceWorkerRegistration>()
  const [isUpdating, setIsUpdating] = useState(false)
  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(_swUrl, currentRegistration) {
      setRegistration(currentRegistration)
    },
    onRegisterError(error) {
      console.error('Service Worker 注册失败', error)
    },
  })

  useEffect(() => {
    if (!registration) return

    const checkForUpdate = () => {
      if (navigator.onLine) void registration.update()
    }
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') checkForUpdate()
    }
    const intervalId = window.setInterval(checkForUpdate, updateCheckInterval)

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.clearInterval(intervalId)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [registration])

  if (!needRefresh) return null

  const handleUpdate = async () => {
    setIsUpdating(true)

    try {
      await updateServiceWorker(true)
    } catch (error) {
      console.error('应用更新失败', error)
      setIsUpdating(false)
    }
  }

  return (
    <aside
      aria-live="polite"
      aria-label="应用更新提示"
      className="fixed inset-x-4 bottom-[calc(1.5rem+var(--k-safe-area-bottom))] z-50 mx-auto max-w-md rounded-2xl border border-white/10 bg-slate-950/95 p-4 text-white shadow-2xl shadow-slate-950/30 backdrop-blur-xl"
    >
      <div className="flex items-center gap-4">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-violet-600 text-xl" aria-hidden="true">
          ↑
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold">新版本已准备好</p>
          <p className="mt-1 text-xs leading-5 text-slate-300">
            点击更新以获得最新功能，页面将自动刷新。
          </p>
        </div>
        <button
          type="button"
          onClick={handleUpdate}
          disabled={isUpdating}
          className="shrink-0 rounded-xl bg-violet-600 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-violet-500 active:scale-95 disabled:cursor-wait disabled:opacity-60"
        >
          {isUpdating ? '更新中…' : '立即更新'}
        </button>
      </div>
    </aside>
  )
}

export default PwaUpdatePrompt
