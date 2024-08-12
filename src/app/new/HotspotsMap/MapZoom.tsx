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
    <div
      className={clsx(
        "absolute flex gap-2",
        "bottom-[72px] right-4",
        "sm:right-6 sm:top-24 sm:flex-col"
      )}
    >
      <button
        className={clsx(
          "group flex h-10 w-10 items-center justify-center rounded-xl bg-[#131313]/60 backdrop-blur"
        )}
        disabled={isZoomInDisabled}
        onClick={() => map.current?.zoomIn()}
      >
        <PlusIcon
          className={clsx(
            "h-8 w-8 rounded-lg stroke-[#DBE0E6] p-1.5 opacity-75 transition group-disabled:stroke-[#64686D]",
            !isZoomInDisabled &&
              "group-hover:bg-[#8A8A8A]/20 group-hover:stroke-white group-hover:opacity-100",
            isZoomOutDisabled && "cursor-not-allowed"
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
            "h-8 w-8 rounded-lg stroke-[#DBE0E6] p-1.5 opacity-75 transition group-disabled:stroke-[#64686D]",
            !isZoomOutDisabled &&
              "group-hover:bg-[#8A8A8A]/20 group-hover:stroke-white group-hover:opacity-100",
            isZoomOutDisabled && "cursor-not-allowed"
          )}
        />
      </button>
    </div>
  )
}
