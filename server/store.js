import fs from 'node:fs/promises'
import path from 'node:path'
import crypto from 'node:crypto'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_DIR = path.join(__dirname, 'data')
const DATA_FILE = path.join(DATA_DIR, 'certificates.json')
const REDIS_KEY = 'nanospark:certificates'

export const CERT_ID_PATTERN = /^[A-Z]{2}-[0-9]{4}$/
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/
const MAX_DOCUMENT_BYTES = 2 * 1024 * 1024
const ALLOWED_DOCUMENT_TYPES = new Set([
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
])
const STATUSES = new Set(['verified', 'revoked'])

export class ApiError extends Error {
  constructor(status, message, code) {
    super(message)
    this.status = status
    this.code = code
  }
}

const isProduction = () =>
  Boolean(process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'development') ||
  Boolean(process.env.NETLIFY) ||
  Boolean(process.env.AWS_LAMBDA_FUNCTION_NAME)

function redisConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN
  return url && token ? { url, token } : null
}

export function storageMode() {
  if (redisConfig()) return 'redis'
  return isProduction() ? 'unconfigured' : 'file'
}

async function redisCommand(args) {
  const config = redisConfig()
  if (!config) throw new ApiError(503, 'Certificate storage is not configured.', 'STORAGE_NOT_CONFIGURED')
  const res = await fetch(config.url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
  })
  if (!res.ok) {
    throw new ApiError(502, 'Certificate storage request failed.', 'STORAGE_ERROR')
  }
  const data = await res.json()
  if (data?.error) {
    throw new ApiError(502, 'Certificate storage request failed.', 'STORAGE_ERROR')
  }
  return data?.result
}

const SEED_CERTIFICATES = [
  {
    id: 'NS-2026',
    recipientName: 'Demo Recipient',
    programName: 'Nano Spark STEM Innovation Program',
    productName: 'WiFi Controlled Car - STEM Project Kit',
    issueDate: '2026-01-15',
    status: 'verified',
    document: null,
    createdAt: '2026-01-15T00:00:00.000Z',
    updatedAt: '2026-01-15T00:00:00.000Z',
  },
  {
    id: 'NS-9999',
    recipientName: 'Demo Revoked Record',
    programName: 'Nano Spark Robotics Workshop',
    productName: 'Human Follower Robot - STEM Project Kit',
    issueDate: '2025-11-02',
    status: 'revoked',
    document: null,
    createdAt: '2025-11-02T00:00:00.000Z',
    updatedAt: '2025-11-02T00:00:00.000Z',
  },
]

