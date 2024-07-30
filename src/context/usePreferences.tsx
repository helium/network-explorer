"use client"
import { NO_PREFERENCE } from "@/app/new/Settings/HotspotProviders"
import { PROVIDERS, Provider } from "@/app/preferences/components/ProviderList"
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"

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
