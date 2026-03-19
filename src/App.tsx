import { useMemo, useState } from 'react'
import { ControlsPanel, type FontOption, type ToolPane } from './components/ControlsPanel'
import { Preview } from './components/Preview'
import {
  buildArabicNameSvgString,
  type PreviewStylePreset,
} from './components/arabicNameSvg'

const FONT_OPTIONS: FontOption[] = [
  { label: 'Amiri', value: 'Amiri, serif' },
  { label: 'Cairo', value: 'Cairo, sans-serif' },
  { label: 'Tajawal', value: 'Tajawal, sans-serif' },
  { label: 'Scheherazade New', value: 'Scheherazade New, serif' },
  { label: 'Noto Naskh Arabic', value: 'Noto Naskh Arabic, serif' },
]

export default function App() {
  const [activePane, setActivePane] = useState<ToolPane>('text')
  const [textDraft, setTextDraft] = useState('محمد علي')
  const [text, setText] = useState('محمد علي')
  const [fontFamily, setFontFamily] = useState(FONT_OPTIONS[0]!.value)
  const [textColor, setTextColor] = useState('#0f172a')
  const [baseFontSize, setBaseFontSize] = useState(96)
  const [letterSpacingPx, setLetterSpacingPx] = useState(0)
  const [stylePreset, setStylePreset] = useState<PreviewStylePreset>('normal')

  const svgMarkup = useMemo(
    () =>
      buildArabicNameSvgString({
        text,
        fontFamily,
        baseFontSize,
        textColor,
        stylePreset,
        letterSpacingPx,
      }),
    [text, fontFamily, baseFontSize, textColor, stylePreset, letterSpacingPx],
  )

  const applyText = () => setText(textDraft)

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
              onApplyText={applyText}
              fontOptions={FONT_OPTIONS}
              fontFamily={fontFamily}
              onFontFamilyChange={setFontFamily}
              stylePreset={stylePreset}
              onStylePresetChange={setStylePreset}
              baseFontSize={baseFontSize}
              onBaseFontSizeChange={setBaseFontSize}
              textColor={textColor}
              onTextColorChange={setTextColor}
              letterSpacingPx={letterSpacingPx}
              onLetterSpacingPxChange={setLetterSpacingPx}
              onDownloadSvg={downloadSvg}
            />
          </aside>
        </div>
      </div>
    </div>
  )
}