async function readAll() {
  if (redisConfig()) {
    const raw = await redisCommand(['GET', REDIS_KEY])
    if (!raw) return []
    try {
      const parsed = JSON.parse(raw)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }

  if (isProduction()) {
    throw new ApiError(
      503,
      'Certificate storage is not configured. Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.',
      'STORAGE_NOT_CONFIGURED',
    )
  }

  try {
    const raw = await fs.readFile(DATA_FILE, 'utf8')
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch (error) {
    if (error.code === 'ENOENT') {
      await writeAll(SEED_CERTIFICATES)
      return SEED_CERTIFICATES.map((record) => ({ ...record }))
    }
    if (error instanceof SyntaxError) return []
    throw error
  }
}

async function writeAll(records) {
  if (redisConfig()) {
    await redisCommand(['SET', REDIS_KEY, JSON.stringify(records)])
    return
  }
  if (isProduction()) {
    throw new ApiError(
      503,
      'Certificate storage is not configured. Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.',
      'STORAGE_NOT_CONFIGURED',
    )
  }
  await fs.mkdir(DATA_DIR, { recursive: true })
  const tmp = `${DATA_FILE}.${process.pid}.tmp`
  await fs.writeFile(tmp, JSON.stringify(records, null, 2), 'utf8')
  await fs.rename(tmp, DATA_FILE)
}

function safeEqual(a, b) {
  const left = Buffer.from(String(a))
  const right = Buffer.from(String(b))
  if (left.length !== right.length) return false
  return crypto.timingSafeEqual(left, right)
}

export function assertAdmin(req) {
  const configured = process.env.ADMIN_TOKEN || (!isProduction() ? 'nanospark-admin' : '')
  if (!configured) {
    throw new ApiError(
      503,
      'Admin access is not configured. Set the ADMIN_TOKEN environment variable.',
      'ADMIN_NOT_CONFIGURED',
    )
  }
  const header = req.headers?.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7).trim() : ''
  if (!token || !safeEqual(token, configured)) {
    throw new ApiError(401, 'Unauthorized. Enter a valid admin token.', 'UNAUTHORIZED')
  }
}

export function isValidCertificateId(value) {
  return typeof value === 'string' && CERT_ID_PATTERN.test(value)
}

function cleanText(value, max) {
  if (typeof value !== 'string') return ''
  return value.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim().slice(0, max)
}

function validDate(value) {
  if (typeof value !== 'string' || !DATE_PATTERN.test(value)) return false
  const parsed = new Date(`${value}T00:00:00.000Z`)
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value
}

function normalizeDocument(input) {
  if (input === null) return null
  if (!input || typeof input !== 'object') return undefined
  if (input.remove === true) return null

  const name = cleanText(input.name, 200)
  const mime = cleanText(input.mime, 100).toLowerCase()
  let dataBase64 = typeof input.dataBase64 === 'string' ? input.dataBase64.trim() : ''

  if (!dataBase64) {
    throw new ApiError(400, 'Uploaded certificate document is empty.', 'INVALID_DOCUMENT')
  }
  dataBase64 = dataBase64.replace(/^data:[^;]+;base64,/, '')
  if (!ALLOWED_DOCUMENT_TYPES.has(mime)) {
    throw new ApiError(400, 'Certificate document must be a PDF, JPEG, PNG, or WebP file.', 'INVALID_DOCUMENT')
  }
  const buffer = Buffer.from(dataBase64, 'base64')
  if (!buffer.length) {
    throw new ApiError(400, 'Uploaded certificate document is invalid.', 'INVALID_DOCUMENT')
  }
  if (buffer.length > MAX_DOCUMENT_BYTES) {
    throw new ApiError(400, 'Certificate document must be 2 MB or smaller.', 'DOCUMENT_TOO_LARGE')
  }

  return {
    name: name || 'certificate-document',
    mime,
    size: buffer.length,
    dataBase64: buffer.toString('base64'),
  }
}

function validateRecord(input, { partial = false } = {}) {
  const output = {}

  if (!partial || input.id !== undefined) {
    const id = typeof input.id === 'string' ? input.id.trim() : ''
    if (!isValidCertificateId(id)) {
      throw new ApiError(
        400,
        'Certificate ID must be exactly 2 uppercase letters, a hyphen, then 4 digits (example: NS-2026).',
        'INVALID_ID',
      )
    }
    output.id = id
  }

  if (!partial || input.recipientName !== undefined) {
    const recipientName = cleanText(input.recipientName, 120)
    if (!recipientName) {
      throw new ApiError(400, 'Recipient name is required.', 'INVALID_RECIPIENT')
    }
    output.recipientName = recipientName
  }

  if (!partial || input.programName !== undefined) {
    const programName = cleanText(input.programName, 160)
    if (!programName) {
      throw new ApiError(400, 'Program or course name is required.', 'INVALID_PROGRAM')
    }
    output.programName = programName
  }

  if (input.productName !== undefined) {
    output.productName = cleanText(input.productName, 160)
  }

  if (!partial || input.issueDate !== undefined) {
    if (!validDate(input.issueDate)) {
      throw new ApiError(400, 'Issue date must be a valid date in YYYY-MM-DD format.', 'INVALID_DATE')
    }
    output.issueDate = input.issueDate
  }

  if (input.status !== undefined) {
    const status = String(input.status).toLowerCase()
    if (!STATUSES.has(status)) {
      throw new ApiError(400, 'Certificate status must be "verified" or "revoked".', 'INVALID_STATUS')
    }
    output.status = status
  } else if (!partial) {
    output.status = 'verified'
  }

  if (input.document !== undefined) {
    const document = normalizeDocument(input.document)
    if (document !== undefined) output.document = document
  }

  return output
}

export function publicCertificate(record) {
  if (!record) return null
  return {
    id: record.id,
    recipientName: record.recipientName,
    programName: record.programName,
    productName: record.productName || '',
    issueDate: record.issueDate,
    issuingOrganization: 'Nano Spark',
    status: record.status,
  }
}

export function adminCertificate(record) {
  if (!record) return null
  return {
    id: record.id,
    recipientName: record.recipientName,
    programName: record.programName,
    productName: record.productName || '',
    issueDate: record.issueDate,
    status: record.status,
    hasDocument: Boolean(record.document),
    document: record.document
      ? { name: record.document.name, mime: record.document.mime, size: record.document.size }
      : null,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
  }
}

export async function listCertificates(query = '') {
  const records = await readAll()
  const needle = String(query).trim().toLowerCase()
  const filtered = needle
    ? records.filter((record) =>
        [record.id, record.recipientName, record.programName, record.productName, record.status]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(needle)),
      )
    : records
  return filtered
    .slice()
    .sort((a, b) => String(b.updatedAt || '').localeCompare(String(a.updatedAt || '')))
    .map(adminCertificate)
}

