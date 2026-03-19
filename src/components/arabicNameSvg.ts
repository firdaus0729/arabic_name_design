export type DesignToken = {
  id: string
  label: string
  type: 'char' | 'shape' | 'decoration'
  value: string
}

export type TokenStyle = {
  color: string
  scale: number
  rotate: number
  fontSize: number
  strokeColor: string
  strokeWidth: number
  hAlign: 'left' | 'center' | 'right'
  vAlign: 'top' | 'middle' | 'bottom'
  offsetX: number
  offsetY: number
}

export type TokenStyleMap = Record<string, TokenStyle>

export type ArabicNameSvgSettings = {
  tokens: DesignToken[]
  tokenStyles: TokenStyleMap
  fontFamily: string
  letterSpacingPx: number
}

const VIEW_WIDTH = 1200
const VIEW_HEIGHT = 560
const START_X = 100
const BASELINE_Y = VIEW_HEIGHT / 2

function escapeXml(unsafe: string) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export function splitGraphemes(text: string) {
  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    const segmenter = new Intl.Segmenter('ar', { granularity: 'grapheme' })
    return [...segmenter.segment(text)].map((s) => s.segment)
  }
  return Array.from(text)
}

export function buildArabicNameSvgString({
  tokens,
  tokenStyles,
  fontFamily,
  letterSpacingPx,
}: ArabicNameSvgSettings) {
  const safeTokens = tokens.length
    ? tokens
    : [{ id: 'placeholder-0', label: 'ا', type: 'char' as const, value: '' }]

  let cursorX = START_X

  const tokenMarkup = safeTokens
    .map((token) => {
      const style = tokenStyles[token.id] ?? {
        color: '#0f172a',
        scale: 1,
        rotate: 0,
        fontSize: 96,
        strokeColor: '#00000000',
        strokeWidth: 0,
        hAlign: 'center' as const,
        vAlign: 'middle' as const,
        offsetX: 0,
        offsetY: 0,
      }
      const escaped = escapeXml(token.value || ' ')
      const sizePx = style.fontSize * style.scale
      const advance = Math.max(26, sizePx * 0.62 + letterSpacingPx)

      const tokenX = cursorX + style.offsetX
      const tokenY =
        BASELINE_Y +
        style.offsetY +
        (style.vAlign === 'top' ? -24 : style.vAlign === 'bottom' ? 24 : 0)
      const anchor =
        style.hAlign === 'left' ? 'start' : style.hAlign === 'right' ? 'end' : 'middle'
      cursorX += advance

      return `<text
        x="${tokenX}"
        y="${tokenY}"
        text-anchor="${anchor}"
        dominant-baseline="middle"
        direction="rtl"
        unicode-bidi="plaintext"
        font-family="${fontFamily}"
        font-size="${sizePx}px"
        fill="${style.color}"
        stroke="${style.strokeColor}"
        stroke-width="${style.strokeWidth}"
        paint-order="stroke fill"
        transform="rotate(${style.rotate} ${tokenX} ${tokenY})"
      >${escaped}</text>`
    })
    .join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
  <rect x="0" y="0" width="${VIEW_WIDTH}" height="${VIEW_HEIGHT}" fill="#ffffff"/>
  <g>${tokenMarkup}</g>
</svg>`
}

