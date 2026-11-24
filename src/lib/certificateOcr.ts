import {
  CERTIFICATE_ID_PATTERN,
  CertificateApiError,
  verifyCertificate,
  type VerifiedCertificate,
} from './certificates'

export type UploadVerificationResult =
  | { kind: 'verified'; certificate: VerifiedCertificate; detectedId: string }
  | { kind: 'revoked'; certificate: VerifiedCertificate; detectedId: string }
  | { kind: 'unauthorized'; detectedId: string | null; message: string }
  | { kind: 'unreadable'; message: string }

const DIGIT_LOOKALIKES: Record<string, string> = {
  O: '0',
  Q: '0',
  D: '0',
  I: '1',
  L: '1',
  '|': '1',
  Z: '2',
  S: '5',
  B: '8',
  G: '6',
  T: '7',
  A: '4',
}

const LETTER_LOOKALIKES: Record<string, string> = {
  '0': 'O',
  '1': 'I',
  '2': 'Z',
  '3': 'E',
  '4': 'A',
  '5': 'S',
  '6': 'G',
  '7': 'T',
  '8': 'B',
  '9': 'P',
}

function normalizeCandidate(prefix: string, digits: string) {
  const normalizedPrefix = prefix
    .split('')
    .map((char) => LETTER_LOOKALIKES[char] ?? char)
    .join('')
  const normalizedDigits = digits
    .split('')
    .map((char) => DIGIT_LOOKALIKES[char] ?? char)
    .join('')
  return `${normalizedPrefix}-${normalizedDigits}`
}

export function extractCertificateIds(text: string): string[] {
  const normalized = text
    .toUpperCase()
    .replace(/[“”‘’]/g, '')
    .replace(/[—–]/g, '-')

  const ids = new Set<string>()
  const compactPattern = /\b([A-Z0-9]{2})\s*-\s*([A-Z0-9]{4})\b/g
  const spacedDigitsPattern = /\b([A-Z0-9]{2})\s*-\s*([A-Z0-9])\s+([A-Z0-9])\s+([A-Z0-9])\s+([A-Z0-9])\b/g

  for (const match of normalized.matchAll(compactPattern)) {
    ids.add(normalizeCandidate(match[1], match[2]))
  }
  for (const match of normalized.matchAll(spacedDigitsPattern)) {
    ids.add(normalizeCandidate(match[1], match[2] + match[3] + match[4] + match[5]))
  }

  return [...ids].filter((id) => CERTIFICATE_ID_PATTERN.test(id))
}

async function readCertificateImage(
  file: File,
  onProgress?: (progress: number, status: string) => void,
): Promise<string> {
  const { createWorker } = await import('tesseract.js')
  const worker = await createWorker('eng', 1, {
    logger: (message) => {
      if (typeof message.progress === 'number') {
        onProgress?.(message.progress, message.status || 'Reading certificate')
      }
    },
  })

  try {
    const { data } = await worker.recognize(file)
    return data.text || ''
  } finally {
    await worker.terminate()
  }
}

export async function verifyCertificateImage(
  file: File,
  onProgress?: (progress: number, status: string) => void,
): Promise<UploadVerificationResult> {
  let text = ''
  try {
    text = await readCertificateImage(file, onProgress)
  } catch {
    return {
      kind: 'unreadable',
      message:
        'We could not read this image. Please upload a clear, well-lit photo or screenshot of your Nano Spark certificate.',
    }
  }

  const ids = extractCertificateIds(text)
  if (ids.length === 0) {
    return {
      kind: 'unauthorized',
      detectedId: null,
      message:
        'We could not find a Nano Spark certificate ID in this image. Please upload the original certificate issued by Nano Spark.',
    }
  }

  for (const id of ids) {
    try {
      const data = await verifyCertificate(id)
      if (data.certificate.status === 'revoked') {
        return { kind: 'revoked', certificate: data.certificate, detectedId: id }
      }
      return { kind: 'verified', certificate: data.certificate, detectedId: id }
    } catch (error) {
      if (error instanceof CertificateApiError) {
        if (error.code === 'NOT_FOUND' || error.code === 'INVALID_ID') continue
        return {
          kind: 'unreadable',
          message:
            error.code === 'STORAGE_NOT_CONFIGURED'
              ? 'Certificate verification is temporarily unavailable. Please try again later.'
              : error.message,
        }
      }
      return {
        kind: 'unreadable',
        message: 'Something went wrong while verifying. Please try again.',
      }
    }
  }

  return {
    kind: 'unauthorized',
    detectedId: ids[0] ?? null,
    message:
      'This certificate ID is not in the Nano Spark registry. Please upload the original certificate issued by Nano Spark, or contact us if you believe this is an error.',
  }
}
