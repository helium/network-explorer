"use client"

import { gaEvent } from "@/components/GATracker"
import { usePreferences } from "@/context/usePreferences"
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
  const { provider } = usePreferences()

  if (!redirect)
    return (
      <Link className={styles} href="/">
        Exit
      </Link>
    )

  return (
    <a
      className={clsx(
        !provider && "cursor-not-allowed hover:bg-green-400",
        styles
      )}
      href={provider?.getUrl(redirect)}
      target="_"
      onClick={() => {
        if (!!provider) {
          gaEvent({
            action: "outbound_click",
            event: {
              description: provider?.label,
            },
          })
        }
      }}
    >
      View Hotspot
    </a>
  )
}
