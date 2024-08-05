import { PROVIDERS, usePreferences } from "@/context/usePreferences"
import clsx from "clsx"
import { useMemo } from "react"

export type Provider = {
  Icon: JSX.Element
  label: string
  getUrl: (hotspotId: string) => string
}

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

type HotspotProvidersProps = {
  address?: string
  close?: () => void
}

export const HotspotProviders = ({ address, close }: HotspotProvidersProps) => {
  const { provider, setProvider, savePreference, setSavePreference } =
    usePreferences()
  const providers = useMemo(() => {
    const providers = [...PROVIDERS]
    if (!address) providers.push(NO_PREFERENCE)
    return providers
  }, [address])

  return (
    <div className="flex flex-col gap-6">
      <p className="text-2xl font-medium leading-6 text-white">
        Select a Third-Party Explorer
      </p>
      {!!address && (
        <>
          <p className="text-base leading-5 text-white opacity-80">
            You will be redirected to a external page to Helium if you need more
            information about the Hotspot.
          </p>
          <label className="group flex cursor-pointer items-center gap-2 opacity-80 hover:opacity-100">
            <input
              className="h-[18px] w-[18px] rounded-sm border border-white bg-transparent checked:border checked:border-white checked:bg-transparent"
              type="checkbox"
              checked={savePreference}
              onChange={() => setSavePreference(!savePreference)}
            />
            <p className="text-base leading-4 text-white">
              Set as default third-party explorer.
            </p>
          </label>
        </>
      )}
      <div className="flex flex-col gap-4">
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
                    "font-medium text-[#DBE0E6] transition group-hover:text-blue-500 dark:group-hover:text-blue-400"
                  )}
                >
                  {label}
                </p>
              </div>
              {!address && (
                <div className="flex items-center justify-center rounded-full border border-[#DBE0E6] p-0.5">
                  <div
                    className={clsx(
                      "h-3 w-3 rounded-full ",
                      isActive && "bg-[#DBE0E6]"
                    )}
                  />
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
