import { useMemo, useState } from 'react'
import { ControlsPanel, type FontOption, type ToolPane } from './components/ControlsPanel'
import { Preview } from './components/Preview'
import {
  buildArabicNameSvgString,
  splitGraphemes,
  type DesignToken,
  type TokenStyle,
  type TokenStyleMap,
} from './components/arabicNameSvg'

const FONT_OPTIONS: FontOption[] = [
  { label: 'Amiri', value: 'Amiri, serif' },
  { label: 'Cairo', value: 'Cairo, sans-serif' },
  { label: 'Tajawal', value: 'Tajawal, sans-serif' },
  { label: 'Scheherazade New', value: 'Scheherazade New, serif' },
  { label: 'Noto Naskh Arabic', value: 'Noto Naskh Arabic, serif' },
]

const DEFAULT_TOKEN_STYLE: TokenStyle = {
  color: '#0f172a',
  scale: 1,
  rotate: 0,
  fontSize: 96,
  strokeColor: '#000000',
  strokeWidth: 0,
  hAlign: 'center',
  vAlign: 'middle',
  offsetX: 0,
  offsetY: 0,
}

export default function App() {
  const [tokens, setTokens] = useState<DesignToken[]>([])
  const [nextTokenId, setNextTokenId] = useState(1)
  const [activePane, setActivePane] = useState<ToolPane>('text')
  const [textDraft, setTextDraft] = useState('محمد')
  const [fontFamily, setFontFamily] = useState(FONT_OPTIONS[0]!.value)
  const [letterSpacingPx, setLetterSpacingPx] = useState(2)
  const [shapeDraft, setShapeDraft] = useState('◆')
  const [decorationDraft, setDecorationDraft] = useState('✦')
  const [selectedTokenIds, setSelectedTokenIds] = useState<string[]>([])
  const [tokenStyles, setTokenStyles] = useState<TokenStyleMap>({})

  const tokenIds = useMemo(() => new Set(tokens.map((t) => t.id)), [tokens])
  const selectedIdsNormalized = useMemo(
    () => selectedTokenIds.filter((id) => tokenIds.has(id)),
    [selectedTokenIds, tokenIds],
  )

  const sampleStyle = useMemo(() => {
    const first = selectedIdsNormalized[0]
    if (!first) return DEFAULT_TOKEN_STYLE
    return tokenStyles[first] ?? DEFAULT_TOKEN_STYLE
  }, [selectedIdsNormalized, tokenStyles])

  const svgMarkup = useMemo(
    () =>
      buildArabicNameSvgString({
        tokens,
        tokenStyles,
        fontFamily,
        letterSpacingPx,
      }),
    [tokens, tokenStyles, fontFamily, letterSpacingPx],
  )

  const addText = () => {
    const chars = splitGraphemes(textDraft.trim())
    if (!chars.length) return
    setTokens((prev) => [
      ...prev,
      ...chars.map((char, idx) => ({
        id: `tok-${nextTokenId + idx}`,
        label: `Char`,
        type: 'char' as const,
        value: char,
      })),
    ])
    setNextTokenId((prev) => prev + chars.length)
    setTextDraft('')
  }

  const addShape = () => {
    setTokens((prev) => [
      ...prev,
      { id: `tok-${nextTokenId}`, label: 'Shape', type: 'shape', value: shapeDraft },
    ])
    setNextTokenId((prev) => prev + 1)
  }

  const addDecoration = () => {
    setTokens((prev) => [
      ...prev,
      { id: `tok-${nextTokenId}`, label: 'Decoration', type: 'decoration', value: decorationDraft },
    ])
    setNextTokenId((prev) => prev + 1)
  }

  const toggleToken = (tokenId: string) => {
    setSelectedTokenIds((prev) =>
      prev.includes(tokenId) ? prev.filter((id) => id !== tokenId) : [...prev, tokenId],
    )
  }

  const applyStyleToSelection = (patch: Partial<TokenStyle>) => {
    if (!selectedIdsNormalized.length) return
    setTokenStyles((prev) => {
      const next = { ...prev }
      selectedIdsNormalized.forEach((id) => {
        next[id] = { ...(prev[id] ?? DEFAULT_TOKEN_STYLE), ...patch }
      })
      return next
    })
  }

  const downloadSvg = () => {
    const blob = new Blob([svgMarkup], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'arabic-name-design.svg'
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <div dir="rtl" className="h-[100svh] w-full overflow-hidden bg-slate-50 p-2 sm:p-3">
      <div className="mx-auto flex h-full max-w-7xl min-h-0 flex-col gap-2">
        <header className="shrink-0 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
          <h1 className="text-xl font-semibold text-slate-900 sm:text-2xl text-center">
            Arabic Name Designer Prototype
          </h1>
        </header>

        <div className="flex min-h-0 flex-1 flex-col gap-2 lg:flex-row">
          <section className="order-1 h-[40svh] min-h-0 min-w-0 lg:order-2 lg:h-auto lg:flex-1">
            <Preview svgMarkup={svgMarkup} />
          </section>
          <aside className="order-2 min-h-0 w-full flex-1 lg:order-1 lg:w-[440px] lg:flex-none">
            <ControlsPanel
              activePane={activePane}
              onActivePaneChange={setActivePane}
              textDraft={textDraft}
              onTextDraftChange={setTextDraft}
              onAddText={addText}
              fontOptions={FONT_OPTIONS}
              fontFamily={fontFamily}
              onFontFamilyChange={setFontFamily}
              letterSpacingPx={letterSpacingPx}
              onLetterSpacingPxChange={setLetterSpacingPx}
              shapeDraft={shapeDraft}
              shapeValue={shapeDraft}
              onShapeDraftChange={setShapeDraft}
              onAddShape={addShape}
              decorationDraft={decorationDraft}
              decorationValue={decorationDraft}
              onDecorationDraftChange={setDecorationDraft}
              onAddDecoration={addDecoration}
              tokens={tokens}
              selectedTokenIds={selectedIdsNormalized}
              onToggleToken={toggleToken}
              onClearSelection={() => setSelectedTokenIds([])}
              onSelectAllTokens={() => setSelectedTokenIds(tokens.map((t) => t.id))}
              sampleStyle={sampleStyle}
              onApplyStyleToSelection={applyStyleToSelection}
              onDownloadSvg={downloadSvg}
            />
          </aside>
        </div>
      </div>
    </div>
  )
}
