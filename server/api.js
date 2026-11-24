import {
  ApiError,
  adminCertificate,
  assertAdmin,
  createCertificate,
  deleteCertificate,
  getCertificateById,
  getCertificateDocument,
  listCertificates,
  publicCertificate,
  storageMode,
  updateCertificate,
  verifyCertificateById,
} from './store.js'

const MAX_BODY_BYTES = 5 * 1024 * 1024

function sendJson(res, status, body) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Cache-Control', 'no-store')
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.end(JSON.stringify(body))
}

async function readJsonBody(req) {
  if (req.body !== undefined && req.body !== null) {
    if (typeof req.body === 'object' && !Buffer.isBuffer(req.body)) return req.body
    const raw = Buffer.isBuffer(req.body) ? req.body.toString('utf8') : String(req.body)
    if (!raw) return {}
    try {
      return JSON.parse(raw)
    } catch {
      throw new ApiError(400, 'Invalid JSON body.', 'INVALID_BODY')
    }
  }

  const chunks = []
  let size = 0
  for await (const chunk of req) {
    size += chunk.length
    if (size > MAX_BODY_BYTES) {
      throw new ApiError(413, 'Request body is too large.', 'BODY_TOO_LARGE')
    }
    chunks.push(chunk)
  }
  const raw = Buffer.concat(chunks).toString('utf8')
  if (!raw) return {}
  try {
    return JSON.parse(raw)
  } catch {
    throw new ApiError(400, 'Invalid JSON body.', 'INVALID_BODY')
  }
}

function normalizePath(pathname) {
  if (!pathname) return '/'
  return pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
}

export async function handleApi(req, res) {
  const method = (req.method || 'GET').toUpperCase()

  if (method === 'OPTIONS') {
    res.statusCode = 204
    res.setHeader('Allow', 'GET, POST, PUT, DELETE, OPTIONS')
    res.end()
    return
  }

  let url
  try {
    url = new URL(req.url || '/', 'http://localhost')
  } catch {
    sendJson(res, 400, { error: 'Invalid request URL.' })
    return
  }

  const pathname = normalizePath(url.pathname)

  try {
    if (pathname === '/api/health' && method === 'GET') {
      sendJson(res, 200, { ok: true, service: 'nanospark-certificates', storage: storageMode() })
      return
    }

    if (
      (pathname === '/api/certificates/verify' || pathname === '/api/verify-certificate') &&
      method === 'GET'
    ) {
      const id = url.searchParams.get('id') ?? ''
      if (!id) {
        throw new ApiError(400, 'Enter a Certificate ID to verify.', 'MISSING_ID')
      }
      const record = await verifyCertificateById(id)
      sendJson(res, 200, {
        verified: record.status === 'verified',
        revoked: record.status === 'revoked',
        certificate: publicCertificate(record),
      })
      return
    }

    if (pathname === '/api/admin/session' && method === 'GET') {
      assertAdmin(req)
      sendJson(res, 200, { ok: true })
      return
    }

    if (pathname === '/api/admin/certificates' && method === 'GET') {
      assertAdmin(req)
      const query = url.searchParams.get('q') || ''
      const certificates = await listCertificates(query)
      sendJson(res, 200, { certificates })
      return
    }

    if (pathname === '/api/admin/certificates' && method === 'POST') {
      assertAdmin(req)
      const body = await readJsonBody(req)
      const record = await createCertificate(body)
      sendJson(res, 201, { certificate: adminCertificate(record) })
      return
    }

    if (pathname === '/api/admin/certificates/item' && method === 'GET') {
      assertAdmin(req)
      const id = (url.searchParams.get('id') || '').trim()
      if (!id) throw new ApiError(400, 'Certificate ID is required.', 'MISSING_ID')
      const record = await getCertificateById(id)
      if (!record) throw new ApiError(404, 'Certificate not found.', 'NOT_FOUND')
      sendJson(res, 200, { certificate: adminCertificate(record) })
      return
    }

    if (pathname === '/api/admin/certificates/item' && method === 'PUT') {
      assertAdmin(req)
      const body = await readJsonBody(req)
      const id = (url.searchParams.get('id') || body.originalId || body.id || '').trim()
      if (!id) throw new ApiError(400, 'Certificate ID is required.', 'MISSING_ID')
      const record = await updateCertificate(id, body)
      sendJson(res, 200, { certificate: adminCertificate(record) })
      return
    }

    if (pathname === '/api/admin/certificates/item' && method === 'DELETE') {
      assertAdmin(req)
      const id = (url.searchParams.get('id') || '').trim()
      if (!id) throw new ApiError(400, 'Certificate ID is required.', 'MISSING_ID')
      await deleteCertificate(id)
      sendJson(res, 200, { deleted: true, id })
      return
    }

    if (pathname === '/api/admin/certificates/document' && method === 'GET') {
      assertAdmin(req)
      const id = (url.searchParams.get('id') || '').trim()
      if (!id) throw new ApiError(400, 'Certificate ID is required.', 'MISSING_ID')
      const document = await getCertificateDocument(id)
      sendJson(res, 200, { id, document })
      return
    }

    sendJson(res, 404, { error: 'API endpoint not found.', code: 'ENDPOINT_NOT_FOUND' })
  } catch (error) {
    if (error instanceof ApiError) {
      sendJson(res, error.status, { error: error.message, code: error.code })
      return
    }
    console.error('[nanospark-api]', error)
    sendJson(res, 500, { error: 'Something went wrong. Please try again.', code: 'SERVER_ERROR' })
  }
}
