import {
  Block,
  BlockTitle,
  Button,
  Checkbox,
  Chip,
  List,
  ListInput,
  ListItem,
  Navbar,
  Radio,
  Range,
  Searchbar,
  Segmented,
  SegmentedButton,
  Stepper,
  Toggle,
} from 'konsta/react'
import { useState } from 'react'
import DemoSection from '../components/DemoSection.tsx'

const modes = ['灵感', '写作', '分析']
const plans = [
  { value: 'free', label: '免费版', note: '每月 20 次生成' },
  { value: 'pro', label: '专业版', note: '不限次数，优先生成' },
]

function FormPage() {
  const [mode, setMode] = useState(modes[0])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [secret, setSecret] = useState('')
  const [search, setSearch] = useState('')
  const [notify, setNotify] = useState(true)
  const [sync, setSync] = useState(false)
  const [creativity, setCreativity] = useState(60)
  const [plan, setPlan] = useState('pro')
  const [quantity, setQuantity] = useState(2)

  return (
    <>
      <Navbar title="表单" />

      <BlockTitle>输入控件</BlockTitle>
      <Block>
        <DemoSection
          title="ListInput"
          description="输入行，支持 label、floatingLabel、清除按钮与错误态。"
        >
          <List nested dividers>
            <ListInput
              label="名称"
              placeholder="给这次创作起个名字"
              value={name}
              clearButton
              onChange={(event) => setName(event.target.value)}
            />
            <ListInput
              label="邮箱"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <ListInput
              label="访问口令"
              type="password"
              placeholder="至少 8 位"
              value={secret}
              onChange={(event) => setSecret(event.target.value)}
            />
            <ListInput
              label="配额"
              type="number"
              placeholder="1"
              error="配额必须是大于 0 的数字"
            />
          </List>

          <div className="mt-4 text-xs opacity-60">
            当前输入：{name || '（空）'} · {email || '（空）'} · {secret.length} 位口令
          </div>
        </DemoSection>

        <DemoSection
          title="Searchbar"
          description="搜索栏，自带清除按钮与禁用态。"
        >
          <Searchbar
            placeholder="搜索组件"
            value={search}
            clearButton
            onInput={(event) => setSearch(event.target.value)}
            onClear={() => setSearch('')}
          />
          <p className="mt-3 text-xs opacity-60">
            关键词：{search || '（空）'}
          </p>
        </DemoSection>
      </Block>

      <BlockTitle>选择控件</BlockTitle>
      <Block>
        <DemoSection
          title="Segmented / SegmentedButton"
          description="分段控件，同一时刻只有一个选项处于 active。"
        >
          <Segmented strong>
            {modes.map((item) => (
              <SegmentedButton
                key={item}
                active={mode === item}
                onClick={() => setMode(item)}
              >
                {item}
              </SegmentedButton>
            ))}
          </Segmented>
          <p className="mt-3 text-xs opacity-60">当前模式：{mode}</p>
        </DemoSection>

        <DemoSection title="Toggle" description="开关，checked 与 onChange 受控使用。">
          <List nested dividers>
            <ListItem
              label
              title="接收更新通知"
              after={
                <Toggle
                  checked={notify}
                  onChange={(event) => setNotify(event.target.checked)}
                />
              }
            />
            <ListItem
              label
              title="自动化同步"
              after={
                <Toggle
                  checked={sync}
                  onChange={(event) => setSync(event.target.checked)}
                />
              }
            />
            <ListItem label title="已禁用" after={<Toggle disabled />} />
          </List>
          <div className="mt-3 flex gap-2">
            <Chip>{notify ? '通知已开启' : '通知已关闭'}</Chip>
            {sync ? <Chip>同步进行中</Chip> : null}
          </div>
        </DemoSection>

        <DemoSection
          title="Checkbox / Radio"
          description="把控件放进 ListItem 的 after 槽位并用 label 包裹，点整行即可切换。"
        >
          <List nested dividers>
            <ListItem
              label
              title="包含参考素材"
              after={<Checkbox defaultChecked />}
            />
            <ListItem
              label
              title="生成后自动发送邮件"
              after={<Checkbox />}
            />
          </List>
          <div className="mt-3">
            <List nested dividers>
              {plans.map((item) => (
                <ListItem
                  key={item.value}
                  label
                  title={item.label}
                  subtitle={item.note}
                  after={
                    <Radio
                      name="plan"
                      value={item.value}
                      checked={plan === item.value}
                      onChange={() => setPlan(item.value)}
                    />
                  }
                />
              ))}
            </List>
          </div>
          <p className="mt-3 text-xs opacity-60">当前套餐：{plan}</p>
        </DemoSection>

        <DemoSection
          title="Range / Stepper"
          description="Range 用于连续取值，Stepper 用于离散数量。"
        >
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium">创意程度</span>
            <span className="font-mono opacity-70">{creativity}%</span>
          </div>
          <Range
            value={creativity}
            min={0}
            max={100}
            onInput={(event) => setCreativity(Number(event.target.value))}
          />

          <div className="mt-6 flex items-center justify-between">
            <span className="text-sm font-medium">生成数量</span>
            <Stepper
              value={quantity}
              input
              rounded
              onMinus={() => setQuantity((value) => Math.max(0, value - 1))}
              onPlus={() => setQuantity((value) => value + 1)}
              onChange={(event) => setQuantity(Number(event.target.value))}
            />
          </div>
        </DemoSection>
      </Block>

      <BlockTitle>按钮</BlockTitle>
      <Block className="pb-10">
        <DemoSection
          title="Button"
          description="填充、描边、浅色与圆角等形态，通过 outline / clear / tonal / rounded 切换。"
        >
          <div className="flex flex-wrap items-center gap-2">
            <Button rounded>填充</Button>
            <Button rounded outline>
              描边
            </Button>
            <Button rounded clear>
              浅色
            </Button>
            <Button rounded tonal>
              柔和
            </Button>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Button small rounded>
              小号
            </Button>
            <Button rounded>默认</Button>
            <Button large rounded>
              大号
            </Button>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Button rounded disabled>
              禁用
            </Button>
            <Button rounded outline onClick={() => setCreativity(60)}>
              重置滑块
            </Button>
          </div>
        </DemoSection>

        <DemoSection title="Chip" description="带删除按钮的标签，onDelete 触发移除。">
          <div className="flex flex-wrap items-center gap-2">
            {['简体中文', '专业语气', '中等篇幅'].map((tag) => (
              <Chip key={tag} deleteButton onDelete={() => undefined}>
                {tag}
              </Chip>
            ))}
            <Chip outline>＋ 添加</Chip>
          </div>
        </DemoSection>
      </Block>
    </>
  )
}

export default FormPage
