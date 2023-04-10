"use client"

import clsx from "clsx"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"
import { NAVIGATION_LINKS } from "./constants"

function NavItem({
  href,
  layoutSegment,
  children,
}: {
  href: string
  layoutSegment: string
  children: React.ReactNode
}) {
  const selectedLayoutSegment = useSelectedLayoutSegment()
  const isActive = selectedLayoutSegment === layoutSegment

  return (
    <li>
      <Link
        href={href}
        className={clsx(
          "relative block px-3 py-2 transition",
          isActive
            ? "text-blue-500 dark:text-blue-400"
            : "hover:text-blue-500 dark:hover:text-blue-400"
        )}
      >
        {children}
        {isActive && (
          <span className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-blue-500/0 via-blue-500/40 to-blue-500/0 dark:from-blue-400/0 dark:via-blue-400/40 dark:to-blue-400/0" />
        )}
      </Link>
    </li>
  )
}

export default function DesktopNavigation(props: { className?: string }) {
  return (
    <nav {...props}>
      <ul className="flex px-3 text-sm font-medium text-zinc-800 dark:text-zinc-200">
        {NAVIGATION_LINKS.map(({ title, href, layoutSegment }) => (
          <NavItem key={href} href={href} layoutSegment={layoutSegment}>
            {title}
          </NavItem>
        ))}
      </ul>
    </nav>
  )
}
