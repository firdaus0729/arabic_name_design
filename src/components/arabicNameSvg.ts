export type PreviewStylePreset = 'normal' | 'slightStretch' | 'centeredElegant'

export type ArabicNameSvgSettings = {
  text: string
  fontFamily: string
  baseFontSize: number
  textColor: string
  stylePreset: PreviewStylePreset
  letterSpacingPx: number
}

const VIEW_WIDTH = 1200
const VIEW_HEIGHT = 560
const CENTER_X = VIEW_WIDTH / 2
const CENTER_Y = VIEW_HEIGHT / 2

function escapeXml(unsafe: string) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export function buildArabicNameSvgString({
  text,
  fontFamily,
  baseFontSize,
  textColor,
  stylePreset,
  letterSpacingPx,
}: ArabicNameSvgSettings) {
  const safeText = text.trim() || 'اكتب اسمك'
  const escapedText = escapeXml(safeText)

  let fontSize = baseFontSize
  let letterSpacing = letterSpacingPx
  let scaleX = 1
  let y = CENTER_Y

  if (stylePreset === 'slightStretch') {
    scaleX = 1.08
    letterSpacing = 0.8
    fontSize = baseFontSize * 1.02
  } else if (stylePreset === 'centeredElegant') {
    scaleX = 1.03
    letterSpacing = 0.4
    fontSize = baseFontSize * 1.08
    y = CENTER_Y - 6
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
  <rect x="0" y="0" width="${VIEW_WIDTH}" height="${VIEW_HEIGHT}" fill="#ffffff" />
  <g transform="translate(${CENTER_X} ${y}) scale(${scaleX} 1) translate(${-CENTER_X} ${-y})">
    <text
      x="${CENTER_X}"
      y="${y}"
      text-anchor="middle"
      dominant-baseline="middle"
      direction="rtl"
      unicode-bidi="plaintext"
      style="font-family:${fontFamily};font-size:${fontSize}px;letter-spacing:${letterSpacing}px;fill:${textColor};"
    >${escapedText}</text>
  </g>
</svg>`
}

