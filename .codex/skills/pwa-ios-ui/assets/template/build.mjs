import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { writeFile } from 'node:fs/promises'
import { build } from 'vite'
import tailwindcss from '@tailwindcss/vite'

const templateDir = dirname(fileURLToPath(import.meta.url))
const outputFile = resolve(process.argv[2] || resolve(templateDir, 'preview.html'))
const result = await build({
  configFile: false,
  root: templateDir,
  publicDir: false,
  plugins: [tailwindcss()],
  define: { 'process.env.NODE_ENV': JSON.stringify('production') },
  build: {
    write: false,
    cssCodeSplit: false,
    sourcemap: false,
    lib: { entry: resolve(templateDir, 'main.jsx'), name: 'IosPreview', formats: ['iife'] },
  },
})
const outputs = (Array.isArray(result) ? result : [result]).flatMap((item) => item.output)
const scripts = outputs.filter((item) => item.type === 'chunk')
const styles = outputs.filter((item) => item.type === 'asset' && item.fileName.endsWith('.css'))
if (scripts.length !== 1 || !styles.length || outputs.length !== scripts.length + styles.length) {
  throw new Error('Expected one bundled script and CSS only; inline additional assets before exporting.')
}
const js = scripts[0].code.replace(/<\/script/gi, '<\\/script')
const css = styles.map((item) => String(item.source)).join('\n').replace(/<\/style/gi, '<\\/style')
await writeFile(outputFile, `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="color-scheme" content="light dark">
  <title>iOS UI 组件效果稿</title>
  <style>${css}</style>
</head>
<body>
  <div id="root"></div>
  <script>${js}</script>
</body>
</html>
`)
console.log(`Generated ${outputFile}`)
