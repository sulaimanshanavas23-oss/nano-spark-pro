import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  FiAlertTriangle,
  FiCheckCircle,
  FiDownload,
  FiEdit2,
  FiFileText,
  FiLogOut,
  FiPlus,
  FiRefreshCw,
  FiSearch,
  FiShield,
  FiTrash2,
  FiUpload,
  FiX,
  FiXCircle,
} from 'react-icons/fi'
import Page from '../components/Page'
import CircuitBackground from '../components/CircuitBackground'
import { Reveal } from '../components/Reveal'
import {
  AdminCertificate,
  CertificateApiError,
  CertificateDocumentInput,
  CertificateStatus,
  checkAdminToken,
  createAdminCertificate,
  deleteAdminCertificate,
  getAdminCertificateDocument,
  isValidCertificateId,
  listAdminCertificates,
  updateAdminCertificate,
} from '../lib/certificates'

const TOKEN_KEY = 'nanospark_admin_token'

const inputClass =
  'w-full rounded-xl border border-nsBlack/15 bg-nsWhite px-4 py-2.5 text-sm text-nsBlack placeholder:text-nsBlack/40 focus:border-nsYellow focus:outline-none focus:ring-2 focus:ring-nsYellow/40 transition'

const labelClass = 'mb-1.5 block text-xs font-extrabold uppercase tracking-[0.12em] text-nsBlack/55'

interface FormState {
  id: string
  recipientName: string
  programName: string
  productName: string
  issueDate: string
  status: CertificateStatus
}

const EMPTY_FORM: FormState = {
  id: '',
  recipientName: '',
  programName: '',
  productName: '',
  issueDate: new Date().toISOString().slice(0, 10),
  status: 'verified',
}

function formatDate(value: string) {
  const date = new Date(`${value}T00:00:00`)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result || ''))
    reader.onerror = () => reject(new Error('Unable to read the selected file.'))
    reader.readAsDataURL(file)
  })
}

