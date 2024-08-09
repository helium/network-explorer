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
    Icon: (
      <MoonIcon
        className={clsx(
          "h-6 w-6 stroke-neutral-200 transition group-hover:stroke-blue-500 dark:group-hover:stroke-blue-400"
        )}
      />
    ),
  },
  {
    label: "Toggle light mode",
    value: "light",
    Icon: (
      <SunIcon
        className={clsx(
          "h-6 w-6 stroke-neutral-200 transition group-hover:stroke-blue-500 dark:group-hover:stroke-blue-400"
        )}
      />
    ),
  },
  {
    label: "Toggle browser settings",
    value: "system",
    Icon: (
      <ComputerDesktopIcon
        className={clsx(
          "h-6 w-6 stroke-neutral-200 transition group-hover:stroke-blue-500 dark:group-hover:stroke-blue-400"
        )}
      />
    ),
  },
]

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()
  return (
    <>
      <p className="text-lg font-medium text-[#DBE0E6]">Select a mode</p>
      {THEMES.map(({ label, Icon, value }) => {
        const isActive = value === theme
        return (
          <button
            type="button"
            key={label}
            className={clsx(
              "group flex items-center gap-4 rounded-xl bg-[#131313]/60 p-4 hover:opacity-100",
              !isActive && "opacity-50"
            )}
          >
            <div
              aria-label={`Select ${label}`}
              className={clsx("flex w-full gap-2")}
              onClick={() => setTheme(value)}
            >
              {Icon}
              <p
                className={clsx(
                  "text-white transition group-hover:text-blue-500 dark:group-hover:text-blue-400"
                )}
              >
                {label}
              </p>
            </div>
            <RadioCircles isActive={isActive} />
          </button>
        )
      })}
    </>
  )
}
