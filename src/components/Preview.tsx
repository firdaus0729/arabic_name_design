import { memo } from 'react'

export const Preview = memo(function Preview({ svgMarkup }: { svgMarkup: string }) {
  return (
    <div className="h-full min-h-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex h-full w-full items-center justify-center p-1 sm:p-2">
        <div
          className="h-full w-full"
          dangerouslySetInnerHTML={{ __html: svgMarkup }}
        />
      </div>
    </div>
  )
})
