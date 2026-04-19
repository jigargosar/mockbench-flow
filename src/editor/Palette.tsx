import { WIDGETS, WIDGET_ORDER, type WidgetId } from '../widgets/registry'

type Tile = { key: string; widgetId: WidgetId }

const PALETTE_REPS = 6

function buildTiles(): Tile[] {
  const tiles: Tile[] = []
  for (let rep = 0; rep < PALETTE_REPS; rep++) {
    for (const widgetId of WIDGET_ORDER) {
      tiles.push({ key: `${widgetId}-${rep}`, widgetId })
    }
  }
  return tiles
}

const TILES = buildTiles()

type Props = {
  activeId: WidgetId | null
  onTileMouseDown: (widgetId: WidgetId, event: React.MouseEvent<HTMLButtonElement>) => void
}

export function Palette({ activeId, onTileMouseDown }: Props) {
  return (
    <div className="palette">
      <div className="palette-list">
        {TILES.map((t) => {
          const { Tile } = WIDGETS[t.widgetId]
          const isActive = activeId === t.widgetId
          return (
            <button
              key={t.key}
              className={'tile' + (isActive ? ' is-active' : '')}
              onMouseDown={(e) => {
                e.preventDefault()
                onTileMouseDown(t.widgetId, e)
              }}
              type="button"
            >
              <div className="tile-preview">
                <Tile seedKey={t.key} />
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
