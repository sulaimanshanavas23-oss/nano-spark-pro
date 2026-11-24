import SmartImage from './SmartImage'

interface ProductImageProps {
  src: string
  alt: string
  className?: string
  imgClassName?: string
}

/**
 * Consistent product frame: preserves the full product with object-contain,
 * centered, with breathing room. Never crops or stretches the kit.
 */
export default function ProductImage({
  src,
  alt,
  className = '',
  imgClassName = '',
}: ProductImageProps) {
  return (
    <div
      className={`product-image-container relative flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-2xl border border-nsBlack/10 bg-white p-4 sm:p-6 ${className}`}
    >
      <SmartImage
        src={src}
        alt={alt}
        className={`h-full w-full object-contain object-center ${imgClassName}`}
      />
    </div>
  )
}
