import { Link } from 'react-router-dom'
import { FiArrowRight, FiCheckCircle, FiShield } from 'react-icons/fi'

export default function CertificateVerifyTab({ className = '' }: { className?: string }) {
  return (
    <section className={`bg-nsWhite py-16 ${className}`}>
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="overflow-hidden rounded-3xl border border-nsBlack/10 bg-nsWhite shadow-soft">
          <div className="flex flex-wrap items-center gap-2 border-b border-nsBlack/10 bg-nsGray-light px-4 py-3 sm:px-5">
            <span className="rounded-t-lg border-b-2 border-nsYellow bg-nsWhite px-4 py-2 font-heading text-sm font-extrabold text-nsBlack shadow-soft">
              Verify Certificate
            </span>
            <span className="text-xs font-semibold text-nsBlack/45">
              Nano Spark certificate registry
            </span>
          </div>

          <div className="flex flex-col items-center justify-between gap-6 p-6 text-center sm:p-8 lg:flex-row lg:text-left">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:text-left">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-nsYellow text-nsBlack">
                <FiShield size={26} />
              </span>
              <div>
                <h2 className="font-heading text-2xl font-extrabold text-nsBlack">
                  Verify a Nano Spark certificate
                </h2>
                <p className="mt-1 max-w-xl text-sm text-nsBlack/60">
                  Enter your certificate ID and upload the certificate image to confirm it instantly
                  against our official registry.
                </p>
                <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-green-700">
                  <FiCheckCircle className="text-green-600" />
                  Live status: Verified, revoked, or not found
                </p>
              </div>
            </div>
            <Link to="/verify-certificate" className="btn-yellow shrink-0">
              Verify Certificate <FiArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
