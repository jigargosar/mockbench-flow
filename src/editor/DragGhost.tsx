import { useMemo } from 'react'
import { WIDGETS, type WidgetId } from '../widgets/registry'

type Props = {
  widgetId: WidgetId
  clientX: number
  clientY: number
}

export function DragGhost({ widgetId, clientX, clientY }: Props) {
  const { Full, size } = WIDGETS[widgetId]
  const seedKey = useMemo(
    () => 'drag-ghost-' + widgetId + '-' + Math.random().toString(36).slice(2, 6),
    [widgetId],
  )
  return (
    <div
      className="ghost ghost-fixed"
      style={{
        left: clientX - size.w / 2,
        top: clientY - size.h / 2,
      }}
    >
      <Full seedKey={seedKey} />
    </div>
  )
}
