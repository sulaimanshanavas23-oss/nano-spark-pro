import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheck,
  FiExternalLink,
  FiShield,
} from 'react-icons/fi'
import Page from '../components/Page'
import CircuitBackground from '../components/CircuitBackground'
import SectionHeading from '../components/SectionHeading'
import ProductImage from '../components/ProductImage'
import { SpecIcon } from '../components/SpecIcon'
import { Reveal } from '../components/Reveal'
import { LetterReveal } from '../components/LetterReveal'
import { getProductBySlug } from '../lib/products'

const STORE_URL = 'https://steamkit.vercel.app?_vercel_share=7ukv0YU8P7vDTkteRArd7b5GBy0Sn411'

export default function ProductDetail() {
  const { slug } = useParams()
  const product = getProductBySlug(slug)

  if (!product) {
    return (
      <Page>
        <section className="relative overflow-hidden bg-nsWhite">
          <CircuitBackground variant="light" className="opacity-60" />
          <div className="relative mx-auto max-w-3xl px-6 py-24 text-center sm:px-8">
            <h1 className="font-heading text-4xl font-extrabold text-nsBlack">
              Kit not found
            </h1>
            <p className="mt-4 text-nsBlack/70">
              The kit you are looking for does not exist. Browse all Nano Spark STEM kits instead.
            </p>
            <Link to="/products" className="btn-yellow mt-8">
              <FiArrowLeft /> Back to Products
            </Link>
          </div>
        </section>
      </Page>
    )
  }

  return (
    <Page>
      <section className="relative overflow-hidden bg-nsWhite">
        <CircuitBackground variant="light" className="opacity-60" />
        <div className="relative mx-auto max-w-6xl px-6 py-14 sm:px-8 lg:py-20">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm font-bold text-nsBlack/60 transition-colors hover:text-nsBlack"
          >
            <FiArrowLeft /> All STEM Kits
          </Link>

          <div className="mt-8 grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="relative rounded-[2rem] border-2 border-nsBlack/10 bg-white p-2 shadow-lift sm:p-3"
              >
                <div
                  className="absolute -inset-4 rounded-[2.5rem] bg-nsYellow/15 blur-2xl"
                  aria-hidden="true"
                />
                <ProductImage
                  src={product.image}
                  alt={product.imageAlt}
                  className="relative border-0 bg-nsGray-light"
                />
                <span className="absolute left-5 top-5 rounded-full bg-nsYellow px-3 py-1 font-heading text-[10px] font-extrabold tracking-[0.16em] text-nsBlack shadow-soft">
                  STEM PROJECT KIT
                </span>
              </motion.div>
            </Reveal>

            <Reveal delay={0.1}>
              <span className="section-heading-bullet">
                <span className="text-nsYellow">&#9654;</span> {product.tagline}
              </span>
              <h1 className="mt-3 font-heading text-4xl font-extrabold leading-tight text-nsBlack sm:text-5xl">
                <LetterReveal
                  texts={[
                    { text: product.name },
                    { text: 'STEM Project Kit', color: 'text-nsYellow' },
                  ]}
                />
              </h1>
              <p className="mt-5 text-base leading-relaxed text-nsBlack/70">
                {product.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={STORE_URL}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn-yellow"
                >
                  Shop This Kit <FiExternalLink />
                </a>
                <Link to="/contact" className="btn-outline">
                  Enquire <FiArrowRight />
                </Link>
                <Link to="/verify-certificate" className="btn-dark">
                  <FiShield /> Verify Certificate
                </Link>
              </div>

              <div className="mt-8 rounded-2xl border border-nsBlack/10 bg-nsGray-light p-5">
                <p className="font-heading text-lg font-extrabold text-nsBlack">
                  What you will learn
                </p>
                <ul className="mt-3 space-y-2">
                  {product.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-nsBlack/70">
                      <FiCheck className="mt-0.5 shrink-0 text-nsYellow" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-nsGray-light py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <SectionHeading
            eyebrow="Specifications"
            title="Inside the"
            highlight={product.name}
            subtitle="Every component and capability included in this Nano Spark STEM Project Kit."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {product.specs.map((spec, i) => (
              <Reveal key={spec.label} delay={(i % 3) * 0.08}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="flex h-full items-center gap-4 rounded-2xl border border-nsBlack/10 bg-nsWhite p-5 shadow-soft"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-nsYellow text-nsBlack">
                    <SpecIcon icon={spec.icon} size={22} />
                  </span>
                  <p className="font-heading text-base font-bold leading-snug text-nsBlack">
                    {spec.label}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-nsBlack py-16">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 text-center sm:px-8 lg:flex-row lg:text-left">
          <div>
            <h2 className="font-heading text-3xl font-extrabold text-nsWhite">
              Ready to build the <span className="text-nsYellow">{product.name}</span>?
            </h2>
            <p className="mt-2 max-w-xl text-nsWhite/70">
              Get the kit, follow the guide, and turn curiosity into a working project.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={STORE_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="btn-yellow"
            >
              Shop This Kit <FiExternalLink />
            </a>
            <Link to="/contact" className="btn-outline border-nsWhite/30 text-nsWhite hover:border-nsYellow hover:text-nsBlack">
              Talk to Us <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </Page>
  )
}
