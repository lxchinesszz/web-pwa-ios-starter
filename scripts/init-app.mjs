import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

function parseArguments(args) {
  const options = {}

  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index]

    if (argument === '--help' || argument === '-h') {
      options.help = true
      continue
    }

    if (!argument.startsWith('--')) {
      throw new Error(`无法识别参数：${argument}`)
    }

    const key = argument.slice(2)
    const value = args[index + 1]
    if (!value || value.startsWith('--')) {
      throw new Error(`参数 ${argument} 缺少值`)
    }

    options[key] = value
    index += 1
  }

  return options
}

function printHelp() {
  console.log(`初始化当前目录中的 PWA 应用

用法：
  node scripts/init-app.mjs --name "旅行规划助手" --slug "trip-planner" --description "使用 AI 快速生成旅行计划"

必填参数：
  --name              应用完整名称
  --slug              URL 与部署目录，使用 kebab-case
  --description       应用描述

可选参数：
  --short-name        安装后显示的短名称，默认与 name 相同
  --theme-color       主题色，默认 #863bff
  --background-color  启动画面背景色，默认 #ffffff
  --footer-note       页脚说明，默认 PWA 应用`)
}

function validateOptions(options) {
  const required = ['name', 'slug', 'description']
  const missing = required.filter((key) => !options[key]?.trim())

  if (missing.length > 0) {
    throw new Error(`缺少必填参数：${missing.map((key) => `--${key}`).join('、')}`)
  }

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(options.slug)) {
    throw new Error('--slug 必须使用 kebab-case，例如 trip-planner')
  }

  for (const key of ['theme-color', 'background-color']) {
    if (options[key] && !/^#[0-9a-f]{6}$/i.test(options[key])) {
      throw new Error(`--${key} 必须是六位十六进制颜色，例如 #863bff`)
    }
  }
}

async function readJson(fileName) {
  return JSON.parse(await readFile(path.join(appRoot, fileName), 'utf8'))
}

async function writeJson(fileName, value) {
  await writeFile(
    path.join(appRoot, fileName),
    `${JSON.stringify(value, null, 2)}\n`,
  )
}

async function updatePackageFile(slug) {
  const packageJson = await readJson('package.json')
  packageJson.name = slug
  packageJson.version = '0.1.0'
  await writeJson('package.json', packageJson)
}

async function main() {
  const options = parseArguments(process.argv.slice(2))

  if (options.help) {
    printHelp()
    return
  }

  validateOptions(options)

  const config = {
    name: options.name.trim(),
    shortName: (options['short-name'] || options.name).trim(),
    description: options.description.trim(),
    slug: options.slug,
    lang: 'zh-CN',
    themeColor: options['theme-color'] || '#863bff',
    backgroundColor: options['background-color'] || '#ffffff',
    footerNote: options['footer-note'] || 'PWA 应用',
  }
  const configSource = `export const appConfig = ${JSON.stringify(config, null, 2)}\n`

  await writeFile(path.join(appRoot, 'app.config.ts'), configSource)
  await updatePackageFile(config.slug)

  console.log(`已初始化 ${config.name}`)
  console.log(`目录：${appRoot}`)
  console.log(`访问路径：/${config.slug}/`)
  console.log('下一步：pnpm install && pnpm generate:pwa-assets && pnpm lint && pnpm build')
}

main().catch((error) => {
  console.error(error.message)
  process.exitCode = 1
})
