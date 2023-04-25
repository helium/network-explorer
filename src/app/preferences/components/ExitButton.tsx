"use client"

import clsx from "clsx"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

const styles = clsx(
  "rounded-md border px-4 py-2",
  "border-zinc-900/5 bg-green-400 text-white hover:bg-green-500",
  "dark:border-white/10"
)

export const ExitButton = () => {
  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirect")

  if (!redirect)
    return (
      <Link className={styles} href="/">
        Exit
      </Link>
    )

  return (
    <a
      className={styles}
      href={`https://app.hotspotty.net/${redirect}/rewards`}
      target="_"
    >
      View Hotspot
    </a>
  )
}
