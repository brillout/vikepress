import mdx from '@mdx-js/rollup'
import react from '@vitejs/plugin-react'
import ssr from 'vite-plugin-ssr/plugin'
import { UserConfig } from 'vite'
import { markdownHeadings } from './vite.config/markdownHeadings'
import rehypePrettyCode from 'rehype-pretty-code'
import remarkGfm from 'remark-gfm'
import glob from 'vite-plugin-glob'

const root = process.cwd()
const prettyCode = [rehypePrettyCode, { theme: 'github-light' }]
const rehypePlugins: any = [prettyCode]
const remarkPlugins = [remarkGfm]

const config: UserConfig = {
  root,
  plugins: [
    react({
      jsxRuntime: 'classic'
    }),
    markdownHeadings(),
    mdx({ rehypePlugins, remarkPlugins }),
    ssr({
      prerender: {
        noExtraDir: true
      },
      pageFiles: {
        include: ['vikepress']
      },
      includeCSS: ['vikepress'],
      includeAssetsImportedByServer: true
    }),
    glob({
      // @ts-ignore
      restoreQueryExtension: true
    })
  ],
  // TODO: remove `react`?
  optimizeDeps: { include: ['@mdx-js/react', 'react', 'react-dom'] },
  // @ts-ignore
  ssr: {
    noExternal: ['vikepress']
  },
  clearScreen: false
}

export default config
