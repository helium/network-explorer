"use client"

import { MoonIcon, SunIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"
import { useTheme } from "next-themes"

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex items-center gap-2 pl-2">
      <button
        type="button"
        aria-label="Toggle dark mode"
        className="group flex gap-2"
        onClick={() => setTheme("light")}
      >
        <p
          className={clsx(
            "transition group-hover:text-blue-500 dark:group-hover:text-blue-400",
            theme === "light" ? "text-blue-500 dark:text-blue-400" : ""
          )}
        >
          Light
        </p>
        <SunIcon
          className={clsx(
            "h-6 w-6 transition group-hover:stroke-blue-500 dark:group-hover:stroke-blue-400",
            theme === "light" ? "text-blue-500 dark:text-blue-400" : ""
          )}
        />
      </button>
      <p>-</p>
      <button
        type="button"
        aria-label="Toggle dark mode"
        className="group flex gap-2"
        onClick={() => setTheme("dark")}
      >
        <p
          className={clsx(
            "transition group-hover:text-blue-500 dark:text-blue-400 dark:group-hover:text-blue-400",
            theme === "dark" ? "text-blue-500 dark:text-blue-400" : ""
          )}
        >
          Dark
        </p>
        <MoonIcon
          className={clsx(
            "h-6 w-6 transition group-hover:stroke-blue-500 dark:group-hover:stroke-blue-400",
            theme === "dark" ? "text-blue-500 dark:text-blue-400" : ""
          )}
        />
      </button>
    </div>
  )
}
