"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { GA_ID, IS_PROD } from "./GAScript"

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
const gaPageview = (url: string) => {
  if (!window || !GA_ID || !IS_PROD) return
  if (!!window?.gtag) {
    window?.gtag("config", GA_ID, {
      page_path: url,
    })
  }
}

type GTEventNames = Gtag.EventNames | "map_load"
// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const gaEvent = ({
  action,
  event,
}: {
  action: GTEventNames
  event?: Gtag.EventParams
}) => {
  if (!window || !IS_PROD) return

  if (!!window?.gtag) window?.gtag("event", action, event)
}

const useGA = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const url = pathname + searchParams.toString()
    gaPageview(url)
  }, [pathname, searchParams])
}

export const GATracker = () => {
  useGA()
  return null
}
