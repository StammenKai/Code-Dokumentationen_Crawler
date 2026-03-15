'use strict'

const fs = require('fs')
const path = require('path')
const Anthropic = require('@anthropic-ai/sdk')

const MIME_MAP = {
  '.md':  'text/plain',
  '.txt': 'text/plain',
  '.pdf': 'application/pdf',
  '.html': 'text/html',
}

/**
 * Uploads a local file to the Anthropic Files API.
 * The returned file_id can be referenced in Messages API calls.
 *
 * Files uploaded here are for API usage — for claude.ai Projects,
 * upload the local ./kb-files manually via the web UI.
 *
 * @param {string} filePath - absolute or relative path to the file
 * @returns {Promise<{ fileId: string, filename: string, sizeBytes: number }>}
 */
async function uploadToFilesApi(filePath) {
  const client = new Anthropic.default()

  const filename = path.basename(filePath)
  const ext = path.extname(filename).toLowerCase()
  const mimeType = MIME_MAP[ext] || 'text/plain'

  const fileStream = fs.createReadStream(filePath)

  const uploaded = await client.beta.files.upload(
    {
      file: await Anthropic.toFile(fileStream, filename, { type: mimeType }),
    },
    {
      headers: { 'anthropic-beta': 'files-api-2025-04-14' },
    }
  )

  return {
    fileId: uploaded.id,
    filename: uploaded.filename,
    sizeBytes: uploaded.size,
  }
}

/**
 * Lists all files currently stored in the Anthropic Files API.
 *
 * @returns {Promise<Array<{ id: string, filename: string, size: number }>>}
 */
async function listFiles() {
  const client = new Anthropic.default()
  const result = await client.beta.files.list(
    {},
    { headers: { 'anthropic-beta': 'files-api-2025-04-14' } }
  )
  return result.data
}

module.exports = { uploadToFilesApi, listFiles }
