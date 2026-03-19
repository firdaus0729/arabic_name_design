import { useState } from 'react'
import type { DesignToken, TokenStyle } from './arabicNameSvg'

export type FontOption = { label: string; value: string }
export type ToolPane =
  | 'text'
  | 'shape'
  | 'decor'
  | 'fontFamily'
  | 'letterSpacing'
  | 'color'
  | 'fontSize'
  | 'scale'
  | 'rotate'
  | 'borderColor'
  | 'borderWidth'
  | 'hAlign'
  | 'vAlign'
  | 'offsetX'
  | 'offsetY'

type Props = {
  activePane: ToolPane
  onActivePaneChange: (pane: ToolPane) => void
  textDraft: string
  onTextDraftChange: (next: string) => void
  onAddText: () => void
  fontOptions: FontOption[]
  fontFamily: string
  onFontFamilyChange: (next: string) => void
  letterSpacingPx: number
  onLetterSpacingPxChange: (next: number) => void
  shapeDraft: string
  shapeValue: string
  onShapeDraftChange: (next: string) => void
  onAddShape: () => void
  decorationDraft: string
  decorationValue: string
  onDecorationDraftChange: (next: string) => void
  onAddDecoration: () => void
  tokens: DesignToken[]
  selectedTokenIds: string[]
  onToggleToken: (tokenId: string) => void
  onClearSelection: () => void
  onSelectAllTokens: () => void
  sampleStyle: TokenStyle
  onApplyStyleToSelection: (patch: Partial<TokenStyle>) => void
}

const SHAPE_CHOICES = ['⬛', '◆', '●', '▲', '⬟', '⬢']
const DECORATION_CHOICES = ['✦', '❈', '✿', '❋', '❖', '۞']
const PANE_ICONS: { pane: ToolPane; label: string; icon: string }[] = [
  { pane: 'text', label: 'Text', icon: 'T' },
  { pane: 'shape', label: 'Shape', icon: '⬟' },
  { pane: 'decor', label: 'Decor', icon: '✦' },
  { pane: 'fontFamily', label: 'Font', icon: 'Aa' },
  { pane: 'letterSpacing', label: 'Spacing', icon: '↔' },
  { pane: 'color', label: 'Color', icon: '🎨' },
  { pane: 'fontSize', label: 'Size', icon: '🔠' },
  { pane: 'scale', label: 'Scale', icon: '⤢' },
  { pane: 'rotate', label: 'Rotate', icon: '⟳' },
  { pane: 'borderColor', label: 'Border Color', icon: '◍' },
  { pane: 'borderWidth', label: 'Border Width', icon: '▦' },
  { pane: 'hAlign', label: 'H Align', icon: '↔️' },
  { pane: 'vAlign', label: 'V Align', icon: '↕️' },
  { pane: 'offsetX', label: 'Move X', icon: '⇆' },
  { pane: 'offsetY', label: 'Move Y', icon: '⇅' },
]

