import { FormEvent, useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import {
  FiAlertTriangle,
  FiArrowRight,
  FiCheckCircle,
  FiFileText,
  FiImage,
  FiPrinter,
  FiSearch,
  FiShield,
  FiUpload,
  FiX,
  FiXCircle,
} from 'react-icons/fi'
import Page from '../components/Page'
import CircuitBackground from '../components/CircuitBackground'
import Confetti from '../components/Confetti'
import { Reveal } from '../components/Reveal'
import { LetterReveal } from '../components/LetterReveal'
import { SITE } from '../lib/site'
import {
  CertificateApiError,
  VerifiedCertificate,
  isValidCertificateId,
  verifyCertificate,
} from '../lib/certificates'

type Result =
  | { kind: 'verified'; certificate: VerifiedCertificate }
  | { kind: 'revoked'; certificate: VerifiedCertificate }
  | { kind: 'error'; message: string }
  | null

const inputClass =
  'w-full rounded-xl border border-nsBlack/15 bg-nsWhite px-4 py-3.5 font-heading text-lg font-bold tracking-[0.12em] text-nsBlack placeholder:font-body placeholder:text-sm placeholder:font-normal placeholder:tracking-normal placeholder:text-nsBlack/40 focus:border-nsYellow focus:outline-none focus:ring-2 focus:ring-nsYellow/40 transition'

const INVALID_FORMAT =
  'Invalid Certificate ID. Use exactly 2 uppercase letters, a hyphen, then 4 digits (example: NS-2026).'

const MAX_UPLOAD_BYTES = 5 * 1024 * 1024

function formatDate(value: string) {
  const date = new Date(`${value}T00:00:00`)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-nsGray-light px-4 py-3">
      <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-nsBlack/45">
        {label}
      </p>
      <p className="mt-1 font-heading text-base font-bold text-nsBlack">{value}</p>
    </div>
  )
}

