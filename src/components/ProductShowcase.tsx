import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { FiArrowRight, FiCheck } from 'react-icons/fi'
import SectionHeading from './SectionHeading'
import ProductImage from './ProductImage'
import { SpecIcon } from './SpecIcon'
import { STEM_PRODUCTS, StemProduct } from '../lib/products'

function ShowcaseRow({
  product,
  direction,
  index,
}: {
  product: StemProduct
  direction: 'left' | 'right'
  index: number
}) {
  const reduceMotion = useReducedMotion()
  const imageFirst = direction === 'left'

  return (
    <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-16">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.96 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className={`relative mx-auto w-full max-w-md lg:max-w-none ${
          imageFirst ? 'lg:order-1' : 'lg:order-2'
        }`}
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

      <div className={`text-center lg:text-left ${imageFirst ? 'lg:order-2' : 'lg:order-1'}`}>
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, delay: 0.05 }}
        >
          <span className="section-heading-bullet justify-center lg:justify-start">
            <span className="text-nsYellow">&#9654;</span> Kit {String(index + 1).padStart(2, '0')}
          </span>
          <h3 className="mt-2 font-heading text-3xl font-extrabold leading-tight text-nsBlack sm:text-4xl">
            {product.name}
            <span className="block text-lg font-bold text-nsBlack/55 sm:text-xl">
              STEM Project Kit
            </span>
          </h3>
          <p className="mx-auto mt-4 max-w-xl text-nsBlack/70 lg:mx-0">{product.description}</p>
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
              className="group flex items-center gap-3 rounded-2xl border border-nsBlack/10 bg-nsGray-light px-4 py-3 text-left shadow-soft transition-colors hover:border-nsYellow hover:bg-nsYellow/10"
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
          className="mt-7 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
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

        <div className="mt-16 space-y-20 sm:space-y-28">
          {STEM_PRODUCTS.map((product, index) => (
            <ShowcaseRow
              key={product.slug}
              product={product}
              direction={index % 2 === 0 ? 'left' : 'right'}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
