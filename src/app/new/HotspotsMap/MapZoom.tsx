import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline"
import { useEffect, useState } from "react"
import { useMap } from "react-map-gl"
import { MAX_MAP_ZOOM, MIN_MAP_ZOOM } from "./utils"

export const MapZoom = () => {
  const map = useMap()
  const [_currentZoom, setCurrentZoom] = useState(map.current?.getZoom())
  const zoom = map.current?.getZoom()
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentZoom(map.current?.getZoom())
    }, 250)
    return () => clearInterval(interval)
  }, [map, setCurrentZoom])

  return (
    <div className="absolute right-6 top-24 flex flex-col gap-2">
      <button
        className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#131313]/60"
        disabled={zoom === MAX_MAP_ZOOM}
        onClick={() => map.current?.zoomIn()}
      >
        <PlusIcon className="h-5 w-5 stroke-neutral-200 transition group-hover:stroke-zinc-700 dark:stroke-zinc-400 group-hover:dark:stroke-zinc-100" />
      </button>
      <button
        className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#131313]/60"
        disabled={zoom === MIN_MAP_ZOOM}
        onClick={() => map.current?.zoomOut()}
      >
        <MinusIcon className="h-5 w-5 stroke-neutral-200 transition group-hover:stroke-zinc-700 dark:stroke-zinc-400 group-hover:dark:stroke-zinc-100" />
      </button>
    </div>
  )
}
