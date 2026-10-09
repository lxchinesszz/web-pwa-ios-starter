import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  App, Page, Navbar, NavbarBackLink, Link, Block, BlockTitle,
  List, ListItem, Tabbar, ToolbarPane, TabbarLink, Icon,
} from 'konsta/react'
import './index.css'

function NavIcon({ profile = false }) {
  return (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none"
      stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      {profile ? <><circle cx="12" cy="8" r="4" /><path d="M4 22v-2a8 8 0 0 1 16 0v2" /></>
        : <><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m3 7 9 6 9-6" /></>}
    </svg>
  )
}

function Preview() {
  const [tab, setTab] = useState('inbox')
  const [detail, setDetail] = useState(false)
  const [dark, setDark] = useState(false)
  const title = detail ? '消息详情' : tab === 'inbox' ? '收件箱' : '我的'

  function toggleTheme() {
    document.documentElement.classList.toggle('dark', !dark)
    setDark(!dark)
  }

  return (
    <App theme="ios" safeAreas>
      <Page key={detail ? 'detail' : tab}>
        <Navbar title={title} className="top-0 sticky"
          large={!detail} transparent={false}
          left={detail ? <NavbarBackLink text="返回" onClick={() => setDetail(false)} /> : undefined}
          right={<Link navbar onClick={toggleTheme}>{dark ? '浅色' : '深色'}</Link>}
        />
        <div className={detail ? undefined : 'preview-content'}>
          {detail ? <Block strong inset>欢迎使用组件原型。通过返回操作回到收件箱。</Block>
            : tab === 'inbox' ? <>
              <BlockTitle>最新消息</BlockTitle>
              <List strong inset>
                <ListItem link title="欢迎使用" subtitle="查看消息详情"
                  onClick={() => setDetail(true)} />
              </List>
            </> : <>
              <BlockTitle>个人资料</BlockTitle>
              <List strong inset><ListItem title="预览用户" subtitle="本地模拟资料" /></List>
            </>}
        </div>
      </Page>
      {!detail && <Tabbar labels icons className="left-0 bottom-0 fixed">
        <ToolbarPane>
          <TabbarLink active={tab === 'inbox'} onClick={() => setTab('inbox')}
            icon={<Icon ios={<NavIcon />} />} label="收件箱" />
          <TabbarLink active={tab === 'profile'} onClick={() => setTab('profile')}
            icon={<Icon ios={<NavIcon profile />} />} label="我的" />
        </ToolbarPane>
      </Tabbar>}
    </App>
  )
}

createRoot(document.getElementById('root')).render(<Preview />)
