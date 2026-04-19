import type { WidgetId } from '../widgets/registry'

type Props = {
  stamping: WidgetId | null
  dragging: WidgetId | null
}

export function StatusLine({ stamping, dragging }: Props) {
  if (stamping) {
    return (
      <div className="status">
        stamping <b>{stamping}</b> · click canvas to place · <kbd>esc</kbd> to stop
      </div>
    )
  }
  if (dragging) {
    return (
      <div className="status">
        dragging <b>{dragging}</b> · release on canvas to place
      </div>
    )
  }
  return (
    <div className="status">
      click a widget to stamp · drag a widget to place precisely
    </div>
  )
}
