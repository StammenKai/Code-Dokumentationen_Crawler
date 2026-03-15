'use strict'

require('dotenv').config()

const fs = require('fs')
const path = require('path')
const { crawl } = require('./crawler')
const { crawlSite } = require('./site-crawler')
const { htmlToMarkdown } = require('./extractor')
const { uploadToFilesApi } = require('./uploader')

// ─── Helpers ──────────────────────────────────────────────────────────────────

function urlToSlug(url) {
  return url.replace(/https?:\/\//, '').replace(/[^a-z0-9]/gi, '-').slice(0, 80)
}

function getArg(args, flag) {
  const i = args.indexOf(flag)
  return i !== -1 ? args[i + 1] : null
}

// ─── CLI argument parsing ────────────────────────────────────────────────────

function parseArgs(argv) {
  const args = argv.slice(2)
  const url = args.find(a => a.startsWith('http'))

  if (!url) {
    console.log(`
Usage: node src/index.js <url> [options]

Single page:
  node src/index.js https://example.com/docs/intro

Follow all internal links (full docs section):
  node src/index.js https://example.com/docs/ --follow-links
  node src/index.js https://example.com/docs/ --follow-links --max-pages 100 --depth 4

Options:
  --follow-links        Crawl all internal links within the same URL path
  --max-pages <n>       Max pages to crawl (default: 50)
  --depth <n>           Max link-follow depth (default: 3)
  --delay <ms>          Delay between requests in ms (default: 800)
  --combine             Merge all pages into one Markdown file
  --pdf                 Also save PDF copies
  --upload              Upload result(s) to Anthropic Files API
  --output <dir>        Output directory (default: ./kb-files)
`)
    process.exit(1)
  }

  return {
    url,
    followLinks: args.includes('--follow-links'),
    maxPages:    parseInt(getArg(args, '--max-pages') || '50', 10),
    maxDepth:    parseInt(getArg(args, '--depth')     || '3',  10),
    delayMs:     parseInt(getArg(args, '--delay')     || '800', 10),
    combine:     args.includes('--combine'),
    pdf:         args.includes('--pdf'),
    upload:      args.includes('--upload'),
    outputDir:   getArg(args, '--output') || './kb-files',
  }
}

// ─── Single-page flow ─────────────────────────────────────────────────────────

async function runSinglePage({ url, pdf, upload, outputDir }) {
  console.log(`\n📡  Crawling: ${url}`)
  const { html, title, pdfPath } = await crawl(url, { outputDir, pdf })
  console.log(`    Title: "${title}"`)
  if (pdfPath) console.log(`    PDF: ${pdfPath}`)

  const markdown = htmlToMarkdown(html, url, title)
  const mdPath = path.join(outputDir, `${urlToSlug(url)}.md`)
  fs.writeFileSync(mdPath, markdown, 'utf8')
  const kb = (Buffer.byteLength(markdown, 'utf8') / 1024).toFixed(1)
  console.log(`✅  Saved: ${mdPath} (${kb} KB)`)

  if (upload) await uploadFile(mdPath)
  else printManualUploadHint(mdPath)
}

// ─── Multi-page flow ──────────────────────────────────────────────────────────

async function runFollowLinks({ url, maxPages, maxDepth, delayMs, combine, pdf, upload, outputDir }) {
  console.log(`\n📡  Site crawl starting at: ${url}`)
  console.log(`    max-pages=${maxPages}  depth=${maxDepth}  delay=${delayMs}ms\n`)

  const pages = await crawlSite(url, {
    maxPages, maxDepth, delayMs, pdf, outputDir,
    onProgress: (done, total, currentUrl) => {
      const short = currentUrl.replace(/https?:\/\/[^/]+/, '')
      console.log(`  [${done}/${total}] ${short}`)
    },
  })

  console.log(`\n✅  Crawled ${pages.length} pages`)

  if (combine) {
    // Merge into one big Markdown file — ideal for a single KB upload
    const combined = pages
      .map(p => htmlToMarkdown(p.html, p.url, p.title))
      .join('\n\n---\n\n')
    const slug = urlToSlug(url)
    const mdPath = path.join(outputDir, `${slug}--combined.md`)
    fs.writeFileSync(mdPath, combined, 'utf8')
    const mb = (Buffer.byteLength(combined, 'utf8') / 1024 / 1024).toFixed(2)
    console.log(`📄  Combined file: ${mdPath} (${mb} MB)`)
    if (upload) await uploadFile(mdPath)
    else printManualUploadHint(mdPath)
  } else {
    // Save each page as its own file
    const savedPaths = []
    for (const p of pages) {
      const markdown = htmlToMarkdown(p.html, p.url, p.title)
      const mdPath = path.join(outputDir, `${urlToSlug(p.url)}.md`)
      fs.writeFileSync(mdPath, markdown, 'utf8')
      savedPaths.push(mdPath)
    }
    console.log(`📁  ${savedPaths.length} files saved to ${outputDir}/`)

    if (upload) {
      console.log('\n☁️   Uploading all files...')
      for (const mdPath of savedPaths) await uploadFile(mdPath)
    } else {
      console.log(`\n💡  Add --combine to merge into one file for easy upload`)
      console.log(`💡  Add --upload to push to Anthropic Files API`)
    }
  }
}

// ─── Upload helper ────────────────────────────────────────────────────────────

async function uploadFile(mdPath) {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('❌  ANTHROPIC_API_KEY not set — skipping upload.')
    return
  }
  console.log(`☁️   Uploading ${path.basename(mdPath)}...`)
  const { fileId, sizeBytes } = await uploadToFilesApi(mdPath)
  const mb = (sizeBytes / 1024 / 1024).toFixed(2)
  console.log(`    file_id: ${fileId} (${mb} MB)`)
}

function printManualUploadHint(mdPath) {
  console.log(`\n💡  claude.ai Projects → Files → upload manually:`)
  console.log(`    ${path.resolve(mdPath)}`)
}

// ─── Entry point ─────────────────────────────────────────────────────────────

async function main() {
  const opts = parseArgs(process.argv)
  if (!fs.existsSync(opts.outputDir)) fs.mkdirSync(opts.outputDir, { recursive: true })

  if (opts.followLinks) {
    await runFollowLinks(opts)
  } else {
    await runSinglePage(opts)
  }
}

main().catch(err => {
  console.error('❌ ', err.message)
  process.exit(1)
})