export async function getCertificateById(id) {
  const records = await readAll()
  return records.find((record) => record.id === id) || null
}

export async function getCertificateDocument(id) {
  const record = await getCertificateById(id)
  if (!record || !record.document) {
    throw new ApiError(404, 'Certificate document not found.', 'NOT_FOUND')
  }
  return record.document
}

export async function verifyCertificateById(id) {
  if (!isValidCertificateId(id)) {
    throw new ApiError(
      400,
      'Certificate ID must be exactly 2 uppercase letters, a hyphen, then 4 digits (example: NS-2026).',
      'INVALID_ID',
    )
  }
  const record = await getCertificateById(id)
  if (!record) {
    throw new ApiError(
      404,
      'Certificate not found. Please check the Certificate ID and try again.',
      'NOT_FOUND',
    )
  }
  return record
}

export async function createCertificate(input) {
  const data = validateRecord(input)
  const records = await readAll()
  if (records.some((record) => record.id === data.id)) {
    throw new ApiError(409, `Certificate ID ${data.id} already exists.`, 'DUPLICATE_ID')
  }
  const now = new Date().toISOString()
  const record = {
    ...data,
    productName: data.productName || '',
    document: data.document ?? null,
    createdAt: now,
    updatedAt: now,
  }
  records.push(record)
  await writeAll(records)
  return record
}

export async function updateCertificate(id, input) {
  const records = await readAll()
  const index = records.findIndex((record) => record.id === id)
  if (index === -1) {
    throw new ApiError(404, 'Certificate not found.', 'NOT_FOUND')
  }

  const existing = records[index]
  const patch = validateRecord(input, { partial: true })
  const nextId = patch.id ?? existing.id

  if (nextId !== existing.id && records.some((record, i) => i !== index && record.id === nextId)) {
    throw new ApiError(409, `Certificate ID ${nextId} already exists.`, 'DUPLICATE_ID')
  }

  const updated = {
    ...existing,
    ...patch,
    id: nextId,
    productName: patch.productName ?? existing.productName ?? '',
    updatedAt: new Date().toISOString(),
  }
  records[index] = updated
  await writeAll(records)
  return updated
}

export async function deleteCertificate(id) {
  const records = await readAll()
  const index = records.findIndex((record) => record.id === id)
  if (index === -1) {
    throw new ApiError(404, 'Certificate not found.', 'NOT_FOUND')
  }
  const [removed] = records.splice(index, 1)
  await writeAll(records)
  return removed
}
