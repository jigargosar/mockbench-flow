import { useMemo, useCallback } from 'react'
import { Rough, type RoughDraw } from '../sketch/Rough'
import { hashSeed } from '../lib/hashSeed'

export const BROWSER_SIZE = { w: 680, h: 440 }
export const BROWSER_TILE_SIZE = { w: 72, h: 44 }

export function BrowserFull({ seedKey }: { seedKey: string }) {
  const { w, h } = BROWSER_SIZE
  const seed = useMemo(() => hashSeed(seedKey), [seedKey])
  const draw = useCallback<RoughDraw>(
    (rc) => {
      rc.rectangle(2, 2, w - 4, h - 4)
      rc.line(2, 32, w - 2, 32)
      rc.circle(16, 16, 8)
      rc.circle(34, 16, 8)
      rc.circle(52, 16, 8)
      rc.rectangle(72, 9, w - 92, 14)
    },
    [w, h],
  )
  return <Rough w={w} h={h} seed={seed} draw={draw} />
}

export function BrowserTile({ seedKey }: { seedKey: string }) {
  const { w, h } = BROWSER_TILE_SIZE
  const seed = useMemo(() => hashSeed(seedKey), [seedKey])
  const draw = useCallback<RoughDraw>(
    (rc) => {
      rc.rectangle(1, 1, w - 2, h - 2)
      rc.line(1, 11, w - 1, 11)
      rc.circle(5, 6, 3)
      rc.circle(11, 6, 3)
      rc.circle(17, 6, 3)
      rc.rectangle(24, 3.5, w - 30, 5)
    },
    [w, h],
  )
  return <Rough w={w} h={h} seed={seed} draw={draw} />
}
