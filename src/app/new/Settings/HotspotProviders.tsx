import { RadioCircles } from "@/components/shared/RadioCircles"
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
      <div className="h-2 w-6 rounded-sm border-2 border-neutral-200" />
      <div className="h-2 w-6 rounded-sm border-2 border-neutral-200" />
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
    <div className="flex h-full flex-col justify-center">
      <p
        className={clsx(
          "text-2xl font-medium leading-8 text-white",
          !address && "mb-4"
        )}
      >
        Select a Third-Party Explorer
      </p>
      <div className="mt-1.5 flex flex-col gap-6">
        {!!address && (
          <>
            <p className="text-base leading-5 text-[#DBE0E6] opacity-75">
              You will be redirected to a external page to Helium if you need
              more information about the Hotspot.
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
                  "group rounded-xl border border-[#7C7E81]/30 p-1 transition hover:border-[#7C7E81] hover:opacity-100",
                  isActive ? "bg-[#131313]/75" : "opacity-80"
                )}
                onClick={() => {
                  const shouldSetProvider = !address || savePreference
                  if (shouldSetProvider) setProvider(providerItem)
                  if (address) {
                    window.open(providerItem.getUrl(address))
                    if (!!close) close()
                  } else {
                    if (providerItem.label === NO_PREFERENCE.label && !!close) {
                      close()
                    }
                  }
                }}
                aria-label={`Select ${label}`}
              >
                <div className="flex items-center gap-4 rounded-lg p-4 transition group-hover:bg-[#8A8A8A]/20">
                  <div className={clsx("group flex w-full gap-2")}>
                    {Icon}
                    <p className={clsx("font-medium text-[#DBE0E6]")}>
                      {label}
                    </p>
                  </div>
                  <RadioCircles isActive={isActive} />
                </div>
              </button>
            )
          })}
        </div>
        {!!address && (
          <p className="text-base leading-5 text-[#DBE0E6] opacity-75">
            You can change this selection from Settings.
          </p>
        )}
      </div>
    </div>
  )
}
