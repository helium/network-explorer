"use client"

import clsx from "clsx"
import { PropsWithChildren, useState } from "react"
import styles from "./InfoWrapper.module.css"

export const InfoWrapper = ({ children }: PropsWithChildren) => {
  const [isOpen, setOpen] = useState(false)

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
        onClick={() => setOpen((currentIsOpen) => !currentIsOpen)}
      >
        <div className="h-1 w-36 bg-[#FFFFFF]/40" />
      </button>
      {children}
    </div>
  )
}