export default function AdminCertificates() {
  const [token, setToken] = useState('')
  const [tokenInput, setTokenInput] = useState('')
  const [authError, setAuthError] = useState('')
  const [authLoading, setAuthLoading] = useState(false)

  const [certificates, setCertificates] = useState<AdminCertificate[]>([])
  const [query, setQuery] = useState('')
  const [listLoading, setListLoading] = useState(false)
  const [listError, setListError] = useState('')

  const [panelOpen, setPanelOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [documentFile, setDocumentFile] = useState<CertificateDocumentInput | null>(null)
  const [existingDocument, setExistingDocument] = useState<{ name: string; mime: string; size: number } | null>(null)
  const [removeDocument, setRemoveDocument] = useState(false)
  const [formError, setFormError] = useState('')
  const [formSaving, setFormSaving] = useState(false)
  const [notice, setNotice] = useState('')
  const [actionError, setActionError] = useState('')

  const stats = useMemo(() => {
    const verified = certificates.filter((item) => item.status === 'verified').length
    return {
      total: certificates.length,
      verified,
      revoked: certificates.length - verified,
    }
  }, [certificates])

  const loadCertificates = useCallback(
    async (activeToken: string, search = '') => {
      setListLoading(true)
      setListError('')
      try {
        const data = await listAdminCertificates(activeToken, search)
        setCertificates(data.certificates)
      } catch (error) {
        if (error instanceof CertificateApiError && error.status === 401) {
          sessionStorage.removeItem(TOKEN_KEY)
          setToken('')
          setAuthError('Your admin session expired. Please sign in again.')
        } else {
          setListError(error instanceof Error ? error.message : 'Unable to load certificates.')
        }
      } finally {
        setListLoading(false)
      }
    },
    [],
  )

  useEffect(() => {
    const stored = sessionStorage.getItem(TOKEN_KEY)
    if (stored) {
      setToken(stored)
      setTokenInput(stored)
      loadCertificates(stored)
    }
  }, [loadCertificates])

  useEffect(() => {
    if (!token) return
    const timer = setTimeout(() => loadCertificates(token, query), 300)
    return () => clearTimeout(timer)
  }, [token, query, loadCertificates])

  const signIn = async (event: FormEvent) => {
    event.preventDefault()
    const candidate = tokenInput.trim()
    if (!candidate) {
      setAuthError('Enter the admin token.')
      return
    }
    setAuthLoading(true)
    setAuthError('')
    try {
      await checkAdminToken(candidate)
      sessionStorage.setItem(TOKEN_KEY, candidate)
      setToken(candidate)
      await loadCertificates(candidate)
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : 'Unable to sign in.')
    } finally {
      setAuthLoading(false)
    }
  }

  const signOut = () => {
    sessionStorage.removeItem(TOKEN_KEY)
    setToken('')
    setTokenInput('')
    setCertificates([])
    setPanelOpen(false)
    setAuthError('')
  }

  const openCreate = () => {
    setEditingId(null)
    setForm(EMPTY_FORM)
    setDocumentFile(null)
    setExistingDocument(null)
    setRemoveDocument(false)
    setFormError('')
    setPanelOpen(true)
  }

  const openEdit = (certificate: AdminCertificate) => {
    setEditingId(certificate.id)
    setForm({
      id: certificate.id,
      recipientName: certificate.recipientName,
      programName: certificate.programName,
      productName: certificate.productName,
      issueDate: certificate.issueDate,
      status: certificate.status,
    })
    setDocumentFile(null)
    setExistingDocument(certificate.document)
    setRemoveDocument(false)
    setFormError('')
    setPanelOpen(true)
  }

  const handleFile = async (file: File | undefined) => {
    setFormError('')
    if (!file) return
    const allowed = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp']
    if (!allowed.includes(file.type)) {
      setFormError('Upload a PDF, JPEG, PNG, or WebP file.')
      return
    }
    if (file.size > 2 * 1024 * 1024) {
      setFormError('Certificate document must be 2 MB or smaller.')
      return
    }
    try {
      const dataBase64 = await fileToBase64(file)
      setDocumentFile({ name: file.name, mime: file.type, dataBase64 })
      setRemoveDocument(false)
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Unable to read the file.')
    }
  }

  const submitForm = async (event: FormEvent) => {
    event.preventDefault()
    setFormError('')

    if (!isValidCertificateId(form.id)) {
      setFormError('Certificate ID must be exactly 2 uppercase letters, a hyphen, then 4 digits (example: NS-2026).')
      return
    }
    if (!form.recipientName.trim()) {
      setFormError('Recipient name is required.')
      return
    }
    if (!form.programName.trim()) {
      setFormError('Program or course name is required.')
      return
    }
    if (!form.issueDate) {
      setFormError('Issue date is required.')
      return
    }

    const payload = {
      ...form,
      recipientName: form.recipientName.trim(),
      programName: form.programName.trim(),
      productName: form.productName.trim(),
      ...(documentFile ? { document: documentFile } : {}),
      ...(removeDocument ? { document: null } : {}),
    }

    setFormSaving(true)
    try {
      if (editingId) {
        await updateAdminCertificate(token, editingId, payload)
        setNotice(`Certificate ${form.id} updated.`)
      } else {
        await createAdminCertificate(token, payload)
        setNotice(`Certificate ${form.id} issued.`)
      }
      setPanelOpen(false)
      await loadCertificates(token, query)
    } catch (error) {
      if (error instanceof CertificateApiError && error.status === 401) {
        signOut()
        setAuthError('Your admin session expired. Please sign in again.')
      } else {
        setFormError(error instanceof Error ? error.message : 'Unable to save the certificate.')
      }
    } finally {
      setFormSaving(false)
    }
  }

  const quickRevoke = async (certificate: AdminCertificate) => {
    if (!window.confirm(`Revoke certificate ${certificate.id}? It will no longer verify as valid.`)) {
      return
    }
    setActionError('')
    try {
      await updateAdminCertificate(token, certificate.id, {
        id: certificate.id,
        recipientName: certificate.recipientName,
        programName: certificate.programName,
        productName: certificate.productName,
        issueDate: certificate.issueDate,
        status: 'revoked',
      })
      setNotice(`Certificate ${certificate.id} revoked.`)
      await loadCertificates(token, query)
    } catch (error) {
      setActionError(error instanceof Error ? error.message : 'Unable to revoke the certificate.')
    }
  }

  const removeCertificate = async (certificate: AdminCertificate) => {
    if (!window.confirm(`Delete certificate ${certificate.id} permanently? This cannot be undone.`)) {
      return
    }
    setActionError('')
    try {
      await deleteAdminCertificate(token, certificate.id)
      setNotice(`Certificate ${certificate.id} deleted.`)
      await loadCertificates(token, query)
    } catch (error) {
      setActionError(error instanceof Error ? error.message : 'Unable to delete the certificate.')
    }
  }

  const openDocument = async (certificate: AdminCertificate) => {
    setActionError('')
    const preview = window.open('', '_blank')
    try {
      const data = await getAdminCertificateDocument(token, certificate.id)
      const binary = atob(data.document.dataBase64)
      const bytes = new Uint8Array(binary.length)
      for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i)
      const blob = new Blob([bytes], { type: data.document.mime })
      const url = URL.createObjectURL(blob)
      if (preview) {
        preview.location.href = url
      } else {
        window.open(url, '_blank', 'noopener,noreferrer')
      }
      setTimeout(() => URL.revokeObjectURL(url), 60000)
    } catch (error) {
      preview?.close()
      setActionError(error instanceof Error ? error.message : 'Unable to open the document.')
    }
  }

  if (!token) {
    return (
      <Page>
        <section className="relative overflow-hidden bg-nsWhite">
          <CircuitBackground variant="light" className="opacity-60" />
          <div className="relative mx-auto max-w-md px-6 py-20 sm:px-8">
            <Reveal>
              <div className="rounded-3xl border border-nsBlack/10 bg-nsWhite p-8 shadow-lift">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-nsYellow text-nsBlack">
                  <FiShield size={26} />
                </span>
                <h1 className="mt-5 font-heading text-3xl font-extrabold text-nsBlack">
                  Admin Sign In
                </h1>
                <p className="mt-2 text-sm text-nsBlack/60">
                  Certificate management is protected. Enter the Nano Spark admin token to continue.
                </p>
                <form onSubmit={signIn} className="mt-6 space-y-4">
                  <div>
                    <label htmlFor="admin-token" className={labelClass}>
                      Admin Token
                    </label>
                    <input
                      id="admin-token"
                      type="password"
                      value={tokenInput}
                      onChange={(event) => setTokenInput(event.target.value)}
                      placeholder="Enter admin token"
                      autoComplete="current-password"
                      className={inputClass}
                    />
                  </div>
                  {authError && (
                    <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                      {authError}
                    </p>
                  )}
                  <button type="submit" disabled={authLoading} className="btn-yellow w-full disabled:opacity-70">
                    {authLoading ? 'Checking…' : 'Sign In'}
                  </button>
                </form>
              </div>
            </Reveal>
          </div>
        </section>
      </Page>
    )
  }

  return (
    <Page>
      <section className="relative overflow-hidden bg-nsWhite">
        <CircuitBackground variant="light" className="opacity-60" />
        <div className="relative mx-auto max-w-6xl px-6 py-12 sm:px-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <span className="section-heading-bullet">
                <span className="text-nsYellow">&#9654;</span> Admin
              </span>
              <h1 className="mt-2 font-heading text-3xl font-extrabold text-nsBlack sm:text-4xl">
                Certificate Management
              </h1>
              <p className="mt-2 text-sm text-nsBlack/60">
                Issue, edit, search, and revoke certificates. Verification always checks these records.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={openCreate} className="btn-yellow">
                <FiPlus /> New Certificate
              </button>
              <button type="button" onClick={signOut} className="btn-outline">
                <FiLogOut /> Sign Out
              </button>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { label: 'Total records', value: stats.total, tone: 'bg-nsBlack text-nsWhite' },
              { label: 'Verified', value: stats.verified, tone: 'bg-green-50 text-green-700' },
              { label: 'Revoked', value: stats.revoked, tone: 'bg-red-50 text-red-600' },
            ].map((item) => (
              <div key={item.label} className={`rounded-2xl border border-nsBlack/10 p-5 shadow-soft ${item.tone}`}>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] opacity-70">
                  {item.label}
                </p>
                <p className="mt-1 font-heading text-3xl font-extrabold">{item.value}</p>
              </div>
            ))}
          </div>

          {(notice || actionError || listError) && (
            <div className="mt-6 space-y-2">
              {notice && (
                <p className="flex items-center gap-2 rounded-xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
                  <FiCheckCircle /> {notice}
                </p>
              )}
              {actionError && (
                <p className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                  <FiAlertTriangle /> {actionError}
                </p>
              )}
              {listError && (
                <p className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                  <FiAlertTriangle /> {listError}
                </p>
              )}
            </div>
          )}

          <div className="mt-8 rounded-3xl border border-nsBlack/10 bg-nsWhite shadow-soft">
            <div className="flex flex-col gap-3 border-b border-nsBlack/10 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full sm:max-w-sm">
                <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-nsBlack/35" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search ID, recipient, program…"
                  className={`${inputClass} pl-10`}
                />
              </div>
              <button
                type="button"
                onClick={() => loadCertificates(token, query)}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-nsBlack/15 px-4 py-2.5 text-sm font-bold text-nsBlack transition-colors hover:bg-nsGray-light"
              >
                <FiRefreshCw className={listLoading ? 'animate-spin' : ''} /> Refresh
              </button>
            </div>

            {listLoading && certificates.length === 0 ? (
              <p className="p-8 text-center text-sm text-nsBlack/50">Loading certificates…</p>
            ) : certificates.length === 0 ? (
              <div className="p-10 text-center">
                <FiFileText className="mx-auto text-nsBlack/25" size={36} />
                <p className="mt-3 font-heading text-lg font-bold text-nsBlack">No certificates found</p>
                <p className="mt-1 text-sm text-nsBlack/55">
                  Issue your first certificate or adjust the search.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-nsBlack/5">
                {certificates.map((certificate) => (
                  <div key={certificate.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-heading text-lg font-extrabold tracking-[0.08em] text-nsBlack">
                          {certificate.id}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.12em] ${
                            certificate.status === 'verified'
                              ? 'bg-green-500/10 text-green-700'
                              : 'bg-red-500/10 text-red-600'
                          }`}
                        >
                          {certificate.status === 'verified' ? <FiCheckCircle /> : <FiXCircle />}
                          {certificate.status}
                        </span>
                        {certificate.hasDocument && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-nsYellow/20 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.12em] text-nsBlack/70">
                            <FiFileText /> Document
                          </span>
                        )}
                      </div>
                      <p className="mt-1 truncate text-sm font-semibold text-nsBlack">
                        {certificate.recipientName}
                      </p>
                      <p className="truncate text-xs text-nsBlack/55">
                        {certificate.programName}
                        {certificate.productName ? ` · ${certificate.productName}` : ''}
                      </p>
                    </div>
                    <div className="flex shrink-0 flex-wrap items-center gap-2">
                      <span className="mr-1 text-xs font-semibold text-nsBlack/45">
                        {formatDate(certificate.issueDate)}
                      </span>
                      {certificate.hasDocument && (
                        <button
                          type="button"
                          onClick={() => openDocument(certificate)}
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-nsBlack/15 text-nsBlack transition-colors hover:bg-nsGray-light"
                          aria-label={`Open document for ${certificate.id}`}
                          title="Open document"
                        >
                          <FiDownload size={16} />
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => openEdit(certificate)}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-nsBlack/15 text-nsBlack transition-colors hover:bg-nsGray-light"
                        aria-label={`Edit ${certificate.id}`}
                        title="Edit"
                      >
                        <FiEdit2 size={16} />
                      </button>
                      {certificate.status === 'verified' && (
                        <button
                          type="button"
                          onClick={() => quickRevoke(certificate)}
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 text-red-500 transition-colors hover:bg-red-50"
                          aria-label={`Revoke ${certificate.id}`}
                          title="Revoke"
                        >
                          <FiXCircle size={16} />
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => removeCertificate(certificate)}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-nsBlack/15 text-nsBlack/50 transition-colors hover:bg-red-50 hover:text-red-500"
                        aria-label={`Delete ${certificate.id}`}
                        title="Delete"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {panelOpen && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-nsBlack/60 p-4 backdrop-blur-sm sm:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPanelOpen(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={editingId ? 'Edit certificate' : 'Issue certificate'}
              className="my-6 w-full max-w-2xl rounded-3xl bg-nsWhite p-6 shadow-lift sm:p-8"
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-heading text-2xl font-extrabold text-nsBlack">
                    {editingId ? `Edit ${editingId}` : 'Issue New Certificate'}
                  </h2>
                  <p className="mt-1 text-xs text-nsBlack/55">
                    A certificate is only verifiable when a matching record exists and its status is Verified.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setPanelOpen(false)}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-nsGray-light text-nsBlack"
                  aria-label="Close"
                >
                  <FiX />
                </button>
              </div>

              <form onSubmit={submitForm} className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="cert-id" className={labelClass}>
                      Certificate ID
                    </label>
                    <input
                      id="cert-id"
                      value={form.id}
                      onChange={(event) => setForm({ ...form, id: event.target.value })}
                      placeholder="NS-2026"
                      maxLength={7}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="cert-date" className={labelClass}>
                      Issue Date
                    </label>
                    <input
                      id="cert-date"
                      type="date"
                      value={form.issueDate}
                      onChange={(event) => setForm({ ...form, issueDate: event.target.value })}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="cert-recipient" className={labelClass}>
                      Recipient Name
                    </label>
                    <input
                      id="cert-recipient"
                      value={form.recipientName}
                      onChange={(event) => setForm({ ...form, recipientName: event.target.value })}
                      placeholder="Student name"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="cert-status" className={labelClass}>
                      Status
                    </label>
                    <select
                      id="cert-status"
                      value={form.status}
                      onChange={(event) =>
                        setForm({ ...form, status: event.target.value as CertificateStatus })
                      }
                      className={inputClass}
                    >
                      <option value="verified">Verified</option>
                      <option value="revoked">Revoked</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="cert-program" className={labelClass}>
                      Program / Course Name
                    </label>
                    <input
                      id="cert-program"
                      value={form.programName}
                      onChange={(event) => setForm({ ...form, programName: event.target.value })}
                      placeholder="e.g. Nano Spark Robotics Workshop"
                      className={inputClass}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="cert-product" className={labelClass}>
                      Product / Project Name <span className="font-normal normal-case tracking-normal text-nsBlack/40">(optional)</span>
                    </label>
                    <input
                      id="cert-product"
                      value={form.productName}
                      onChange={(event) => setForm({ ...form, productName: event.target.value })}
                      placeholder="e.g. WiFi Controlled Car – STEM Project Kit"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="rounded-2xl border border-dashed border-nsBlack/20 bg-nsGray-light p-4">
                  <p className={labelClass}>Certificate Document</p>
                  {(documentFile || (existingDocument && !removeDocument)) && (
                    <div className="mb-3 flex items-center justify-between gap-3 rounded-xl bg-nsWhite px-3 py-2">
                      <span className="flex min-w-0 items-center gap-2 text-xs font-semibold text-nsBlack">
                        <FiFileText className="shrink-0 text-nsYellow" />
                        <span className="truncate">
                          {documentFile ? documentFile.name : existingDocument?.name}
                        </span>
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setDocumentFile(null)
                          setRemoveDocument(true)
                        }}
                        className="text-xs font-bold text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-nsBlack px-4 py-2.5 text-sm font-bold text-nsWhite transition-colors hover:bg-nsYellow hover:text-nsBlack">
                    <FiUpload /> Upload PDF / image
                    <input
                      type="file"
                      accept="application/pdf,image/jpeg,image/png,image/webp"
                      className="sr-only"
                      onChange={(event) => handleFile(event.target.files?.[0])}
                    />
                  </label>
                  <p className="mt-2 text-[11px] text-nsBlack/45">
                    Max 2 MB. Stored privately; only admins can open it. Uploading a file does not by itself make a certificate valid.
                  </p>
                </div>

                {formError && (
                  <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                    {formError}
                  </p>
                )}

                <div className="flex flex-wrap justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setPanelOpen(false)}
                    className="rounded-xl border border-nsBlack/15 px-5 py-2.5 font-heading font-bold text-nsBlack transition-colors hover:bg-nsGray-light"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={formSaving}
                    className="btn-yellow disabled:opacity-70"
                  >
                    {formSaving ? 'Saving…' : editingId ? 'Save Changes' : 'Issue Certificate'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Page>
  )
}
