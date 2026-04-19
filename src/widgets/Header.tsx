import { useMemo, useCallback } from 'react'
import { Rough, type RoughDraw } from '../sketch/Rough'
import { hashSeed } from '../lib/hashSeed'

export const HEADER_SIZE = { w: 640, h: 44 }
export const HEADER_TILE_SIZE = { w: 72, h: 18 }

export function HeaderFull({ seedKey }: { seedKey: string }) {
  const { w, h } = HEADER_SIZE
  const seed = useMemo(() => hashSeed(seedKey), [seedKey])
  const draw = useCallback<RoughDraw>(
    (rc) => {
      rc.rectangle(2, 2, w - 4, h - 4)
      const lx = 10
      const ly = 10
      const lw = 24
      const lh = 24
      rc.rectangle(lx, ly, lw, lh)
      rc.line(lx, ly, lx + lw, ly + lh)
      rc.line(lx + lw, ly, lx, ly + lh)
      for (let i = 0; i < 4; i++) {
        const x = w - 24 - i * 66
        rc.line(x - 42, h / 2, x, h / 2)
      }
    },
    [w, h],
  )
  return <Rough w={w} h={h} seed={seed} draw={draw} />
}

export function HeaderTile({ seedKey }: { seedKey: string }) {
  const { w, h } = HEADER_TILE_SIZE
  const seed = useMemo(() => hashSeed(seedKey), [seedKey])
  const draw = useCallback<RoughDraw>(
    (rc) => {
      rc.rectangle(1, 1, w - 2, h - 2)
      rc.rectangle(4, 4, 10, 10)
      rc.line(4, 4, 14, 14)
      rc.line(14, 4, 4, 14)
      rc.line(w - 32, h / 2, w - 26, h / 2)
      rc.line(w - 22, h / 2, w - 16, h / 2)
      rc.line(w - 12, h / 2, w - 6, h / 2)
    },
    [w, h],
  )
  return <Rough w={w} h={h} seed={seed} draw={draw} />
}
