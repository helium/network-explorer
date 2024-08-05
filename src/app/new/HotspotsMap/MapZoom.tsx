import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"
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

  const isZoomInDisabled = zoom === MAX_MAP_ZOOM
  const isZoomOutDisabled = zoom === MIN_MAP_ZOOM

  return (
    <div className="absolute right-6 top-24 flex flex-col gap-2">
      <button
        className={clsx(
          "group flex h-10 w-10 items-center justify-center rounded-xl bg-[#131313]/60 backdrop-blur"
        )}
        disabled={isZoomInDisabled}
        onClick={() => map.current?.zoomIn()}
      >
        <PlusIcon
          className={clsx(
            "h-5 w-5 stroke-neutral-200 transition dark:stroke-zinc-400 ",
            !isZoomInDisabled &&
              "group-hover:stroke-zinc-700 group-hover:dark:stroke-zinc-100"
          )}
        />
      </button>
      <button
        className={clsx(
          "group flex h-10 w-10 items-center justify-center rounded-xl bg-[#131313]/60 backdrop-blur"
        )}
        disabled={isZoomOutDisabled}
        onClick={() => map.current?.zoomOut()}
      >
        <MinusIcon
          className={clsx(
            "h-5 w-5 stroke-neutral-200 transition dark:stroke-zinc-400 ",
            !isZoomOutDisabled &&
              "group-hover:stroke-zinc-700 group-hover:dark:stroke-zinc-100"
          )}
        />
      </button>
    </div>
  )
}
