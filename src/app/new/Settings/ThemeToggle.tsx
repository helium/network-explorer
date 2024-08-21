"use client"

import { RadioCircles } from "@/components/shared/RadioCircles"
import {
  ComputerDesktopIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline"
import clsx from "clsx"
import { useTheme } from "next-themes"

const THEMES = [
  {
    label: "Toggle dark mode",
    value: "dark",
    Icon: <MoonIcon className={clsx("h-6 w-6 stroke-[#DBE0E6]")} />,
  },
  {
    label: "Toggle light mode",
    value: "light",
    Icon: <SunIcon className={clsx("h-6 w-6 stroke-[#DBE0E6]")} />,
  },
  {
    label: "Toggle browser settings",
    value: "system",
    Icon: <ComputerDesktopIcon className={clsx("h-6 w-6 stroke-[#DBE0E6]")} />,
  },
]

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()
  return (
    <div className="flex h-full flex-col justify-center gap-3">
      <p className="text-2xl font-medium leading-8 text-white">Select a mode</p>
      {THEMES.map(({ label, Icon, value }) => {
        const isActive = value === theme
        return (
          <button
            type="button"
            key={label}
            className={clsx(
              "group flex items-center gap-4 rounded-xl border border-[#7C7E81]/30 p-1 hover:opacity-100",
              isActive ? "bg-[#131313]/75" : "opacity-80"
            )}
          >
            <div className="flex w-full items-center gap-4 rounded-xl p-3 group-hover:bg-[#8A8A8A]/20">
              <div
                aria-label={`Select ${label}`}
                className={clsx("flex w-full gap-2")}
                onClick={() => setTheme(value)}
              >
                {Icon}
                <p className={clsx("text-[#DBE0E6]/80")}>{label}</p>
              </div>
              <RadioCircles isActive={isActive} />
            </div>
          </button>
        )
      })}
    </div>
  )
}
