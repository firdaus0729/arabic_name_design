export type ArabicNameSvgSettings = {
  text: string
  fontFamily: string
  fontSize: number
  letterSpacingPx: number
  stretchX: number
  color: string
}

const VIEW_WIDTH = 1200
const VIEW_HEIGHT = 420
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
  fontSize,
  letterSpacingPx,
  stretchX,
  color,
}: ArabicNameSvgSettings) {
  const safeText = text.trim().length ? text : 'اسمك'
  const escapedText = escapeXml(safeText)

  // NOTE: `scaleX()` is applied to the whole text group to achieve a "horizontal stretch".
  const groupTransform = `translate(${CENTER_X} ${CENTER_Y}) scaleX(${stretchX}) translate(${-CENTER_X} ${-CENTER_Y})`

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Arabic name preview">
  <rect x="0" y="0" width="${VIEW_WIDTH}" height="${VIEW_HEIGHT}" fill="transparent"/>
  <g transform="${groupTransform}">
    <text
      x="${CENTER_X}"
      y="${CENTER_Y}"
      text-anchor="middle"
      dominant-baseline="middle"
      direction="rtl"
      style="
        font-family: ${fontFamily};
        font-size: ${fontSize}px;
        letter-spacing: ${letterSpacingPx}px;
        fill: ${color};
      "
    >${escapedText}</text>
  </g>
</svg>`
}

