import { ButtonFull, ButtonTile, BUTTON_SIZE } from './Button'
import { HeaderFull, HeaderTile, HEADER_SIZE } from './Header'
import { BrowserFull, BrowserTile, BROWSER_SIZE } from './Browser'

export type WidgetId = 'button' | 'header' | 'browser'

export type WidgetSize = { w: number; h: number }

export type WidgetComponent = (props: { seedKey: string }) => JSX.Element

export type WidgetEntry = {
  id: WidgetId
  Full: WidgetComponent
  Tile: WidgetComponent
  size: WidgetSize
}

export const WIDGETS: Record<WidgetId, WidgetEntry> = {
  button: { id: 'button', Full: ButtonFull, Tile: ButtonTile, size: BUTTON_SIZE },
  header: { id: 'header', Full: HeaderFull, Tile: HeaderTile, size: HEADER_SIZE },
  browser: { id: 'browser', Full: BrowserFull, Tile: BrowserTile, size: BROWSER_SIZE },
}

export const WIDGET_ORDER: WidgetId[] = ['button', 'header', 'browser']
