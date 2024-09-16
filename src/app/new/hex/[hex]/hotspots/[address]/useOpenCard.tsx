"use client"

import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react"

type OpenCardContext = {
  openCard: string
  setOpenCard: (openCard: string) => void
}

const OpenCardContext = createContext<OpenCardContext>({
  openCard: "",
  setOpenCard: () => undefined,
})

export const OpenCardProvider = ({ children }: PropsWithChildren) => {
  const [openCard, setOpenCard] = useState("")
  const setOpenCardCb = useCallback((openCardLabel: string) => {
    setOpenCard((currentOpenCard) => {
      if (currentOpenCard === openCardLabel) return ""
      return openCardLabel
    })
  }, [])

  return (
    <OpenCardContext.Provider
      value={{
        openCard,
        setOpenCard: setOpenCardCb,
      }}
    >
      {children}
    </OpenCardContext.Provider>
  )
}

export const useOpenCard = () => {
  return useContext(OpenCardContext)
}
