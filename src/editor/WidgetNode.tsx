import { memo } from 'react'
import { WIDGETS, type WidgetId } from '../widgets/registry'

export type WidgetNodeData = {
  widgetId: WidgetId
  seedKey: string
}

type Props = {
  data: WidgetNodeData
}

export const WidgetNode = memo(function WidgetNode({ data }: Props) {
  const { Full } = WIDGETS[data.widgetId]
  return <Full seedKey={data.seedKey} />
})
