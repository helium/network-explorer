"use client"

import clsx from "clsx"
import { PropsWithChildren, createContext, useContext, useState } from "react"
import styles from "./InfoWrapper.module.css"

type InfoWrapperContext = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const InfoWrapperContext = createContext<InfoWrapperContext>({
  isOpen: false,
  setIsOpen: () => undefined,
})

const InfoWrapperProvider = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <InfoWrapperContext.Provider
      value={{
        isOpen,
        setIsOpen: setIsOpen,
      }}
    >
      {children}
    </InfoWrapperContext.Provider>
  )
}

export const useInfoWrapper = () => {
  return useContext(InfoWrapperContext)
}

export const InfoWrapperComponent = ({ children }: PropsWithChildren) => {
  const { isOpen, setIsOpen } = useInfoWrapper()

  return (
    <div
      className={clsx(
        `absolute w-full ${styles.wrapper} overflow-hidden scroll-auto rounded-xl hover:overflow-auto`,
        "sm:left-6 sm:top-24 sm:h-auto sm:w-80 sm:bg-inherit sm:backdrop-blur-none",
        "bottom-0 w-full bg-[#131313]/75 backdrop-blur transition-all",
        isOpen ? "h-2/3" : "h-1/3"
      )}
    >
      <button
        className="flex w-full justify-center py-4 sm:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="h-1 w-36 rounded-xl bg-[#FFFFFF]/40" />
      </button>
      {children}
    </div>
  )
}

export const InfoWrapper = ({ children }: PropsWithChildren) => {
  return (
    <InfoWrapperProvider>
      <InfoWrapperComponent>{children}</InfoWrapperComponent>
    </InfoWrapperProvider>
  )
}
