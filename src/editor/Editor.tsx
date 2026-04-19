import { useCallback, useEffect, useRef, useState } from 'react'
import { Palette } from './Palette'
import { Canvas, type CanvasHandle } from './Canvas'
import { StatusLine } from './StatusLine'
import { DragGhost } from './DragGhost'
import type { WidgetId } from '../widgets/registry'

const DRAG_THRESHOLD_PX = 5

type DragState = { widgetId: WidgetId; clientX: number; clientY: number } | null

export function Editor() {
  const [stampingId, setStampingId] = useState<WidgetId | null>(null)
  const [drag, setDrag] = useState<DragState>(null)
  const canvasRef = useRef<CanvasHandle>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setStampingId(null)
        setDrag(null)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const handleTileMouseDown = useCallback(
    (widgetId: WidgetId, ev: React.MouseEvent<HTMLButtonElement>) => {
      const startX = ev.clientX
      const startY = ev.clientY
      let dragging = false

      const onMove = (e: MouseEvent) => {
        const dx = e.clientX - startX
        const dy = e.clientY - startY
        if (!dragging && Math.hypot(dx, dy) > DRAG_THRESHOLD_PX) {
          dragging = true
          setStampingId(null)
        }
        if (dragging) {
          setDrag({ widgetId, clientX: e.clientX, clientY: e.clientY })
        }
      }

      const onUp = (e: MouseEvent) => {
        window.removeEventListener('mousemove', onMove)
        window.removeEventListener('mouseup', onUp)
        if (dragging) {
          // If released over the palette, cancel.
          const paletteEl = document.querySelector('.palette')
          const overPalette =
            paletteEl && paletteEl.contains(document.elementFromPoint(e.clientX, e.clientY))
          if (!overPalette) {
            canvasRef.current?.placeAtClient(widgetId, e.clientX, e.clientY)
          }
          setDrag(null)
        } else {
          setStampingId((cur) => (cur === widgetId ? null : widgetId))
        }
      }

      window.addEventListener('mousemove', onMove)
      window.addEventListener('mouseup', onUp)
    },
    [],
  )

  return (
    <>
      <div className="canvas-bg" />
      <Canvas ref={canvasRef} stampingId={stampingId} />
      <Palette activeId={stampingId} onTileMouseDown={handleTileMouseDown} />
      {drag && (
        <DragGhost widgetId={drag.widgetId} clientX={drag.clientX} clientY={drag.clientY} />
      )}
      <StatusLine stamping={stampingId} dragging={drag?.widgetId ?? null} />
    </>
  )
}
