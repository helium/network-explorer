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
}: {
  options: Option[]
  width?: string
}) => {
  const [selected, setSelected] = useState(options[0])
  const [showOptions, setShowOptions] = useState(false)

  return (
    <div className={clsx("relative flex justify-between gap-2", width)}>
      <button
        className="group flex w-full items-center justify-between gap-2 rounded-lg p-2 transition hover:bg-[#8A8A8A]/30"
        onClick={() => setShowOptions((current) => !current)}
      >
        <div className="flex items-center gap-2">
          {selected.Icon}
          <p
            className={`text-sm text-[#DBE0E6] opacity-75 transition group-hover:opacity-100 ${styles.text}`}
          >
            {selected.name}
          </p>
        </div>
        <ChevronDownIcon className="h-3 w-3 stroke-[#DBE0E6] opacity-75 transition group-hover:opacity-100" />
      </button>
      <div
        className={clsx(
          "absolute -left-3 top-12 flex flex-col gap-0.5 rounded-xl bg-[#131313]/60 p-0.5",
          showOptions ? "flex" : "hidden",
          styles.blur
        )}
      >
        {options.map((network) => (
          <button
            className="justify-left group flex items-center gap-2 rounded-lg px-2.5 py-1.5 transition hover:bg-[#8A8A8A]/30"
            key={network.name}
            onClick={() => {
              setSelected(network)
              setShowOptions(false)
            }}
          >
            {network.Icon}
            <p className="text-sm text-[#DBE0E6] transition group-hover:text-white">
              {network.name}
            </p>
          </button>
        ))}
      </div>
    </div>
  )
}
