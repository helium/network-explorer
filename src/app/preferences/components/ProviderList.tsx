"use client"

import { gaEvent } from "@/components/GATracker"
import { HotspottyIcon } from "@/components/icons/HotspottyIcon"
import { MokenIcon } from "@/components/icons/MokenIcon"
import { RelayIcon } from "@/components/icons/RelayIcon"
import { usePreferences } from "@/context/usePreferences"
import clsx from "clsx"
import { useSearchParams } from "next/navigation"
import { useMemo } from "react"

export type Provider = {
  Icon: JSX.Element
  label: string
  getUrl: (hotspotId: string) => string
}

export const PROVIDERS: Provider[] = [
  {
    Icon: <HotspottyIcon className="h-6 w-6 text-[#9546ea]" />,
    label: "Hotspotty",
    getUrl: (hotspotId: string) =>
      `https://app.hotspotty.net/hotspots/${hotspotId}/rewards`,
  },
  {
    Icon: <MokenIcon />,
    label: "Moken",
    getUrl: (hotspotId: string) =>
      `https://explorer.moken.io/hotspots/${hotspotId}`,
  },
  {
    Icon: <RelayIcon />,
    label: "Relay",
    getUrl: (hotspotId: string) =>
      `https://explorer.relaywireless.com/hotspots/${hotspotId}`,
  },
]

const shuffle = <T,>(arr: T[]) => {
  let i = arr.length,
    j,
    temp
  while (--i > 0) {
    j = Math.floor(Math.random() * (i + 1))
    temp = arr[j]
    arr[j] = arr[i]
    arr[i] = temp
  }
  return arr
}

const PROVIDER_KEY = "provider"
const DEFAULT_HOTSPOT_KEY =
  "112Y5Vn5wzsreeyCijSEiBWHJekJPJCELvvm9615GvVGWKfu99Ta"

export const ProviderList = () => {
  const { provider, setProvider } = usePreferences()
  const searchParams = useSearchParams()
  const hotspotKey = searchParams.get("redirect") || DEFAULT_HOTSPOT_KEY

  const providers = useMemo(() => shuffle(PROVIDERS), [])

  return (
    <div className="flex-col gap-2 gap-y-4 pl-2">
      {providers.map((providerItem) => {
        const { label, Icon } = providerItem
        const active = provider?.label === label
        return (
          <div key={label} className="flex items-center gap-4">
            <button
              type="button"
              aria-label="Select Hotspotty"
              className={clsx(
                "group my-2 flex w-full gap-2 rounded border p-2",
                active ? "border-blue-500 dark:border-blue-400" : "border"
              )}
              onClick={() => {
                localStorage.setItem(PROVIDER_KEY, label)
                setProvider(providerItem)
              }}
            >
              {Icon}
              <p
                className={clsx(
                  "transition group-hover:text-blue-500 dark:group-hover:text-blue-400"
                )}
              >
                {label}
              </p>
            </button>
            <a
              className={""}
              href={providerItem?.getUrl(hotspotKey)}
              target="_"
              onClick={() => {
                if (!!provider) {
                  gaEvent({
                    action: "outbound_click",
                    event: {
                      description: provider?.label,
                    },
                  })
                }
              }}
            >
              Preview
            </a>
          </div>
        )
      })}
    </div>
  )
}
