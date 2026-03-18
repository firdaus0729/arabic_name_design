import React, { useId } from 'react'

export type FontOption = {
  label: string
  value: string // CSS font-family value
}

export type ControlsPanelProps = {
  variant: 'all' | 'inputOnly' | 'controlsOnly'
  text: string
  onTextChange: (next: string) => void
  fontOptions: FontOption[]
  fontFamily: string
  onFontFamilyChange: (next: string) => void
  fontSize: number
  onFontSizeChange: (next: number) => void
  letterSpacingPx: number
  onLetterSpacingPxChange: (next: number) => void
  stretchX: number
  onStretchXChange: (next: number) => void
  color: string
  onColorChange: (next: string) => void
  onDownloadSvg: () => void
}

function SliderRow({
  label,
  valueLabel,
  hint,
  children,
}: {
  label: string
  valueLabel: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3">
      <div className="flex items-baseline justify-between gap-3">
        <div className="text-sm font-semibold text-slate-900">{label}</div>
        <div className="tabular-nums text-sm font-medium text-slate-600">
          {valueLabel}
        </div>
      </div>
      {hint ? <div className="mt-1 text-xs text-slate-500">{hint}</div> : null}
      <div className="mt-3">{children}</div>
    </div>
  )
}

export function ControlsPanel({
  variant,
  text,
  onTextChange,
  fontOptions,
  fontFamily,
  onFontFamilyChange,
  fontSize,
  onFontSizeChange,
  letterSpacingPx,
  onLetterSpacingPxChange,
  stretchX,
  onStretchXChange,
  color,
  onColorChange,
  onDownloadSvg,
}: ControlsPanelProps) {
  const inputId = useId()

  const showInput = variant === 'all' || variant === 'inputOnly'
  const showControls = variant === 'all' || variant === 'controlsOnly'

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-4">
      {showInput ? (
        <div className="mb-4">
          <label
            htmlFor={inputId}
            className="block text-sm font-semibold text-slate-900"
          >
            Arabic Name
          </label>
          <input
            id={inputId}
            value={text}
            onChange={(e) => onTextChange(e.target.value)}
            dir="rtl"
            lang="ar"
            inputMode="text"
            placeholder="اكتب اسمك..."
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-right text-lg text-slate-900 shadow-sm outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
            style={{ fontFamily }}
            aria-label="Arabic name input"
          />
          <div className="mt-2 text-xs text-slate-500">
            Starts shaping automatically (browser + font).
          </div>
        </div>
      ) : null}

      {showControls ? (
        <div className="flex flex-col gap-3">
          <div>
            <label className="block text-sm font-semibold text-slate-900">
              Font
            </label>
            <select
              value={fontFamily}
              onChange={(e) => onFontFamilyChange(e.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-right text-base text-slate-900 shadow-sm outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
              aria-label="Font selector"
            >
              {fontOptions.map((opt) => (
                <option key={opt.value} value={opt.value} style={{ fontFamily: opt.value }}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <SliderRow
            label="Font size"
            valueLabel={`${Math.round(fontSize)}px`}
            hint="20px to 150px"
          >
            <input
              type="range"
              min={20}
              max={150}
              step={1}
              value={fontSize}
              onChange={(e) => onFontSizeChange(Number(e.target.value))}
              className="w-full accent-indigo-600"
              aria-label="Font size slider"
            />
          </SliderRow>

          <SliderRow
            label="Letter spacing"
            valueLabel={`${letterSpacingPx.toFixed(1)}px`}
            hint="0px to 20px"
          >
            <input
              type="range"
              min={0}
              max={20}
              step={0.5}
              value={letterSpacingPx}
              onChange={(e) => onLetterSpacingPxChange(Number(e.target.value))}
              className="w-full accent-indigo-600"
              aria-label="Letter spacing slider"
            />
          </SliderRow>

          <SliderRow
            label="Horizontal stretch"
            valueLabel={`${stretchX.toFixed(2)}×`}
            hint="0.5× to 2×"
          >
            <input
              type="range"
              min={0.5}
              max={2}
              step={0.01}
              value={stretchX}
              onChange={(e) => onStretchXChange(Number(e.target.value))}
              className="w-full accent-indigo-600"
              aria-label="Horizontal stretch slider"
            />
          </SliderRow>

          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-sm font-semibold text-slate-900">Text color</div>
                <div className="mt-1 text-xs text-slate-500">Pick a color for the preview.</div>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => onColorChange(e.target.value)}
                  aria-label="Text color picker"
                  className="h-11 w-14 cursor-pointer rounded-xl border border-slate-200 bg-white p-0"
                />
                <div className="tabular-nums text-sm font-medium text-slate-700">
                  {color.toUpperCase()}
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onDownloadSvg}
            className="mt-1 w-full rounded-xl bg-slate-900 px-4 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-slate-800 active:bg-slate-950"
          >
            Download as SVG
          </button>
        </div>
      ) : null}
    </div>
  )
}