export default function VerifyCertificate() {
  const [id, setId] = useState('')
  const [loading, setLoading] = useState(false)
  const [fieldError, setFieldError] = useState('')
  const [result, setResult] = useState<Result>(null)

  const [certificateFile, setCertificateFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [fileError, setFileError] = useState('')
  const [verifiedAt, setVerifiedAt] = useState('')

  const [showConfetti, setShowConfetti] = useState(false)
  const reduceMotion = useReducedMotion()
  const stopConfetti = useCallback(() => setShowConfetti(false), [])

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  const handleCertificateFile = (file: File | undefined) => {
    setFileError('')
    if (!file) return

    const isImage = file.type.startsWith('image/')
    const isPdf = file.type === 'application/pdf'
    if (!isImage && !isPdf) {
      setFileError('Upload a certificate image (JPG, PNG, WebP) or a PDF file.')
      return
    }
    if (file.size > MAX_UPLOAD_BYTES) {
      setFileError('Certificate file must be 5 MB or smaller.')
      return
    }

    setCertificateFile(file)
    setResult(null)
    setShowConfetti(false)
    setPreviewUrl(isImage ? URL.createObjectURL(file) : null)
  }

  const removeCertificateFile = () => {
    setCertificateFile(null)
    setPreviewUrl(null)
    setFileError('')
    setResult(null)
    setShowConfetti(false)
  }

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setResult(null)
    setShowConfetti(false)

    if (fileError) return

    if (!id) {
      setFieldError('Enter a Certificate ID to verify.')
      return
    }
    if (!isValidCertificateId(id)) {
      setFieldError(INVALID_FORMAT)
      return
    }

    setFieldError('')
    setLoading(true)
    try {
      const data = await verifyCertificate(id)
      setVerifiedAt(
        new Date().toLocaleString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
      )
      if (data.certificate.status === 'revoked') {
        setResult({ kind: 'revoked', certificate: data.certificate })
      } else {
        setResult({ kind: 'verified', certificate: data.certificate })
        if (!reduceMotion) setShowConfetti(true)
      }
    } catch (error) {
      if (error instanceof CertificateApiError) {
        if (error.code === 'INVALID_ID') {
          setFieldError(INVALID_FORMAT)
        } else if (error.code === 'NOT_FOUND') {
          setResult({
            kind: 'error',
            message: 'Certificate not found. Please check the Certificate ID and try again.',
          })
        } else {
          setResult({ kind: 'error', message: error.message })
        }
      } else {
        setResult({
          kind: 'error',
          message: 'Something went wrong while verifying. Please try again.',
        })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Page>
      {showConfetti && <Confetti onDone={stopConfetti} />}

      <section className="relative overflow-hidden bg-nsWhite">
        <CircuitBackground variant="light" className="opacity-60" />
        <div className="relative mx-auto max-w-4xl px-6 py-16 text-center sm:px-8 lg:py-20">
          <Reveal>
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-nsYellow text-nsBlack shadow-soft">
              <FiShield size={30} />
            </span>
            <span className="section-heading-bullet mt-5 justify-center">
              <span className="text-nsYellow">&#9654;</span> Certificate Verification
            </span>
            <h1 className="mt-3 font-heading text-4xl font-extrabold text-nsBlack sm:text-5xl">
              <LetterReveal
                texts={[
                  { text: 'Verify a' },
                  { text: 'Nano Spark', color: 'text-nsYellow' },
                  { text: 'Certificate' },
                ]}
              />
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-nsBlack/70">
              Enter the Certificate ID printed on a Nano Spark certificate and upload the certificate
              image to confirm that it was issued by us and is currently valid.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-nsGray-light py-16">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <Reveal>
            <form
              onSubmit={onSubmit}
              noValidate
              className="rounded-3xl border border-nsBlack/10 bg-nsWhite p-6 shadow-lift sm:p-8"
            >
              <label htmlFor="certificate-id" className="text-sm font-extrabold text-nsBlack">
                Certificate ID
              </label>
              <p className="mt-1 text-xs text-nsBlack/50">
                Format: <span className="font-bold text-nsBlack/70">AA-0000</span> — two uppercase
                letters, a hyphen, four digits.
              </p>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <FiSearch
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-nsBlack/35"
                    size={18}
                  />
                  <input
                    id="certificate-id"
                    name="certificate-id"
                    value={id}
                    onChange={(event) => {
                      setId(event.target.value)
                      setFieldError('')
                      setResult(null)
                      setShowConfetti(false)
                    }}
                    placeholder="Enter Certificate ID (e.g. NS-2026)"
                    autoComplete="off"
                    spellCheck={false}
                    maxLength={7}
                    aria-invalid={Boolean(fieldError)}
                    aria-describedby={fieldError ? 'certificate-error' : undefined}
                    className={`${inputClass} pl-11`}
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  disabled={loading}
                  className="btn-yellow shrink-0 px-7 py-3.5 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? 'VERIFYING…' : 'VERIFY NOW'}
                </motion.button>
              </div>

              <div className="mt-5 rounded-2xl border border-dashed border-nsBlack/20 bg-nsGray-light p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="flex items-center gap-2 text-sm font-extrabold text-nsBlack">
                      <FiImage className="text-nsYellow" />
                      Upload certificate image
                      <span className="font-normal text-nsBlack/45">(optional)</span>
                    </p>
                    <p className="mt-1 max-w-md text-xs text-nsBlack/50">
                      Shown with your verified result. Your file stays in your browser and is never
                      uploaded to our servers.
                    </p>
                  </div>
                  <label className="inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl bg-nsBlack px-4 py-2.5 text-sm font-bold text-nsWhite transition-colors hover:bg-nsYellow hover:text-nsBlack">
                    <FiUpload /> Choose file
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      className="sr-only"
                      onChange={(event) => handleCertificateFile(event.target.files?.[0])}
                    />
                  </label>
                </div>

                {certificateFile && (
                  <div className="mt-4 rounded-xl border border-nsBlack/10 bg-nsWhite p-3">
                    <div className="flex items-center justify-between gap-3">
                      <span className="flex min-w-0 items-center gap-2 text-xs font-bold text-nsBlack">
                        <FiFileText className="shrink-0 text-nsYellow" />
                        <span className="truncate">{certificateFile.name}</span>
                      </span>
                      <button
                        type="button"
                        onClick={removeCertificateFile}
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-nsGray-light text-nsBlack/60 transition-colors hover:bg-red-50 hover:text-red-500"
                        aria-label="Remove uploaded certificate"
                      >
                        <FiX size={14} />
                      </button>
                    </div>
                    {previewUrl && (
                      <div className="mt-3 flex max-h-56 justify-center overflow-hidden rounded-lg bg-nsGray-light p-2">
                        <img
                          src={previewUrl}
                          alt="Uploaded certificate preview"
                          className="max-h-52 w-auto max-w-full object-contain"
                        />
                      </div>
                    )}
                  </div>
                )}

                {fileError && (
                  <p role="alert" className="mt-3 flex items-start gap-2 rounded-xl bg-red-50 px-3 py-2 text-xs font-semibold text-red-600">
                    <FiAlertTriangle className="mt-0.5 shrink-0" />
                    {fileError}
                  </p>
                )}
              </div>

              {fieldError && (
                <p
                  id="certificate-error"
                  role="alert"
                  className="mt-3 flex items-start gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600"
                >
                  <FiAlertTriangle className="mt-0.5 shrink-0" />
                  {fieldError}
                </p>
              )}
            </form>
          </Reveal>

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-8"
            >
              {result.kind === 'verified' && (
                <div
                  id="certificate-print"
                  className="overflow-hidden rounded-3xl border-2 border-green-500/40 bg-nsWhite shadow-lift"
                >
                  <div className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-nsYellow/15 px-6 py-7 sm:px-8">
                    <div
                      className="pointer-events-none absolute -right-10 -top-12 h-36 w-36 rounded-full bg-nsYellow/25 blur-2xl"
                      aria-hidden="true"
                    />
                    <div className="relative flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
                      <motion.div
                        initial={{ scale: 0, rotate: -20 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 220, damping: 16, delay: 0.1 }}
                        className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-4 border-green-500 bg-white text-green-600 shadow-soft"
                      >
                        <FiCheckCircle size={38} />
                        <span className="absolute -bottom-2 rounded-full bg-green-500 px-2 py-0.5 text-[8px] font-extrabold uppercase tracking-[0.16em] text-white">
                          Verified
                        </span>
                      </motion.div>
                      <div className="flex-1">
                        <p className="font-heading text-2xl font-extrabold text-green-700 sm:text-3xl">
                          Congratulations!
                        </p>
                        <p className="mt-1 font-heading text-lg font-bold text-nsBlack">
                          You have verified your certificate.
                        </p>
                        <p className="mt-1 text-sm text-nsBlack/60">
                          Certificate ID <span className="font-bold text-nsBlack">{result.certificate.id}</span>{' '}
                          matched the official Nano Spark registry.
                        </p>
                      </div>
                      <img
                        src={SITE.logo}
                        alt="Nano Spark"
                        className="h-14 w-14 shrink-0 object-contain"
                      />
                    </div>
                  </div>

                  <div className="p-6 sm:p-8">
                    <div className="flex flex-col items-start justify-between gap-3 border-b border-nsBlack/10 pb-5 sm:flex-row sm:items-center">
                      <div>
                        <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-nsBlack/45">
                          Certificate ID
                        </p>
                        <p className="font-heading text-3xl font-extrabold tracking-[0.12em] text-nsBlack">
                          {result.certificate.id}
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.16em] text-green-700">
                        <span className="h-2 w-2 rounded-full bg-green-500" />
                        Verified
                      </span>
                    </div>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      <DetailRow label="Recipient Name" value={result.certificate.recipientName} />
                      <DetailRow label="Program / Course" value={result.certificate.programName} />
                      <DetailRow
                        label="Product / Project"
                        value={result.certificate.productName || 'Not applicable'}
                      />
                      <DetailRow label="Issue Date" value={formatDate(result.certificate.issueDate)} />
                      <DetailRow
                        label="Issuing Organization"
                        value={result.certificate.issuingOrganization}
                      />
                      <DetailRow label="Certificate Status" value="Verified" />
                    </div>

                    {(previewUrl || certificateFile) && (
                      <div className="mt-6 rounded-2xl border border-nsBlack/10 bg-nsGray-light p-4">
                        <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-nsBlack/45">
                          Uploaded Certificate
                        </p>
                        {previewUrl ? (
                          <div className="mt-3 flex max-h-80 justify-center overflow-hidden rounded-xl bg-white p-3">
                            <img
                              src={previewUrl}
                              alt={`Uploaded certificate ${result.certificate.id}`}
                              className="max-h-72 w-auto max-w-full object-contain"
                            />
                          </div>
                        ) : (
                          <p className="mt-2 flex items-center gap-2 text-sm font-bold text-nsBlack">
                            <FiFileText className="text-nsYellow" />
                            {certificateFile?.name}
                          </p>
                        )}
                      </div>
                    )}

                    <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-nsBlack/10 pt-5">
                      <div>
                        <p className="text-xs text-nsBlack/50">
                          Verified live against the Nano Spark certificate registry.
                        </p>
                        {verifiedAt && (
                          <p className="mt-1 text-[11px] text-nsBlack/40">Checked on {verifiedAt}</p>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => window.print()}
                        className="btn-dark px-4 py-2.5 text-sm print:hidden"
                      >
                        <FiPrinter /> Print Verification
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {result.kind === 'revoked' && (
                <div className="overflow-hidden rounded-3xl border-2 border-red-400/50 bg-nsWhite shadow-lift">
                  <div className="flex flex-col items-center gap-3 bg-red-50 px-6 py-6 text-center sm:flex-row sm:text-left">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-red-500 text-white">
                      <FiXCircle size={30} />
                    </span>
                    <div>
                      <p className="font-heading text-2xl font-extrabold text-red-700">
                        Certificate Revoked
                      </p>
                      <p className="text-sm font-semibold text-red-700/80">
                        This certificate exists in our records but is no longer valid.
                      </p>
                    </div>
                  </div>
                  <div className="grid gap-3 p-6 sm:grid-cols-2 sm:p-8">
                    <DetailRow label="Certificate ID" value={result.certificate.id} />
                    <DetailRow label="Status" value="Revoked" />
                    <DetailRow label="Recipient Name" value={result.certificate.recipientName} />
                    <DetailRow label="Program / Course" value={result.certificate.programName} />
                  </div>
                </div>
              )}

              {result.kind === 'error' && (
                <div
                  role="alert"
                  className="flex flex-col items-center gap-3 rounded-3xl border-2 border-nsBlack/15 bg-nsWhite px-6 py-10 text-center shadow-soft"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
                    <FiAlertTriangle size={28} />
                  </span>
                  <p className="font-heading text-xl font-extrabold text-nsBlack">
                    Verification unsuccessful
                  </p>
                  <p className="max-w-md text-sm text-nsBlack/65">{result.message}</p>
                </div>
              )}
            </motion.div>
          )}

          <Reveal delay={0.1}>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                {
                  icon: <FiSearch />,
                  title: 'Enter the ID',
                  text: 'Type the ID exactly as printed on the certificate.',
                },
                {
                  icon: <FiShield />,
                  title: 'We check our registry',
                  text: 'The ID is matched against real issued certificate records.',
                },
                {
                  icon: <FiCheckCircle />,
                  title: 'See the status',
                  text: 'Verified, revoked, or not found — clearly shown.',
                },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-nsBlack/10 bg-nsWhite p-5 shadow-soft">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-nsYellow text-nsBlack">
                    {item.icon}
                  </span>
                  <p className="mt-3 font-heading font-extrabold text-nsBlack">{item.title}</p>
                  <p className="mt-1 text-xs text-nsBlack/60">{item.text}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="mt-10 text-center">
            <p className="text-sm text-nsBlack/60">
              Need help with a certificate?{' '}
              <Link to="/contact" className="font-bold text-nsBlack underline decoration-nsYellow decoration-2 underline-offset-4">
                Contact Nano Spark
              </Link>
            </p>
            <Link to="/products" className="btn-outline mt-5">
              Explore STEM Kits <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </Page>
  )
}
