import {
  Block,
  BlockTitle,
  Button,
  Message,
  Messagebar,
  Messages,
  MessagesTitle,
  Navbar,
  NavbarBackLink,
} from 'konsta/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DemoSection from '../components/DemoSection.tsx'

interface ChatMessage {
  id: number
  type: 'sent' | 'received'
  text: string
  time: string
}

const initialMessages: ChatMessage[] = [
  {
    id: 1,
    type: 'received',
    text: '我已根据你的想法整理出三个方向，需要我先展开哪一个？',
    time: '09:20',
  },
  { id: 2, type: 'sent', text: '先展开第一个，并给出可执行的第一步。', time: '09:21' },
  {
    id: 3,
    type: 'received',
    text: '好的，第一步是把目标压缩成一句可验证的话。',
    time: '09:21',
  },
]

function MessagesPage() {
  const navigate = useNavigate()
  const [messages, setMessages] = useState(initialMessages)
  const [draft, setDraft] = useState('')

  const handleSend = () => {
    const text = draft.trim()
    if (!text) return

    setMessages((current) => [
      ...current,
      {
        id: current.length + 1,
        type: 'sent',
        text,
        time: new Intl.DateTimeFormat('zh-CN', {
          hour: '2-digit',
          minute: '2-digit',
        }).format(new Date()),
      },
    ])
    setDraft('')
  }

  return (
    <>
      <Navbar
        title="消息与会话"
        left={<NavbarBackLink text="更多" onClick={() => navigate('/more')} />}
      />

      <BlockTitle>会话视图</BlockTitle>
      <Block className="pb-10">
        <DemoSection
          title="Messages / Message / MessagesTitle"
          description="type 取 sent 或 received 决定气泡方向；footer 用于时间戳。"
        >
          <div className="relative overflow-hidden rounded-2xl border border-black/5 dark:border-white/10">
            <Messages>
              <MessagesTitle>今天</MessagesTitle>
              {messages.map((message) => (
                <Message
                  key={message.id}
                  type={message.type}
                  name={message.type === 'received' ? '助手' : undefined}
                  text={message.text}
                  footer={message.time}
                />
              ))}
            </Messages>

            <Messagebar
              placeholder="输入消息…"
              value={draft}
              onInput={(event) => setDraft(event.target.value)}
              right={
                <Button rounded small disabled={!draft.trim()} onClick={handleSend}>
                  发送
                </Button>
              }
            />
          </div>
        </DemoSection>

        <DemoSection
          title="重置示例"
          description="消息列表由本地 state 驱动，方便直接替换为真实数据源。"
        >
          <div className="flex flex-wrap gap-2">
            <Button rounded outline onClick={() => setMessages(initialMessages)}>
              恢复初始对话
            </Button>
            <Button rounded outline onClick={() => setMessages([])}>
              清空对话
            </Button>
          </div>
          <p className="mt-3 text-xs opacity-60">当前共 {messages.length} 条消息</p>
        </DemoSection>
      </Block>
    </>
  )
}

export default MessagesPage
