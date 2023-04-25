"use client"

import { HotspottyIcon } from "@/components/icons/HotspottyIcon"
import { usePreferences } from "@/context/usePreferences"
import clsx from "clsx"

const PROVIDERS = [
  {
    Icon: <HotspottyIcon className="h-6 w-6 text-[#9546ea]" />,
    label: "Hotspotty",
  },
  {
    Icon: <HotspottyIcon className="h-6 w-6 text-[#9546ea]" />,
    label: "Relay",
  },
]

const PROVIDER_KEY = "provider"

export const ProviderList = () => {
  const { provider, setProvider } = usePreferences()

  return (
    <div className="flex-col gap-2 gap-y-4 pl-2">
      {PROVIDERS.map(({ label, Icon }) => {
        const active = provider === label
        return (
          <button
            key={label}
            type="button"
            aria-label="Select Hotspotty"
            className={clsx(
              "group my-2 flex w-full gap-2 rounded border p-2",
              active ? "border-green-500" : "border"
            )}
            onClick={() => {
              localStorage.setItem(PROVIDER_KEY, label)
              setProvider(label)
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
