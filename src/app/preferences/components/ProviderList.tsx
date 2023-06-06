"use client"

import { HotspottyIcon } from "@/components/icons/HotspottyIcon"
import { MokenIcon } from "@/components/icons/MokenIcon"
import { usePreferences } from "@/context/usePreferences"
import clsx from "clsx"

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
    Icon: <MokenIcon className="h-6 w-6 text-[#9546ea]" />,
    label: "Moken",
    getUrl: (hotspotId: string) =>
      `https://explorer.moken.io/hotspots/${hotspotId}`,
  },
]

const PROVIDER_KEY = "provider"

export const ProviderList = () => {
  const { provider, setProvider } = usePreferences()

  return (
    <div className="flex-col gap-2 gap-y-4 pl-2">
      {PROVIDERS.map((providerItem) => {
        const { label, Icon } = providerItem
        const active = provider?.label === label
        return (
          <button
            key={label}
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
        )
      })}
    </div>
  )
}
