'use strict'

const cheerio = require('cheerio')
const TurndownService = require('turndown')
const { gfm } = require('turndown-plugin-gfm')

// ─── Turndown setup ───────────────────────────────────────────────────────────
const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  fence: '```',
  bulletListMarker: '-',
})
turndown.use(gfm)

// Preserve <pre><code> blocks with their language class
turndown.addRule('fencedCodeBlock', {
  filter: (node) =>
    node.nodeName === 'PRE' && node.firstChild && node.firstChild.nodeName === 'CODE',
  replacement(content, node) {
    const code = node.firstChild
    const lang = (code.getAttribute('class') || '')
      .replace(/^language-/, '')
      .split(' ')[0] || ''
    const text = code.textContent || ''
    return `\n\`\`\`${lang}\n${text.trim()}\n\`\`\`\n`
  },
})

// ─── Content selector ─────────────────────────────────────────────────────────

/**
 * TODO: Implement your selector priority strategy here.
 *
 * This function receives a cheerio root ($) and must return the cheerio element
 * that represents the main documentation content. The order of your selectors
 * determines which site structures you support best.
 *
 * @param {import('cheerio').CheerioAPI} $ - loaded cheerio instance
 * @returns {import('cheerio').Cheerio} - the best content element found
 *
 * Hints:
 *  - Try specific selectors first (e.g. '[data-content]', '.docs-content')
 *  - Fall back to semantic HTML ('article', 'main') for generic sites
 *  - Last resort: 'body' — always exists but includes clutter
 *  - Use $(selector).length to check if a selector matched anything
 *
 * Example structure to fill in:
 *
 *   const candidates = [
 *     '[data-content]',          // Docusaurus / custom sites
 *     '.docs-content',           // many framework docs
 *     'article.bd-article',      // Bootstrap docs
 *     'article',                 // semantic HTML
 *     'main',                    // generic fallback
 *     '#content',                // id-based fallback
 *     'body',                    // last resort
 *   ]
 *   for (const sel of candidates) {
 *     if ($(sel).length) return $(sel).first()
 *   }
 */
const candidates = [
  '[data-content]',        // Docusaurus, Next.js Docs
  '.docs-content',         // viele Framework-Docs
  'article.bd-article',    // Bootstrap Docs
  '.notion-page-content',  // Notion-basierte Docs
  'article',               // semantisches HTML
  'main',                  // generischer Fallback
  '#content',              // id-basierter Fallback
  'body',                  // letzter Ausweg
]
function findMainContent($) {
  for (const sel of candidates) {
    if ($(sel).length) return $(sel).first()
  }
  return $('body')
}

// ─── Noise removal ────────────────────────────────────────────────────────────

const NOISE_SELECTORS = [
  'nav', 'header', 'footer', 'aside',
  '[role="navigation"]', '[role="banner"]', '[role="complementary"]',
  '.sidebar', '.toc', '.navbar', '.breadcrumb', '.pagination',
  '.feedback', '.edit-page', '.on-this-page',
  'script', 'style', 'noscript', 'iframe',
]

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Converts raw HTML from a documentation page into clean Markdown.
 *
 * @param {string} html - full page HTML from puppeteer
 * @param {string} url  - original URL (added as front-matter)
 * @param {string} title - page title
 * @returns {string} markdown content
 */
function htmlToMarkdown(html, url, title) {
  const $ = cheerio.load(html)

  // Remove noise elements globally before selecting main content
  NOISE_SELECTORS.forEach(sel => $(sel).remove())

  const main = findMainContent($)

  // Additional noise cleanup inside the selected container
  main.find(NOISE_SELECTORS.join(',')).remove()

  const cleanHtml = main.html() || ''
  const markdown = turndown.turndown(cleanHtml)

  return `# ${title}\n\n> Source: ${url}\n\n${markdown}\n`
}

module.exports = { htmlToMarkdown }
