import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { FiArrowRight, FiCheck, FiShield } from 'react-icons/fi'
import SectionHeading from './SectionHeading'
import ProductImage from './ProductImage'
import { SpecIcon } from './SpecIcon'
import { STEM_PRODUCTS, StemProduct } from '../lib/products'

function useSmallScreen() {
  const [small, setSmall] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(max-width: 1023px)')
    const update = () => setSmall(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  return small
}

function ShowcaseRow({
  product,
  direction,
  index,
}: {
  product: StemProduct
  direction: 'left' | 'right'
  index: number
}) {
  const rowRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const small = useSmallScreen()
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ['start end', 'center center'],
  })

  const distance = small ? 110 : 70
  const tilt = small ? 4 : 15
  const fromX = direction === 'left' ? -distance : distance
  const startX = small ? `${fromX}%` : `${fromX}vw`
  const endX = small ? '0%' : '0vw'

  const x = useTransform(scrollYProgress, [0, 1], [startX, endX])
  const rotateY = useTransform(
    scrollYProgress,
    [0, 1],
    [direction === 'left' ? tilt : -tilt, 0],
  )
  const rotateZ = useTransform(
    scrollYProgress,
    [0, 1],
    [direction === 'left' ? -3 : 3, 0],
  )
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.18, 1], [0.35, 0.8, 1])

  const imageFirst = direction === 'left'

  return (
    <div
      ref={rowRef}
      className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
      style={{ perspective: 1400 }}
    >
      <motion.div
        style={
          reduceMotion
            ? undefined
            : { x, rotateY, rotateZ, scale, opacity, transformStyle: 'preserve-3d' }
        }
        className={`relative ${imageFirst ? 'lg:order-1' : 'lg:order-2'}`}
      >
        <div className="absolute -inset-4 rounded-[2rem] bg-nsYellow/15 blur-2xl" aria-hidden="true" />
        <div className="relative rounded-[2rem] border-2 border-nsBlack/10 bg-white p-2 shadow-lift sm:p-3">
          <ProductImage
            src={product.image}
            alt={product.imageAlt}
            className="border-0 bg-nsGray-light"
          />
          <span className="absolute left-4 top-4 rounded-full bg-nsYellow px-3 py-1 font-heading text-[10px] font-extrabold tracking-[0.16em] text-nsBlack shadow-soft">
            STEM PROJECT KIT
          </span>
        </div>
      </motion.div>

      <div className={imageFirst ? 'lg:order-2' : 'lg:order-1'}>
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, delay: 0.05 }}
        >
          <span className="section-heading-bullet">
            <span className="text-nsYellow">&#9654;</span> Kit {String(index + 1).padStart(2, '0')}
          </span>
          <h3 className="mt-2 font-heading text-3xl font-extrabold leading-tight text-nsBlack sm:text-4xl">
            {product.name}
            <span className="block text-lg font-bold text-nsBlack/55 sm:text-xl">
              STEM Project Kit
            </span>
          </h3>
          <p className="mt-4 max-w-xl text-nsBlack/70">{product.description}</p>
        </motion.div>

        <ul className="mt-7 grid gap-3 sm:grid-cols-2">
          {product.specs.map((spec, i) => (
            <motion.li
              key={spec.label}
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              whileHover={{ y: -4, scale: 1.015 }}
              className="group flex items-center gap-3 rounded-2xl border border-nsBlack/10 bg-nsGray-light px-4 py-3 shadow-soft transition-colors hover:border-nsYellow hover:bg-nsYellow/10"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-nsYellow text-nsBlack transition-transform group-hover:scale-110">
                <SpecIcon icon={spec.icon} size={19} />
              </span>
              <span className="text-sm font-bold leading-snug text-nsBlack">{spec.label}</span>
            </motion.li>
          ))}
        </ul>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-7 flex flex-wrap items-center gap-4"
        >
          <Link to={`/products/${product.slug}`} className="btn-yellow group">
            EXPLORE THIS KIT
            <FiArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
          <span className="inline-flex items-center gap-2 text-xs font-bold text-nsBlack/50">
            <FiCheck className="text-nsYellow" />
            Complete kit · guided build
          </span>
        </motion.div>
      </div>
    </div>
  )
}

export default function ProductShowcase() {
  return (
    <section
      id="innovation-kits"
      className="relative overflow-hidden bg-nsWhite py-20 sm:py-24"
    >
      <div
        className="pointer-events-none absolute -left-32 top-24 h-72 w-72 rounded-full bg-nsYellow/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-24 h-80 w-80 rounded-full bg-nsYellow/15 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-6xl px-6 sm:px-8">
        <SectionHeading
          eyebrow="Nano Spark STEM Project Kits"
          title="EXPLORE OUR"
          highlight="INNOVATION KITS"
          subtitle="From intelligent automation to wireless robotics, turn your ideas into real-world innovations."
        />

        <div className="mt-16 space-y-24 sm:space-y-28">
          {STEM_PRODUCTS.map((product, index) => (
            <ShowcaseRow
              key={product.slug}
              product={product}
              direction={index % 2 === 0 ? 'left' : 'right'}
              index={index}
            />
          ))}
        </div>

        <div className="mt-20 flex flex-col items-center justify-between gap-5 rounded-3xl bg-nsBlack px-6 py-8 text-center shadow-lift sm:px-10 lg:flex-row lg:text-left">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:text-left">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-nsYellow text-nsBlack">
              <FiShield size={26} />
            </span>
            <div>
              <p className="font-heading text-2xl font-extrabold text-nsWhite">
                Earned a Nano Spark certificate?
              </p>
              <p className="mt-1 max-w-xl text-sm text-nsWhite/65">
                Verify it instantly with the Certificate ID printed on your certificate.
              </p>
            </div>
          </div>
          <Link to="/verify-certificate" className="btn-yellow shrink-0">
            Verify Certificate <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  )
}
