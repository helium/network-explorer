"use client"
import { PROVIDERS, Provider } from "@/app/preferences/components/ProviderList"
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react"

type PreferencesContext = {
  provider?: Provider
  setProvider: (provider: Provider) => void
}

const PreferencesContext = createContext<PreferencesContext>({
  provider: undefined,
  setProvider: () => undefined,
})
const PROVIDER_KEY = "provider"

const getProvider = (providerLabel: string) => {
  return PROVIDERS.find((provider) => provider.label === providerLabel)
}

export const PreferencesProvider = ({ children }: PropsWithChildren<{}>) => {
  const [provider, setProvider] = useState(
    !!window ? getProvider(localStorage.getItem(PROVIDER_KEY) || "") : undefined
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
      }}
    >
      {children}
    </PreferencesContext.Provider>
  )
}

export const usePreferences = () => {
  return useContext(PreferencesContext)
}
