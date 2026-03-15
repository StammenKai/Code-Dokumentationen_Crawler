'use strict'

const puppeteer = require('puppeteer')
const path = require('path')
const fs = require('fs')

/**
 * Crawls a documentation URL and returns the raw HTML.
 * Optionally generates a PDF of the cleaned page.
 *
 * @param {string} url
 * @param {{ outputDir?: string, pdf?: boolean }} options
 * @returns {Promise<{ html: string, title: string, pdfPath?: string }>}
 */
async function crawl(url, options = {}) {
  const { outputDir = './kb-files', pdf = false } = options

  const browser = await puppeteer.launch({ headless: 'new' })
  const page = await browser.newPage()

  await page.setViewport({ width: 1280, height: 900 })
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 60_000 })

  const title = await page.title()
  const html = await page.content()

  let pdfPath
  if (pdf) {
    // Remove clutter before printing so the PDF only contains docs content
    await page.evaluate(() => {
      const selectors = [
        'nav', 'header', 'footer', 'aside',
        '[role="navigation"]', '[role="banner"]', '[role="complementary"]',
        '.sidebar', '.toc', '.navbar', '.nav', '.menu',
        '#sidebar', '#toc', '#navbar', '#nav',
        '.cookie-banner', '.announcement-bar',
      ]
      selectors.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => el.remove())
      })
    })

    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true })

    const slug = url.replace(/https?:\/\//, '').replace(/[^a-z0-9]/gi, '-').slice(0, 80)
    pdfPath = path.join(outputDir, `${slug}.pdf`)

    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,
      margin: { top: '20mm', bottom: '20mm', left: '15mm', right: '15mm' },
    })
  }

  await browser.close()
  return { html, title, pdfPath }
}

module.exports = { crawl }
