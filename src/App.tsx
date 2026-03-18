import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { ControlsPanel, type FontOption } from './components/ControlsPanel'
import { Preview } from './components/Preview'
import { buildArabicNameSvgString } from './components/arabicNameSvg'

const FONT_OPTIONS: FontOption[] = [
  { label: 'Amiri', value: 'Amiri, serif' },
  { label: 'Cairo', value: 'Cairo, sans-serif' },
  { label: 'Tajawal', value: 'Tajawal, sans-serif' },
  { label: 'Scheherazade New', value: 'Scheherazade New, serif' },
  { label: 'Noto Naskh Arabic', value: 'Noto Naskh Arabic, serif' },
]

function App() {
  const [count, setCount] = useState(0)
  const [arabicText, setArabicText] = useState('محمد')
  const [fontFamily, setFontFamily] = useState(FONT_OPTIONS[0]!.value)
  const [fontSize, setFontSize] = useState(96)
  const [letterSpacingPx, setLetterSpacingPx] = useState(2)
  const [stretchX, setStretchX] = useState(1)
  const [color, setColor] = useState('#0f172a')

  const handleDownloadSvg = () => {
    const svgMarkup = buildArabicNameSvgString({
      text: arabicText,
      fontFamily,
      fontSize,
      letterSpacingPx,
      stretchX,
      color,
    })

    const blob = new Blob([svgMarkup], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = 'arabic-name.svg'
    document.body.appendChild(a)
    a.click()
    a.remove()

    URL.revokeObjectURL(url)
  }

  return (
    <>
      {/* RTL Arabic Name Designer Tool (prototype) */}
      <div
        dir="rtl"
        className="min-h-dvh w-full overflow-x-hidden bg-gradient-to-b from-slate-50 to-white px-4 py-6 sm:px-6"
      >
        <div className="mx-auto max-w-6xl">
          <header className="mb-6">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Arabic Name Designer Tool
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Type your name and adjust font, spacing and stretch. Live preview updates instantly.
            </p>
          </header>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
            {/* Desktop: controls on the left */}
            <aside className="hidden w-full lg:block lg:w-[420px] lg:flex-shrink-0">
              <ControlsPanel
                variant="all"
                text={arabicText}
                onTextChange={setArabicText}
                fontOptions={FONT_OPTIONS}
                fontFamily={fontFamily}
                onFontFamilyChange={setFontFamily}
                fontSize={fontSize}
                onFontSizeChange={setFontSize}
                letterSpacingPx={letterSpacingPx}
                onLetterSpacingPxChange={setLetterSpacingPx}
                stretchX={stretchX}
                onStretchXChange={setStretchX}
                color={color}
                onColorChange={setColor}
                onDownloadSvg={handleDownloadSvg}
              />
            </aside>

            <section className="flex flex-col gap-6 lg:flex-1">
              {/* Mobile: input first */}
              <div className="block lg:hidden">
                <ControlsPanel
                  variant="inputOnly"
                  text={arabicText}
                  onTextChange={setArabicText}
                  fontOptions={FONT_OPTIONS}
                  fontFamily={fontFamily}
                  onFontFamilyChange={setFontFamily}
                  fontSize={fontSize}
                  onFontSizeChange={setFontSize}
                  letterSpacingPx={letterSpacingPx}
                  onLetterSpacingPxChange={setLetterSpacingPx}
                  stretchX={stretchX}
                  onStretchXChange={setStretchX}
                  color={color}
                  onColorChange={setColor}
                  onDownloadSvg={handleDownloadSvg}
                />
              </div>

              <Preview
                text={arabicText}
                fontFamily={fontFamily}
                fontSize={fontSize}
                letterSpacingPx={letterSpacingPx}
                stretchX={stretchX}
                color={color}
              />

              {/* Mobile: controls after preview */}
              <div className="block lg:hidden">
                <ControlsPanel
                  variant="controlsOnly"
                  text={arabicText}
                  onTextChange={setArabicText}
                  fontOptions={FONT_OPTIONS}
                  fontFamily={fontFamily}
                  onFontFamilyChange={setFontFamily}
                  fontSize={fontSize}
                  onFontSizeChange={setFontSize}
                  letterSpacingPx={letterSpacingPx}
                  onLetterSpacingPxChange={setLetterSpacingPx}
                  stretchX={stretchX}
                  onStretchXChange={setStretchX}
                  color={color}
                  onColorChange={setColor}
                  onDownloadSvg={handleDownloadSvg}
                />
              </div>
            </section>
          </div>
        </div>
      </div>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
