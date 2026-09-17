import {
  Actions,
  ActionsButton,
  ActionsGroup,
  ActionsLabel,
  Block,
  BlockTitle,
  Button,
  Dialog,
  DialogButton,
  List,
  ListItem,
  Messagebar,
  Navbar,
  NavbarBackLink,
  Notification,
  Popup,
  Preloader,
  Progressbar,
  Sheet,
  Toast,
} from 'konsta/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DemoSection from '../components/DemoSection.tsx'

function FeedbackPage() {
  const navigate = useNavigate()
  const [dialog, setDialog] = useState(false)
  const [actions, setActions] = useState(false)
  const [sheet, setSheet] = useState(false)
  const [popup, setPopup] = useState(false)
  const [toast, setToast] = useState(false)
  const [notification, setNotification] = useState(false)
  const [draft, setDraft] = useState('')

  return (
    <>
      <Navbar
        title="反馈与弹层"
        left={<NavbarBackLink text="更多" onClick={() => navigate('/more')} />}
      />

      <BlockTitle>模态</BlockTitle>
      <Block>
        <DemoSection
          title="Dialog"
          description="居中对话框，buttons 槽位放 DialogButton。"
        >
          <Button rounded onClick={() => setDialog(true)}>
            打开对话框
          </Button>
        </DemoSection>

        <DemoSection
          title="Actions / ActionsGroup"
          description="底部动作表，长按类操作的标准承载方式。"
        >
          <Button rounded onClick={() => setActions(true)}>
            打开动作表
          </Button>
        </DemoSection>

        <DemoSection
          title="Sheet"
          description="从底部升起的面板，适合放简短表单或说明。"
        >
          <Button rounded onClick={() => setSheet(true)}>
            打开面板
          </Button>
        </DemoSection>

        <DemoSection
          title="Popup"
          description="全屏弹层，用于图片预览或独立子流程。"
        >
          <Button rounded onClick={() => setPopup(true)}>
            打开全屏弹层
          </Button>
        </DemoSection>
      </Block>

      <BlockTitle>轻提示</BlockTitle>
      <Block>
        <DemoSection
          title="Toast"
          description="短时提示，position 控制水平位置。"
        >
          <div className="flex flex-wrap gap-2">
            <Button rounded outline onClick={() => setToast(true)}>
              显示提示
            </Button>
          </div>
        </DemoSection>

        <DemoSection
          title="Notification"
          description="顶部通知卡片，可带图标、副标题与关闭回调。"
        >
          <Button rounded outline onClick={() => setNotification(true)}>
            显示通知
          </Button>
        </DemoSection>
      </Block>

      <BlockTitle>加载状态</BlockTitle>
      <Block className="pb-10">
        <DemoSection
          title="Preloader / Progressbar"
          description="不确定进度用 Preloader，确定进度用 Progressbar。"
        >
          <div className="flex items-center gap-4">
            <Preloader />
            <div className="flex-1 space-y-3">
              <Progressbar progress={0.45} />
              <Progressbar progress={0.8} />
            </div>
          </div>
        </DemoSection>

        <DemoSection
          title="Messagebar"
          description="底部输入栏，left / right 槽位可放附件与发送按钮。"
        >
          <div className="relative overflow-hidden rounded-2xl border border-black/5 dark:border-white/10">
            <div className="p-4 text-xs opacity-50">会话内容区域</div>
            <Messagebar
              placeholder="输入消息…"
              value={draft}
              onInput={(event) => setDraft(event.target.value)}
              left={
                <Button clear rounded small>
                  ＋
                </Button>
              }
              right={
                <Button rounded small disabled={!draft.trim()}>
                  发送
                </Button>
              }
            />
          </div>
          <p className="mt-3 text-xs opacity-60">草稿：{draft || '（空）'}</p>
        </DemoSection>
      </Block>

      <Dialog
        opened={dialog}
        onBackdropClick={() => setDialog(false)}
        title="删除这次创作？"
        content="删除后无法恢复，相关的生成记录也会一并移除。"
        buttons={
          <>
            <DialogButton onClick={() => setDialog(false)}>取消</DialogButton>
            <DialogButton strong onClick={() => setDialog(false)}>
              删除
            </DialogButton>
          </>
        }
      />

      <Actions opened={actions} onBackdropClick={() => setActions(false)}>
        <ActionsGroup>
          <ActionsLabel>对这次生成执行操作</ActionsLabel>
          <ActionsButton onClick={() => setActions(false)}>复制内容</ActionsButton>
          <ActionsButton onClick={() => setActions(false)}>重新生成</ActionsButton>
          <ActionsButton bold onClick={() => setActions(false)}>
            删除
          </ActionsButton>
        </ActionsGroup>
        <ActionsGroup>
          <ActionsButton bold onClick={() => setActions(false)}>
            取消
          </ActionsButton>
        </ActionsGroup>
      </Actions>

      <Sheet
        opened={sheet}
        onBackdropClick={() => setSheet(false)}
        className="pb-safe"
      >
        <Navbar
          title="选择导出格式"
          right={<Button clear onClick={() => setSheet(false)}>完成</Button>}
        />
        <List>
          <ListItem link linkComponent="button" title="Markdown" />
          <ListItem link linkComponent="button" title="纯文本" />
          <ListItem link linkComponent="button" title="PDF" />
        </List>
      </Sheet>

      <Popup opened={popup} onBackdropClick={() => setPopup(false)}>
        <Navbar
          title="全屏弹层"
          right={<Button clear onClick={() => setPopup(false)}>关闭</Button>}
        />
        <Block>
          <p className="text-sm opacity-70">
            Popup 覆盖整个视口，适合放置独立于主流程的内容。
          </p>
        </Block>
      </Popup>

      <Toast
        opened={toast}
        position="center"
        button={
          <Button clear small onClick={() => setToast(false)}>
            关闭
          </Button>
        }
      >
        已复制到剪贴板
      </Toast>

      <Notification
        opened={notification}
        onClose={() => setNotification(false)}
        icon={<span className="text-lg">✦</span>}
        title="生成完成"
        titleRightText="刚刚"
        subtitle="旅行计划 · 第 2 版"
        text="大纲与核心段落已经生成，可以开始检查语气。"
        button={
          <Button clear small onClick={() => setNotification(false)}>
            查看
          </Button>
        }
      />
    </>
  )
}

export default FeedbackPage
