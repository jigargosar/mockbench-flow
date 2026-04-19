import { useLayoutEffect, useRef } from 'react'
import rough from 'roughjs'
import type { Options } from 'roughjs/bin/core'

export type RoughApi = {
  rectangle: (x: number, y: number, w: number, h: number, opts?: Options) => void
  line: (x1: number, y1: number, x2: number, y2: number, opts?: Options) => void
  circle: (cx: number, cy: number, d: number, opts?: Options) => void
  ellipse: (cx: number, cy: number, w: number, h: number, opts?: Options) => void
  path: (d: string, opts?: Options) => void
}

export type RoughDraw = (rc: RoughApi) => void

type Props = {
  w: number
  h: number
  seed: number
  draw: RoughDraw
  strokeWidth?: number
}

const INK = 'oklch(0.22 0.01 80)'

export function Rough({ w, h, seed, draw, strokeWidth = 1 }: Props) {
  const ref = useRef<SVGSVGElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    while (el.firstChild) el.removeChild(el.firstChild)

    const rc = rough.svg(el, {
      options: {
        seed,
        roughness: 1.0,
        bowing: 1.1,
        strokeWidth,
        stroke: INK,
      },
    })

    const api: RoughApi = {
      rectangle: (x, y, rw, rh, opts) => {
        el.appendChild(rc.rectangle(x, y, rw, rh, opts))
      },
      line: (x1, y1, x2, y2, opts) => {
        el.appendChild(rc.line(x1, y1, x2, y2, opts))
      },
      circle: (cx, cy, d, opts) => {
        el.appendChild(rc.circle(cx, cy, d, opts))
      },
      ellipse: (cx, cy, ew, eh, opts) => {
        el.appendChild(rc.ellipse(cx, cy, ew, eh, opts))
      },
      path: (d, opts) => {
        el.appendChild(rc.path(d, opts))
      },
    }

    draw(api)
  }, [w, h, seed, draw, strokeWidth])

  return <svg ref={ref} width={w} height={h} viewBox={`0 0 ${w} ${h}`} />
}
