import {
  Block,
  BlockFooter,
  BlockHeader,
  BlockTitle,
  List,
  ListItem,
  Navbar,
} from 'konsta/react'
import { useNavigate } from 'react-router-dom'
import { secondaryItems } from '../navigation.tsx'

/**
 * Landing page for the categories that do not fit in iOS's five-slot tab bar.
 */
function MorePage() {
  const navigate = useNavigate()

  return (
    <>
      <Navbar title="更多" />

      <BlockHeader inset>除了标签栏里的四类，其余组件按主题收纳在这里。</BlockHeader>

      <BlockTitle>按主题浏览</BlockTitle>
      <List inset strong>
        {secondaryItems.map((item) => (
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

      <BlockFooter inset>
        BlockHeader 与 BlockFooter 用来给分组列表补充上下文说明。
      </BlockFooter>

      <Block className="pb-10">
        <p className="text-xs leading-6 opacity-60">
          iOS 标签栏通常只放五个入口，其余分类统一收敛到这一页。新增页面时，在
          <code className="mx-1 rounded bg-black/5 px-1.5 py-0.5 dark:bg-white/10">
            src/navigation.tsx
          </code>
          的 secondaryItems 里补一项即可同时出现在这里和概览索引中。
        </p>
      </Block>
    </>
  )
}

export default MorePage
