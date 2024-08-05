"use client"

import { NO_PREFERENCE } from "@/app/new/Settings/HotspotProviders"
import { Provider } from "@/app/preferences/components/ProviderList"
import { HotspottyIcon } from "@/components/icons/HotspottyIcon"
import { MokenIcon } from "@/components/icons/MokenIcon"
import { RelayIcon } from "@/components/icons/RelayIcon"
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"

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

export const PROVIDERS: Provider[] = shuffle([
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
])

type PreferencesContext = {
  provider?: Provider
  setProvider: (provider: Provider) => void
  savePreference: boolean
  setSavePreference: (preference: boolean) => void
}

const PreferencesContext = createContext<PreferencesContext>({
  provider: undefined,
  setProvider: () => undefined,
  savePreference: false,
  setSavePreference: () => undefined,
})

const PROVIDER_KEY = "provider"
const SAVE_PREFERENCE = "save_preference"
const VERSION_KEY = "version"
// change version to reset provider preference
const VERSION = "3"

const getProvider = (providerLabel?: string) => {
  return (
    PROVIDERS.find((provider) => provider.label === providerLabel) ||
    NO_PREFERENCE
  )
}

const getLocalValue = (key: string) => {
  if (!window) return undefined
  return localStorage.getItem(key)
}

export const PreferencesProvider = ({ children }: PropsWithChildren) => {
  const localVersion = getLocalValue(VERSION_KEY)

  useEffect(() => {
    if (!!window) localStorage?.setItem(VERSION_KEY, VERSION)
  }, [])

  const [provider, setProvider] = useState(
    localVersion === VERSION
      ? getProvider(getLocalValue(PROVIDER_KEY) || "")
      : NO_PREFERENCE
  )
  const [savePreference, setSavePreference] = useState(
    getLocalValue(SAVE_PREFERENCE) === "true"
  )
  const setSavePreferenceCB = useCallback(
    (preference: boolean) => {
      if (!!window)
        localStorage?.setItem(SAVE_PREFERENCE, preference.toString())
      setSavePreference(preference)
    },
    [setSavePreference]
  )

  const setProviderCB = useCallback(
    (provider: Provider) => {
      if (!!window) localStorage?.setItem(PROVIDER_KEY, provider.label)
      setProvider(provider)
    },
    [setProvider]
  )
  if (!window) return <div>{children}</div>

  return (
    <PreferencesContext.Provider
      value={{
        provider,
        setProvider: setProviderCB,
        savePreference,
        setSavePreference: setSavePreferenceCB,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  )
}

export const usePreferences = () => {
  return useContext(PreferencesContext)
}
