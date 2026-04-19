import { useMemo, useCallback } from 'react'
import { Rough, type RoughDraw } from '../sketch/Rough'
import { hashSeed } from '../lib/hashSeed'

export const BUTTON_SIZE = { w: 96, h: 30 }
export const BUTTON_TILE_SIZE = { w: 64, h: 22 }

export function ButtonFull({ seedKey }: { seedKey: string }) {
  const { w, h } = BUTTON_SIZE
  const seed = useMemo(() => hashSeed(seedKey), [seedKey])
  const draw = useCallback<RoughDraw>(
    (rc) => {
      rc.rectangle(2, 2, w - 4, h - 4)
    },
    [w, h],
  )
  return (
    <div style={{ position: 'relative', width: w, height: h }}>
      <Rough w={w} h={h} seed={seed} draw={draw} />
      <div
        className="widget-text"
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 14,
          fontWeight: 400,
        }}
      >
        Button
      </div>
    </div>
  )
}

export function ButtonTile({ seedKey }: { seedKey: string }) {
  const { w, h } = BUTTON_TILE_SIZE
  const seed = useMemo(() => hashSeed(seedKey), [seedKey])
  const draw = useCallback<RoughDraw>(
    (rc) => {
      rc.rectangle(1.5, 1.5, w - 3, h - 3)
    },
    [w, h],
  )
  return (
    <div style={{ position: 'relative', width: w, height: h }}>
      <Rough w={w} h={h} seed={seed} draw={draw} />
      <div
        className="widget-text"
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 12,
          fontWeight: 400,
        }}
      >
        Button
      </div>
    </div>
  )
}
