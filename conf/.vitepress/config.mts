import { defineConfig } from 'vitepress'
import { readdirSync, statSync } from 'fs'
import { join } from 'path'

function generateSidebar(basePath: string, urlPrefix: string) {
  const wikiPath = join(__dirname, '..', '..', 'docs', basePath)
  const products = readdirSync(wikiPath).filter(name => {
    const fullPath = join(wikiPath, name)
    return statSync(fullPath).isDirectory()
  })

  const sidebar: Record<string, any[]> = {}

  products.forEach(product => {
    const productPath = join(wikiPath, product)
    const files = readdirSync(productPath).filter(f => f.endsWith('.md'))

    sidebar[`${urlPrefix}${product}/`] = [{
      text: product.charAt(0).toUpperCase() + product.slice(1),
      items: files.map(file => {
        const name = file.replace('.md', '')
        const isIndex = name === 'index'
        return {
          text: isIndex ? 'Overview' : name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
          link: `${urlPrefix}${product}/${isIndex ? '' : name}`
        }
      })
    }]
  })

  return sidebar
}

export default defineConfig({
  srcDir: "..\\docs",

  locales: {
    root: {
      label: 'English',
      lang: 'en',
      title: 'FoxyLab',
      description: 'Yiff! Making toys NSFW',
      themeConfig: {
        nav: false,
        sidebar: generateSidebar('wiki', '/wiki/')
      }
    },
    zh: {
      label: '中文',
      lang: 'zh',
      title: 'FoxyLab',
      description: '汪! 这里是小玩具制作者',
      themeConfig: {
        nav: false,
        sidebar: generateSidebar('zh/wiki', '/zh/wiki/')
      }
    }
  }
})
