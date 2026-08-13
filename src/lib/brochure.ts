/**
 * Nano Spark brochure — 4 pages (as JPEGs in public/images) shown as a
 * flip-through book and downloadable as a single PDF.
 */
export const BROCHURE_PAGES = [
  '/images/DATA.jpeg',
  '/images/data-2.jpg',
  '/images/data-3.jpg',
  '/images/data-4.jpg',
]

interface PdfPage {
  width: number
  height: number
  jpeg: Uint8Array
}

const PAGE_W = 595.28
const PAGE_H = 841.89
const MARGIN = 24
const fmt = (n: number) => String(Math.round(n * 100) / 100)

function base64ToBytes(b64: string): Uint8Array {
  const bin = atob(b64)
  const bytes = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i)
  return bytes
}

async function loadPageJpeg(src: string): Promise<PdfPage> {
  const img = new Image()
  img.src = src
  await new Promise<void>((resolve) => {
    if (img.complete && img.naturalWidth > 0) return resolve()
    img.onload = () => resolve()
    img.onerror = () => resolve()
  })

  const canvas = document.createElement('canvas')
  canvas.width = img.naturalWidth || 1
  canvas.height = img.naturalHeight || 1
  const ctx = canvas.getContext('2d')
  if (ctx) ctx.drawImage(img, 0, 0)

  const dataUrl = canvas.toDataURL('image/jpeg', 0.92)
  return {
    width: canvas.width,
    height: canvas.height,
    jpeg: base64ToBytes(dataUrl.slice(dataUrl.indexOf(',') + 1)),
  }
}

function buildPdfBlob(pages: PdfPage[]): Blob {
  const encoder = new TextEncoder()
  const chunks: Uint8Array[] = []
  const offsets: number[] = [0]
  let pos = 0

  const push = (data: string | Uint8Array) => {
    const bytes = typeof data === 'string' ? encoder.encode(data) : data
    chunks.push(bytes)
    pos += bytes.length
  }
  const pushObject = () => offsets.push(pos)

  // %PDF-1.4 + binary marker
  push(new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x34, 0x0a, 0x25, 0xe2, 0xe3, 0xcf, 0xd3, 0x0a]))

  // Catalog (obj 1) + Pages tree (obj 2)
  pushObject()
  push('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n')
  pushObject()
  const kids = pages.map((_, i) => `${3 + i * 3} 0 R`).join(' ')
  push(`2 0 obj\n<< /Type /Pages /Kids [${kids}] /Count ${pages.length} >>\nendobj\n`)

  // One page per brochure image
  pages.forEach((page, i) => {
    const scale = Math.min((PAGE_W - MARGIN * 2) / page.width, (PAGE_H - MARGIN * 2) / page.height)
    const w = fmt(page.width * scale)
    const h = fmt(page.height * scale)
    const x = fmt((PAGE_W - page.width * scale) / 2)
    const y = fmt((PAGE_H - page.height * scale) / 2)

    const pageId = 3 + i * 3
    const contentId = 4 + i * 3
    const imageId = 5 + i * 3

    pushObject()
    push(
      `${pageId} 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] /Resources << /XObject << /Im0 ${imageId} 0 R >> >> /Contents ${contentId} 0 R >>\nendobj\n`,
    )

    const stream = `q\n${w} 0 0 ${h} ${x} ${y} cm\n/Im0 Do\nQ\n`
    pushObject()
    push(`${contentId} 0 obj\n<< /Length ${stream.length} >>\nstream\n${stream}endstream\nendobj\n`)

    pushObject()
    push(
      `${imageId} 0 obj\n<< /Type /XObject /Subtype /Image /Width ${page.width} /Height ${page.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${page.jpeg.length} >>\nstream\n`,
    )
    push(page.jpeg)
    push('\nendstream\nendobj\n')
  })

  // xref + trailer
  const xrefPos = pos
  const count = offsets.length
  let xref = `xref\n0 ${count}\n`
  xref += '0000000000 65535 f \n'
  for (let i = 1; i < count; i++) {
    xref += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`
  }
  push(xref)
  push(`trailer\n<< /Size ${count} /Root 1 0 R >>\nstartxref\n${xrefPos}\n%%EOF`)

  const merged = new Uint8Array(pos)
  let offset = 0
  for (const chunk of chunks) {
    merged.set(chunk, offset)
    offset += chunk.length
  }
  return new Blob([merged], { type: 'application/pdf' })
}

export async function downloadBrochurePdf(
  onState?: (state: 'idle' | 'loading' | 'done') => void,
): Promise<void> {
  onState?.('loading')
  try {
    const loaded: PdfPage[] = []
    for (const src of BROCHURE_PAGES) {
      loaded.push(await loadPageJpeg(src))
    }
    const blob = buildPdfBlob(loaded)
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'Nano-Spark-Brochure.pdf'
    document.body.appendChild(a)
    a.click()
    a.remove()
    setTimeout(() => URL.revokeObjectURL(url), 3000)
  } finally {
    onState?.('done')
  }
}