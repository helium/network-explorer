"use client"

import { MoonIcon, SunIcon } from "@heroicons/react/24/outline"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      className="group py-2"
      onClick={() => (theme == "dark" ? setTheme("light") : setTheme("dark"))}
    >
      <SunIcon className="h-6 w-6 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:hidden" />
      <MoonIcon className="hidden h-6 w-6 transition dark:block dark:stroke-zinc-400 group-hover:dark:stroke-zinc-100" />
    </button>
  )
}
