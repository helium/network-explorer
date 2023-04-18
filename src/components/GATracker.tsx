"use client"

import { useRouter } from "next/router"
import { useEffect } from "react"
import { GA_ID, IS_PROD } from "./GAScript"

const useGA = () => {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (!IS_PROD) return null
      window.gtag("config", GA_ID, {
        page_path: url,
      })
    }
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on("routeChangeComplete", handleRouteChange)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange)
    }
  }, [router.events])
}

type GTEventNames = Gtag.EventNames | "map_load"

export const trackEvent = (action: GTEventNames) => {
  if (!window || !GA_ID || !IS_PROD) return
  window.gtag("event", action)
}

export default useGA
