import { rm } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const distDirectory = path.join(appRoot, 'dist')

if (path.dirname(distDirectory) !== appRoot || path.basename(distDirectory) !== 'dist') {
  throw new Error(`拒绝清理非预期目录：${distDirectory}`)
}

await rm(distDirectory, { recursive: true, force: true })
console.log(`已清理：${distDirectory}`)
