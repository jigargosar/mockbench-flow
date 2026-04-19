import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  ReactFlow,
  ReactFlowProvider,
  useNodesState,
  type Node,
} from '@xyflow/react'
import { WidgetNode, type WidgetNodeData } from './WidgetNode'
import { WIDGETS, type WidgetId } from '../widgets/registry'

type StampNode = Node<WidgetNodeData, 'widget'>

const NODE_TYPES = { widget: WidgetNode }

let nodeCounter = 0
function nextInstanceId(widgetId: WidgetId): string {
  nodeCounter += 1
  return `${widgetId}-${Date.now().toString(36)}-${nodeCounter.toString(36)}`
}

export type CanvasHandle = {
  placeAtClient: (widgetId: WidgetId, clientX: number, clientY: number) => void
}

type Props = {
  stampingId: WidgetId | null
}

const CanvasInner = forwardRef<CanvasHandle, Props>(function CanvasInner(
  { stampingId },
  ref,
) {
  const canvasRef = useRef<HTMLDivElement>(null)
  const [nodes, setNodes, onNodesChange] = useNodesState<StampNode>([])
  const [ghost, setGhost] = useState<{ x: number; y: number; seedKey: string } | null>(null)

  const appendNode = useCallback(
    (widgetId: WidgetId, canvasX: number, canvasY: number) => {
      const id = nextInstanceId(widgetId)
      const { w, h } = WIDGETS[widgetId].size
      const newNode: StampNode = {
        id,
        type: 'widget',
        draggable: false,
        selectable: false,
        focusable: false,
        position: { x: canvasX - w / 2, y: canvasY - h / 2 },
        data: { widgetId, seedKey: id },
      }
      setNodes((cur) => [...cur, newNode])
    },
    [setNodes],
  )

  useImperativeHandle(
    ref,
    () => ({
      placeAtClient(widgetId, clientX, clientY) {
        const el = canvasRef.current
        if (!el) return
        const r = el.getBoundingClientRect()
        if (clientX < r.left || clientX > r.right || clientY < r.top || clientY > r.bottom) return
        appendNode(widgetId, clientX - r.left, clientY - r.top)
      },
    }),
    [appendNode],
  )

  // Stamp-mode ghost: follow cursor while hovering canvas
  useEffect(() => {
    if (!stampingId) {
      setGhost(null)
      return
    }
    const el = canvasRef.current
    if (!el) return

    const seedKey = 'ghost-' + stampingId + '-' + Math.random().toString(36).slice(2, 6)

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      setGhost({ x: e.clientX - r.left, y: e.clientY - r.top, seedKey })
    }
    const onLeave = () => setGhost(null)

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [stampingId])

  const handlePaneClick = useCallback(
    (e: React.MouseEvent) => {
      if (!stampingId) return
      const el = canvasRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      appendNode(stampingId, e.clientX - r.left, e.clientY - r.top)
    },
    [stampingId, appendNode],
  )

  const GhostComp = useMemo(() => (stampingId ? WIDGETS[stampingId].Full : null), [stampingId])
  const ghostSize = stampingId ? WIDGETS[stampingId].size : null

  return (
    <div ref={canvasRef} className={'canvas' + (stampingId ? ' is-stamping' : '')}>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        nodeTypes={NODE_TYPES}
        proOptions={{ hideAttribution: true }}
        nodesDraggable={false}
        nodesConnectable={false}
        nodesFocusable={false}
        elementsSelectable={false}
        panOnDrag={false}
        panOnScroll={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        selectionOnDrag={false}
        preventScrolling={false}
        minZoom={1}
        maxZoom={1}
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
        translateExtent={[
          [-10000, -10000],
          [10000, 10000],
        ]}
        onPaneClick={handlePaneClick}
      />
      {ghost && GhostComp && ghostSize && (
        <div
          className="ghost"
          style={{
            left: ghost.x - ghostSize.w / 2,
            top: ghost.y - ghostSize.h / 2,
          }}
        >
          <GhostComp seedKey={ghost.seedKey} />
        </div>
      )}
    </div>
  )
})

export const Canvas = forwardRef<CanvasHandle, Props>(function Canvas(props, ref) {
  return (
    <ReactFlowProvider>
      <CanvasInner {...props} ref={ref} />
    </ReactFlowProvider>
  )
})
