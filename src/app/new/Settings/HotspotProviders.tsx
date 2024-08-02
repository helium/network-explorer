import { HotspottyIcon } from "@/components/icons/HotspottyIcon"
import { MokenIcon } from "@/components/icons/MokenIcon"
import { RelayIcon } from "@/components/icons/RelayIcon"
import { usePreferences } from "@/context/usePreferences"
import clsx from "clsx"
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

export const NO_PREFERENCE: Provider = {
  Icon: (
    <div className="flex flex-col justify-center gap-1">
      <div className="h-2 w-6 rounded-sm border-2 border-neutral-200 transition group-hover:border-blue-400" />
      <div className="h-2 w-6 rounded-sm border-2 border-neutral-200 transition group-hover:border-blue-400" />
    </div>
  ),
  label: "Ask me before opening",
  getUrl: () => "",
}

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

type HotspotProvidersProps = {
  address?: string
  close?: () => void
}

export const HotspotProviders = ({ address, close }: HotspotProvidersProps) => {
  const { provider, setProvider, savePreference, setSavePreference } =
    usePreferences()
  const providers = useMemo(() => {
    const shuffledProviders = [...shuffle(PROVIDERS)]
    if (!address) shuffledProviders.push(NO_PREFERENCE)
    return shuffledProviders
  }, [address])

  return (
    <>
      <p className="text-lg font-medium text-neutral-200">
        Select a Third-Party Explorer
      </p>
      <p className="text-sm text-neutral-200">
        You will be redirected to a external page to Helium if you need more
        information about the Hotspot.
      </p>
      {!!address && (
        <label className="group flex cursor-pointer items-center gap-2">
          <input
            className="h-[18px] w-[18px]  rounded-sm border border-neutral-200 bg-transparent checked:border checked:border-neutral-200 checked:bg-transparent"
            type="checkbox"
            checked={savePreference}
            onChange={() => setSavePreference(!savePreference)}
          />
          <p className="text-sm text-neutral-200 group-hover:text-neutral-100">
            Set as default third-party explorer.
          </p>
        </label>
      )}
      {providers.map((providerItem) => {
        const { label, Icon } = providerItem
        const isActive = provider?.label === label
        return (
          <button
            type="button"
            key={label}
            className={clsx(
              "group flex items-center gap-4 rounded-xl border border-neutral-200 bg-[#131313]/60 p-4",
              !isActive && "opacity-50",
              "transition hover:border-blue-400 hover:opacity-100"
            )}
            onClick={() => {
              const shouldSetProvider = !address || savePreference
              if (shouldSetProvider) setProvider(providerItem)
              if (address) {
                window.open(providerItem.getUrl(address))
                if (!!close) close()
              }
            }}
            aria-label={`Select ${label}`}
          >
            <div className={clsx("group flex w-full gap-2")}>
              {Icon}
              <p
                className={clsx(
                  "text-neutral-200 transition group-hover:text-blue-500 dark:group-hover:text-blue-400"
                )}
              >
                {label}
              </p>
            </div>
            {!address && (
              <div className="flex items-center justify-center rounded-full border border-neutral-200 p-0.5">
                <div
                  className={clsx(
                    "h-3 w-3 rounded-full ",
                    isActive && "bg-neutral-200"
                  )}
                />
              </div>
            )}
          </button>
        )
      })}
    </>
  )
}
