import { memo } from 'react'
import type { ArabicNameSvgSettings } from './arabicNameSvg'
import { buildArabicNameSvgString } from './arabicNameSvg'

type PreviewProps = ArabicNameSvgSettings & {
  className?: string
}

export const Preview = memo(function Preview({
  text,
  fontFamily,
  fontSize,
  letterSpacingPx,
  stretchX,
  color,
  className,
}: PreviewProps) {
  const svgMarkup = buildArabicNameSvgString({
    text,
    fontFamily,
    fontSize,
    letterSpacingPx,
    stretchX,
    color,
  })

  return (
    <div
      className={[
        'w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm',
        className ?? '',
      ].join(' ')}
    >
      <div className="relative w-full h-[360px] sm:h-[420px] lg:h-[520px] p-3 flex items-center justify-center">
        <div
          className="w-full h-full"
          // Rendering is based on SVG text shaping provided by the browser + selected Arabic fonts.
          // We use `dangerouslySetInnerHTML` so the preview matches the downloaded SVG exactly.
          dangerouslySetInnerHTML={{ __html: svgMarkup }}
        />
      </div>
    </div>
  )
})

