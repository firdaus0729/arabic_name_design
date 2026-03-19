import { useState } from 'react'
import type { PreviewStylePreset } from './arabicNameSvg'

export type FontOption = { label: string; value: string }
export type ToolPane =
  | 'text'
  | 'fontFamily'
  | 'stylePreset'
  | 'fontSize'
  | 'color'

type Props = {
  activePane: ToolPane
  onActivePaneChange: (pane: ToolPane) => void
  textDraft: string
  onTextDraftChange: (next: string) => void
  onApplyText: () => void
  fontOptions: FontOption[]
  fontFamily: string
  onFontFamilyChange: (next: string) => void
  stylePreset: PreviewStylePreset
  onStylePresetChange: (next: PreviewStylePreset) => void
  baseFontSize: number
  onBaseFontSizeChange: (next: number) => void
  textColor: string
  onTextColorChange: (next: string) => void
  letterSpacingPx: number
  onLetterSpacingPxChange: (next: number) => void
  onDownloadSvg: () => void
}

const PANE_ICONS: { pane: ToolPane; label: string; icon: string }[] = [
  { pane: 'text', label: 'Text', icon: 'T' },
  { pane: 'fontFamily', label: 'Font', icon: 'Aa' },
  { pane: 'stylePreset', label: 'Style', icon: '✧' },
  { pane: 'fontSize', label: 'Size', icon: '🔠' },
  { pane: 'color', label: 'Color', icon: '🎨' },
]

export function ControlsPanel(props: Props) {
  const fontOptions = props.fontOptions.map((opt) => ({ value: opt.value, label: opt.label }))

  return (
    <div className="flex h-full min-h-0 flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">


      <section className="min-h-0 flex-1 space-y-2 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50 p-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={props.onDownloadSvg}
            title="Export SVG"
            className="shrink-0 rounded-md border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-700 sm:px-2.5 sm:py-2 sm:text-sm"
          >
            ⬇️
          </button>
          <div className="flex flex-1 gap-1 overflow-x-auto pb-1">
            {PANE_ICONS.map((item) => (
              <button
                key={item.pane}
                type="button"
                onClick={() => props.onActivePaneChange(item.pane)}
                title={item.label}
                className={`shrink-0 rounded-md border px-2 py-1.5 text-xs sm:px-2.5 sm:py-2 sm:text-sm ${
                  props.activePane === item.pane
                    ? 'border-indigo-400 bg-indigo-50 text-indigo-700'
                    : 'border-slate-200 bg-white text-slate-700'
                }`}
              >
                {item.icon}
              </button>
            ))}
          </div>
        </div>

        {props.activePane === 'text' ? (
          <div className="rounded-lg border border-slate-200 bg-white p-2">
            <label className="mb-1 block text-sm font-medium text-slate-700">Arabic Text</label>
            <div className="flex gap-2">
              <input
                value={props.textDraft}
                onChange={(e) => props.onTextDraftChange(e.target.value)}
                dir="rtl"
                lang="ar"
                placeholder="اكتب النص..."
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-right"
                style={{ fontFamily: props.fontFamily }}
              />
              <button
                type="button"
                onClick={props.onApplyText}
                className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white"
              >
                OK
              </button>
            </div>
          </div>
        ) : null}

        {props.activePane === 'fontFamily' ? (
          <div className="space-y-3 rounded-lg border border-slate-200 bg-white p-2">
            <div>
              <label className="mb-1 block text-sm text-slate-700">Font Family</label>
              <UpwardSelect
                value={props.fontFamily}
                options={fontOptions}
                onChange={props.onFontFamilyChange}
              />
            </div>
          </div>
        ) : null}

        {props.activePane === 'stylePreset' ? (
          <div className="space-y-3 rounded-lg border border-slate-200 bg-white p-2">
            <label className="mb-1 block text-sm text-slate-700">Style Preset</label>
            <select
              value={props.stylePreset}
              onChange={(e) => props.onStylePresetChange(e.target.value as PreviewStylePreset)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
            >
              <option value="normal">Normal</option>
              <option value="slightStretch">Slight Stretch</option>
              <option value="centeredElegant">Centered Elegant</option>
            </select>
          </div>
        ) : null}

        {props.activePane === 'fontSize' ? (
          <div className="space-y-3 rounded-lg border border-slate-200 bg-white p-2">
            <Slider
              label="Base font size"
              value={`${Math.round(props.baseFontSize)}px`}
              min={20}
              max={160}
              step={1}
              current={props.baseFontSize}
              onChange={props.onBaseFontSizeChange}
            />
            <Slider
              label="Balanced spacing"
              value={`${props.letterSpacingPx.toFixed(1)}px`}
              min={-1}
              max={4}
              step={0.1}
              current={props.letterSpacingPx}
              onChange={props.onLetterSpacingPxChange}
            />
          </div>
        ) : null}

        {props.activePane === 'color' ? (
          <div className="space-y-3 rounded-lg border border-slate-200 bg-white p-2">
            <ColorRow
              label="Text color"
              color={props.textColor}
              onChange={props.onTextColorChange}
            />
          </div>
        ) : null}
      </section>
    </div>
  )
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  current,
  onChange,
}: {
  label: string
  value: string
  min: number
  max: number
  step: number
  current: number
  onChange: (v: number) => void
}) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs text-slate-600">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={current}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-indigo-600"
      />
    </div>
  )
}

function ColorRow({
  label,
  color,
  onChange,
}: {
  label: string
  color: string
  onChange: (next: string) => void
}) {
  return (
    <div className="flex items-center justify-between">
      <label className="text-sm text-slate-700">{label}</label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="h-9 w-11 rounded-md border border-slate-200 bg-white p-0"
        />
        <span className="text-xs text-slate-500">{color}</span>
      </div>
    </div>
  )
}

function UpwardSelect({
  value,
  options,
  onChange,
}: {
  value: string
  options: Array<{ value: string; label: string }>
  onChange: (next: string) => void
}) {
  const [open, setOpen] = useState(false)
  const selected = options.find((opt) => opt.value === value) ?? options[0]

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev: boolean) => !prev)}
        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-right text-sm"
      >
        {selected?.label ?? value}
      </button>

      {open ? (
        <div className="absolute bottom-full left-0 right-0 z-30 mb-1 max-h-44 overflow-auto rounded-lg border border-slate-200 bg-white p-1 shadow-lg">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange(opt.value)
                setOpen(false)
              }}
              className={`block w-full rounded-md px-2 py-2 text-right text-sm ${
                opt.value === value ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-slate-50'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}