export function ControlsPanel(props: Props) {
  const fontOptions = props.fontOptions.map((opt) => ({ value: opt.value, label: opt.label }))
  const shapeOptions = SHAPE_CHOICES.map((shape) => ({ value: shape, label: shape }))
  const decorOptions = DECORATION_CHOICES.map((decor) => ({ value: decor, label: decor }))

  return (
    <div className="flex h-full min-h-0 flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
      <section className="shrink-0 rounded-xl border border-slate-200 bg-slate-50 p-2">
        <div className="mb-1 flex items-center justify-between gap-2">
          <h2 className="text-sm font-semibold text-slate-900">Tokens</h2>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={props.onSelectAllTokens}
              className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs"
            >
              Select all
            </button>
            <button
              type="button"
              onClick={props.onClearSelection}
              className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs"
            >
              Clear
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-0 sm:grid-cols-8">
          {props.tokens.map((token) => {
            const selected = props.selectedTokenIds.includes(token.id)
            return (
              <button
                key={token.id}
                type="button"
                onClick={() => props.onToggleToken(token.id)}
                className={`rounded-lg border px-2 py-2 text-sm ${
                  selected
                    ? 'border-indigo-400 bg-indigo-50 text-indigo-700'
                    : 'border-slate-200 bg-white text-slate-700'
                }`}
                title={`${token.label} (${token.type})`}
              >
                {token.value === ' ' ? '␣' : token.value}
              </button>
            )
          })}
        </div>
      </section>

      <section className="min-h-0 flex-1 space-y-2 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50 p-2">
        <div className="grid grid-cols-7 gap-0">
          {PANE_ICONS.map((item) => (
            <button
              key={item.pane}
              type="button"
              onClick={() => props.onActivePaneChange(item.pane)}
              title={item.label}
              className={`rounded-lg border px-3 py-2 text-sm ${
                props.activePane === item.pane
                  ? 'border-indigo-400 bg-indigo-50 text-indigo-700'
                  : 'border-slate-200 bg-white text-slate-700'
              }`}
            >
              {item.icon}
            </button>
          ))}
        </div>

        {props.activePane === 'text' ? (
          <div className="rounded-lg border border-slate-200 bg-white p-3">
            <label className="mb-1 block text-sm font-medium text-slate-700">Text Input (Add)</label>
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
                onClick={props.onAddText}
                className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white"
              >
                OK
              </button>
            </div>
          </div>
        ) : null}

        {props.activePane === 'shape' ? (
          <div className="rounded-lg border border-slate-200 bg-white p-3">
            <label className="mb-1 block text-sm font-medium text-slate-700">Shape (Add)</label>
            <div className="flex gap-2">
              <div className="w-full">
                <UpwardSelect
                  value={props.shapeDraft}
                  options={shapeOptions}
                  onChange={props.onShapeDraftChange}
                />
              </div>
              <button
                type="button"
                onClick={props.onAddShape}
                className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white"
              >
                OK
              </button>
            </div>
          </div>
        ) : null}

        {props.activePane === 'decor' ? (
          <div className="rounded-lg border border-slate-200 bg-white p-3">
            <label className="mb-1 block text-sm font-medium text-slate-700">Decoration (Add)</label>
            <div className="flex gap-2">
              <div className="w-full">
                <UpwardSelect
                  value={props.decorationDraft}
                  options={decorOptions}
                  onChange={props.onDecorationDraftChange}
                />
              </div>
              <button
                type="button"
                onClick={props.onAddDecoration}
                className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white"
              >
                OK
              </button>
            </div>
          </div>
        ) : null}

        {props.activePane === 'fontFamily' ? (
          <div className="space-y-3 rounded-lg border border-slate-200 bg-white p-3">
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

        {props.activePane === 'letterSpacing' ? (
          <div className="space-y-3 rounded-lg border border-slate-200 bg-white p-3">
            <Slider
              label="Global letter spacing"
              value={`${props.letterSpacingPx}px`}
              min={0}
              max={20}
              step={0.5}
              current={props.letterSpacingPx}
              onChange={props.onLetterSpacingPxChange}
            />
          </div>
        ) : null}

        {props.activePane === 'color' ? (
          <div className="space-y-3 rounded-lg border border-slate-200 bg-white p-3">
            <h2 className="text-sm font-semibold text-slate-900">Color</h2>
            <p className="text-xs text-slate-500">
              Active selection count: {props.selectedTokenIds.length}
            </p>
            <ColorRow
              label="Color"
              color={props.sampleStyle.color}
              onChange={(v) => props.onApplyStyleToSelection({ color: v })}
            />
          </div>
        ) : null}

        {props.activePane === 'fontSize' ? (
          <div className="space-y-3 rounded-lg border border-slate-200 bg-white p-3">
            <Slider
              label="Font size"
              value={`${Math.round(props.sampleStyle.fontSize)}px`}
              min={20}
              max={160}
              step={1}
              current={props.sampleStyle.fontSize}
              onChange={(v) => props.onApplyStyleToSelection({ fontSize: v })}
            />
          </div>
        ) : null}

        {props.activePane === 'scale' ? (
          <div className="space-y-3 rounded-lg border border-slate-200 bg-white p-3">
            <Slider
              label="Scale"
              value={`${props.sampleStyle.scale.toFixed(2)}x`}
              min={0.5}
              max={2}
              step={0.05}
              current={props.sampleStyle.scale}
              onChange={(v) => props.onApplyStyleToSelection({ scale: v })}
            />
          </div>
        ) : null}

        {props.activePane === 'rotate' ? (
          <div className="space-y-3 rounded-lg border border-slate-200 bg-white p-3">
            <Slider
              label="Rotation"
              value={`${Math.round(props.sampleStyle.rotate)}°`}
              min={-180}
              max={180}
              step={1}
              current={props.sampleStyle.rotate}
              onChange={(v) => props.onApplyStyleToSelection({ rotate: v })}
            />
          </div>
        ) : null}

        {props.activePane === 'borderColor' ? (
          <div className="space-y-3 rounded-lg border border-slate-200 bg-white p-3">
            <ColorRow
              label="Border color"
              color={props.sampleStyle.strokeColor || '#000000'}
              onChange={(v) => props.onApplyStyleToSelection({ strokeColor: v })}
            />
          </div>
        ) : null}

        {props.activePane === 'borderWidth' ? (
          <div className="space-y-3 rounded-lg border border-slate-200 bg-white p-3">
            <Slider
              label="Border width"
              value={`${props.sampleStyle.strokeWidth.toFixed(1)}px`}
              min={0}
              max={8}
              step={0.5}
              current={props.sampleStyle.strokeWidth}
              onChange={(v) => props.onApplyStyleToSelection({ strokeWidth: v })}
            />
          </div>
        ) : null}

        {props.activePane === 'hAlign' ? (
          <div className="space-y-3 rounded-lg border border-slate-200 bg-white p-3">
            <select
              className="w-full rounded-lg border border-slate-200 px-2 py-2 text-sm"
              value={props.sampleStyle.hAlign}
              onChange={(e) =>
                props.onApplyStyleToSelection({ hAlign: e.target.value as TokenStyle['hAlign'] })
              }
            >
              <option value="left">Left Align</option>
              <option value="center">Center Align</option>
              <option value="right">Right Align</option>
            </select>
          </div>
        ) : null}

        {props.activePane === 'vAlign' ? (
          <div className="space-y-3 rounded-lg border border-slate-200 bg-white p-3">
            <select
              className="w-full rounded-lg border border-slate-200 px-2 py-2 text-sm"
              value={props.sampleStyle.vAlign}
              onChange={(e) =>
                props.onApplyStyleToSelection({ vAlign: e.target.value as TokenStyle['vAlign'] })
              }
            >
              <option value="top">Top Align</option>
              <option value="middle">Middle Align</option>
              <option value="bottom">Bottom Align</option>
            </select>
          </div>
        ) : null}

        {props.activePane === 'offsetX' ? (
          <div className="space-y-3 rounded-lg border border-slate-200 bg-white p-3">
            <Slider
              label="Offset X"
              value={`${Math.round(props.sampleStyle.offsetX)}px`}
              min={-100}
              max={100}
              step={1}
              current={props.sampleStyle.offsetX}
              onChange={(v) => props.onApplyStyleToSelection({ offsetX: v })}
            />
          </div>
        ) : null}

        {props.activePane === 'offsetY' ? (
          <div className="space-y-3 rounded-lg border border-slate-200 bg-white p-3">
            <Slider
              label="Offset Y"
              value={`${Math.round(props.sampleStyle.offsetY)}px`}
              min={-100}
              max={100}
              step={1}
              current={props.sampleStyle.offsetY}
              onChange={(v) => props.onApplyStyleToSelection({ offsetY: v })}
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

