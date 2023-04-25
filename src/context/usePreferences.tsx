"use client"
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react"

type PreferencesContext = {
  provider: string
  setProvider: (provider: string) => void
}

const PreferencesContext = createContext<PreferencesContext>({
  provider: "",
  setProvider: () => undefined,
})
const PROVIDER_KEY = "provider"

export const PreferencesProvider = ({ children }: PropsWithChildren<{}>) => {
  const [provider, setProvider] = useState(
    !!window ? localStorage.getItem(PROVIDER_KEY) || "" : ""
  )

  const setProviderCB = useCallback(
    (provider: string) => {
      if (!!window) localStorage?.setItem(PROVIDER_KEY, provider)
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
