"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { GA_ID, IS_PROD } from "./GAScript"

type GTEventNames = Gtag.EventNames | "map_load" | "outbound_click"
// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const gaEvent = ({
  action,
  event,
}: {
  action: GTEventNames
  event?: Gtag.EventParams
}) => {
  if (!window || !IS_PROD) return

  if (!!window?.gtag) {
    window?.gtag("event", action, event)
  }
}

const useGA = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!window || !GA_ID || !IS_PROD) return
    const url = pathname + searchParams.toString()
    if (!!window?.gtag) {
      window?.gtag("config", GA_ID, {
        page_path: url,
      })
    }
  }, [pathname, searchParams])
}

export const GATracker = () => {
  useGA()
  return null
}
