'use strict'

const cheerio = require('cheerio')
const { crawl } = require('./crawler')

// ─── Link extraction ──────────────────────────────────────────────────────────

/**
 * Extracts all absolute URLs from <a href> tags on a page.
 * Relative URLs are resolved against currentUrl.
 *
 * @param {string} html
 * @param {string} currentUrl
 * @returns {string[]}
 */
function extractLinks(html, currentUrl) {
  const $ = cheerio.load(html)
  const base = new URL(currentUrl)
  const links = []

  $('a[href]').each((_, el) => {
    const href = $(el).attr('href')
    if (!href) return
    try {
      const resolved = new URL(href, base)
      // Strip hash and query so we don't crawl the same page twice
      resolved.hash = ''
      resolved.search = ''
      links.push(resolved.href)
    } catch {
      // ignore unparseable hrefs
    }
  })

  return [...new Set(links)]
}

// ─── Link filter ──────────────────────────────────────────────────────────────

/**
 * Decides whether a discovered link should be crawled.
 *
 * Called for every link found on every page. Return true to enqueue,
 * false to skip.
 *
 * @param {string} url        - the candidate URL to evaluate
 * @param {string} startUrl   - the original URL the crawl started from
 * @returns {boolean}
 *
 * Design decisions to consider:
 *
 *   1. PATH PREFIX — only follow links that stay within the docs section:
 *        const start = new URL(startUrl)
 *        const candidate = new URL(url)
 *        return candidate.hostname === start.hostname
 *            && candidate.pathname.startsWith(start.pathname)
 *
 *      Pro: precise, stays in docs  Con: misses sibling docs sections
 *
 *   2. HOSTNAME ONLY — follow anything on the same domain:
 *        return new URL(url).hostname === new URL(startUrl).hostname
 *
 *      Pro: catches all docs sections  Con: also crawls blog, pricing, etc.
 *
 *   3. BLOCKLIST — hostname match + exclude known non-doc patterns:
 *        const blocked = ['/blog/', '/changelog/', '/pricing', '/login']
 *        const path = new URL(url).pathname
 *        return new URL(url).hostname === new URL(startUrl).hostname
 *            && !blocked.some(b => path.includes(b))
 *
 *      Pro: balanced  Con: needs manual maintenance per site
 */
function shouldFollow(url, startUrl) {
  const start = new URL(startUrl).hostname
  const candidate = new URL(url).hostname


  // Only same hostname
  if (candidate.hostname !== start.hostname) return false

  // Stay within the same path prefix as the start URL
  return candidate.pathname.startsWith(start.pathname)
}

// ─── BFS site crawler ─────────────────────────────────────────────────────────

/**
 * Crawls an entire documentation section using BFS.
 * Respects maxPages and maxDepth limits.
 *
 * @param {string} startUrl
 * @param {{
 *   maxPages?: number,
 *   maxDepth?: number,
 *   delayMs?: number,
 *   pdf?: boolean,
 *   outputDir?: string,
 *   onProgress?: (done: number, total: number, url: string) => void
 * }} options
 * @returns {Promise<Array<{ url: string, html: string, title: string, depth: number, pdfPath?: string }>>}
 */
async function crawlSite(startUrl, options = {}) {
  const {
    maxPages = 50,
    maxDepth = 3,
    delayMs = 800,
    pdf = false,
    outputDir = './kb-files',
    onProgress,
  } = options

  const visited = new Set()
  // Queue entries: { url, depth }
  const queue = [{ url: startUrl, depth: 0 }]
  const results = []

  while (queue.length > 0 && results.length < maxPages) {
    const { url, depth } = queue.shift()

    if (visited.has(url)) continue
    visited.add(url)

    onProgress?.(results.length + 1, Math.min(queue.length + results.length + 1, maxPages), url)

    let pageData
    try {
      pageData = await crawl(url, { outputDir, pdf })
    } catch (err) {
      console.warn(`    ⚠️  Skipping ${url}: ${err.message}`)
      continue
    }

    results.push({ url, depth, ...pageData })

    // Discover child links if we haven't hit the depth limit
    if (depth < maxDepth) {
      const links = extractLinks(pageData.html, url)
      for (const link of links) {
        if (!visited.has(link) && shouldFollow(link, startUrl)) {
          queue.push({ url: link, depth: depth + 1 })
        }
      }
    }

    // Polite delay between requests
    if (queue.length > 0) await sleep(delayMs)
  }

  return results
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

module.exports = { crawlSite, shouldFollow, extractLinks }
