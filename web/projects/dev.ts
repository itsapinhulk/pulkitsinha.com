#!/usr/bin/env bun
// Starts the projects Vite dev server and all subproject dev servers.
// Subprojects are defined in vite.config.ts — no changes needed here when adding new ones.

import { SUBPROJECTS } from './vite.config'
import { spawnSync } from 'child_process'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const HERE = dirname(fileURLToPath(import.meta.url))

for (const { src } of SUBPROJECTS) {
  spawnSync('bun', ['install', '--cwd', resolve(HERE, src)], { stdio: 'inherit' })
}

const commands = [
  { name: 'projects', color: 'green', cmd: 'vite' },
  ...SUBPROJECTS.map(({ path, port, src, devScript = 'dev' }) => ({
    name: path.slice(1),
    color: 'cyan',
    cmd: `bun run --cwd ${resolve(HERE, src)} ${devScript} -- --port ${port} --host`,
  })),
]

spawnSync(
  'bunx',
  ['concurrently', '-n', commands.map(c => c.name).join(','), '-c', commands.map(c => c.color).join(','), ...commands.map(c => c.cmd)],
  { stdio: 'inherit', shell: false }
)
