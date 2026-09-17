import type { ReactNode } from 'react'
import {
  ChartIcon,
  ChatIcon,
  CompassIcon,
  FormIcon,
  GridIcon,
  HomeIcon,
  LayersIcon,
  ListIcon,
} from './components/icons.tsx'

export interface NavItem {
  path: string
  label: string
  description: string
  icon: ReactNode
  /** Paths that should keep this entry highlighted, including child routes. */
  match: string[]
}

const iconClassName = 'h-7 w-7'

/** Primary tab bar entries. iOS keeps this list at five items. */
export const navItems: NavItem[] = [
  {
    path: '/',
    label: '概览',
    description: '模板信息与安装入口',
    icon: <HomeIcon className={iconClassName} />,
    match: ['/'],
  },
  {
    path: '/form',
    label: '表单',
    description: '输入、开关、滑块与选择',
    icon: <FormIcon className={iconClassName} />,
    match: ['/form'],
  },
  {
    path: '/list',
    label: '列表',
    description: '列表、分组与卡片',
    icon: <ListIcon className={iconClassName} />,
    match: ['/list'],
  },
  {
    path: '/nav',
    label: '导航',
    description: '导航栏、标签栏与抽屉',
    icon: <CompassIcon className={iconClassName} />,
    match: ['/nav'],
  },
  {
    path: '/more',
    label: '更多',
    description: '弹层、数据与消息',
    icon: <GridIcon className={iconClassName} />,
    match: ['/more', '/feedback', '/data', '/messages'],
  },
]

/** Secondary entries, listed on the `更多` page and the overview index. */
export const secondaryItems: NavItem[] = [
  {
    path: '/feedback',
    label: '反馈与弹层',
    description: '对话框、动作表、面板与通知',
    icon: <LayersIcon className={iconClassName} />,
    match: ['/feedback'],
  },
  {
    path: '/data',
    label: '数据与表格',
    description: '表格、进度与毛玻璃',
    icon: <ChartIcon className={iconClassName} />,
    match: ['/data'],
  },
  {
    path: '/messages',
    label: '消息与会话',
    description: '气泡消息与输入栏',
    icon: <ChatIcon className={iconClassName} />,
    match: ['/messages'],
  },
]

/** Every demo route, in navigation order. */
export const allItems: NavItem[] = [...navItems, ...secondaryItems]

export function isNavItemActive(item: NavItem, pathname: string) {
  return item.match.some((path) =>
    path === '/' ? pathname === '/' : pathname === path || pathname.startsWith(`${path}/`),
  )
}
