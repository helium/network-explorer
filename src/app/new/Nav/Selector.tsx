import { ChevronDownIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"
import { ReactElement, useState } from "react"
import styles from "./Nav.module.css"

type Option = {
  Icon?: ReactElement
  name: string
}

export const Selector = ({
  options,
  width,
  isOpen,
  toggle,
}: {
  options: Option[]
  width: string
  isOpen: boolean
  toggle: () => void
}) => {
  const [selected, setSelected] = useState(options[0])

  return (
    <div className={clsx("relative flex justify-between gap-2", width)}>
      <button
        className="group flex w-full items-center justify-between gap-2 rounded-lg p-2 transition hover:bg-[#8A8A8A]/30"
        onClick={toggle}
      >
        <div className="flex items-center gap-2">
          <div className="hidden sm:block">{selected.Icon}</div>
          <p
            className={`text-sm text-[#DBE0E6] opacity-75 transition group-hover:opacity-100`}
          >
            {selected.name}
          </p>
        </div>
        <ChevronDownIcon className="h-3 w-3 stroke-[#DBE0E6] opacity-75 transition group-hover:opacity-100" />
      </button>
      <div
        className={clsx(
          "absolute -left-1 top-12 flex flex-col gap-0.5 rounded-xl bg-[#131313]/60 p-0.5",
          isOpen ? "flex" : "hidden",
          styles.blur
        )}
      >
        {options.map((option) => (
          <button
            className="justify-left group flex items-center gap-2 rounded-lg px-2.5 py-1.5 transition hover:bg-[#8A8A8A]/30"
            key={option.name}
            onClick={() => {
              setSelected(option)
              toggle()
            }}
          >
            <div className="hidden sm:block">{option.Icon}</div>
            <p className="text-sm text-[#DBE0E6] transition group-hover:text-white">
              {option.name}
            </p>
          </button>
        ))}
      </div>
    </div>
  )
}
