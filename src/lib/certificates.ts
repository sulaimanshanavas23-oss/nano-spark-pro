export const CERTIFICATE_ID_PATTERN = /^[A-Z]{2}-[0-9]{4}$/

export type CertificateStatus = 'verified' | 'revoked'

export interface VerifiedCertificate {
  id: string
  recipientName: string
  programName: string
  productName: string
  issueDate: string
  issuingOrganization: string
  status: CertificateStatus
}

export interface VerifyCertificateResponse {
  verified: boolean
  revoked: boolean
  certificate: VerifiedCertificate
}

export interface CertificateDocumentMeta {
  name: string
  mime: string
  size: number
}

export interface AdminCertificate {
  id: string
  recipientName: string
  programName: string
  productName: string
  issueDate: string
  status: CertificateStatus
  hasDocument: boolean
  document: CertificateDocumentMeta | null
  createdAt: string
  updatedAt: string
}

export interface CertificateDocumentInput {
  name: string
  mime: string
  dataBase64: string
}

export interface CertificateInput {
  id: string
  recipientName: string
  programName: string
  productName?: string
  issueDate: string
  status: CertificateStatus
  document?: CertificateDocumentInput | null
}

const API_BASE = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, '') ?? ''

export class CertificateApiError extends Error {
  status: number
  code: string

  constructor(message: string, status = 0, code = 'REQUEST_FAILED') {
    super(message)
    this.name = 'CertificateApiError'
    this.status = status
    this.code = code
  }
}

async function request<T>(
  path: string,
  options: RequestInit = {},
  token?: string,
): Promise<T> {
  const headers = new Headers(options.headers)
  if (options.body) headers.set('Content-Type', 'application/json')
  if (token) headers.set('Authorization', `Bearer ${token}`)

  let response: Response
  try {
    response = await fetch(`${API_BASE}${path}`, { ...options, headers })
  } catch {
    throw new CertificateApiError(
      'Unable to reach the certificate service. Please check your connection and try again.',
      0,
      'NETWORK_ERROR',
    )
  }

  let data: unknown = null
  try {
    data = await response.json()
  } catch {
    data = null
  }

  if (!response.ok) {
    const payload = (data ?? {}) as { error?: string; code?: string }
    throw new CertificateApiError(
      payload.error || 'The certificate service returned an error. Please try again.',
      response.status,
      payload.code || 'REQUEST_FAILED',
    )
  }

  return data as T
}

export function isValidCertificateId(value: string): boolean {
  return CERTIFICATE_ID_PATTERN.test(value)
}

export function verifyCertificate(id: string): Promise<VerifyCertificateResponse> {
  return request<VerifyCertificateResponse>(
    `/api/certificates/verify?id=${encodeURIComponent(id)}`,
  )
}

export function checkAdminToken(token: string): Promise<{ ok: boolean }> {
  return request<{ ok: boolean }>('/api/admin/session', {}, token)
}

export function listAdminCertificates(
  token: string,
  query = '',
): Promise<{ certificates: AdminCertificate[] }> {
  const suffix = query ? `?q=${encodeURIComponent(query)}` : ''
  return request<{ certificates: AdminCertificate[] }>(
    `/api/admin/certificates${suffix}`,
    {},
    token,
  )
}

export function createAdminCertificate(
  token: string,
  input: CertificateInput,
): Promise<{ certificate: AdminCertificate }> {
  return request<{ certificate: AdminCertificate }>(
    '/api/admin/certificates',
    { method: 'POST', body: JSON.stringify(input) },
    token,
  )
}

export function updateAdminCertificate(
  token: string,
  originalId: string,
  input: CertificateInput,
): Promise<{ certificate: AdminCertificate }> {
  return request<{ certificate: AdminCertificate }>(
    `/api/admin/certificates/item?id=${encodeURIComponent(originalId)}`,
    { method: 'PUT', body: JSON.stringify(input) },
    token,
  )
}

export function deleteAdminCertificate(
  token: string,
  id: string,
): Promise<{ deleted: boolean; id: string }> {
  return request<{ deleted: boolean; id: string }>(
    `/api/admin/certificates/item?id=${encodeURIComponent(id)}`,
    { method: 'DELETE' },
    token,
  )
}

export function getAdminCertificateDocument(
  token: string,
  id: string,
): Promise<{ id: string; document: CertificateDocumentInput & { size: number } }> {
  return request<{ id: string; document: CertificateDocumentInput & { size: number } }>(
    `/api/admin/certificates/document?id=${encodeURIComponent(id)}`,
    {},
    token,
  )
}
