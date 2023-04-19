import { Container } from "@/components/Container"
import clsx from "clsx"
import Link from "next/link"
import { GitHubIcon } from "../icons/GithubIcon"
import { HeliumIcon } from "../icons/HeliumIcon"
import { DesktopNavigation } from "./DesktopNavigation"
import { HotspotSearch } from "./HotspotSearch"
import { MobileNavigation } from "./MobileNavigation"
import { ThemeToggle } from "./ThemeToggle"

function Logo({ className, ...props }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Home"
      className={clsx(className, "pointer-events-auto")}
      {...props}
    >
      <div className="group flex items-center gap-2">
        <HeliumIcon className="h-7 w-7 fill-zinc-600 transition group-hover:fill-zinc-800 dark:fill-zinc-200 dark:group-hover:fill-zinc-100" />
        <div className="text-lg tracking-tight text-zinc-600 transition group-hover:text-zinc-700 dark:text-zinc-200 group-hover:dark:text-zinc-100 sm:text-xl">
          Explorer
        </div>
      </div>
    </Link>
  )
}

export function Header() {
  return (
    <header className="fixed bottom-0 z-50 h-24 sm:bottom-auto sm:pt-6">
      <Container className="fixed w-full">
        <div className="relative flex gap-4 rounded-xl bg-white/30 px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/30 dark:text-zinc-200 dark:ring-white/10">
          <div className="flex flex-1 items-center">
            <Logo />
          </div>
          <div className="flex-2 flex justify-end md:justify-center">
            <MobileNavigation className="pointer-events-auto md:hidden" />
            <DesktopNavigation className="pointer-events-auto hidden md:block" />
          </div>
          <div className="flex justify-end gap-4 md:flex-1">
            <div className="pointer-events-auto">
              <HotspotSearch />
            </div>
            <div className="pointer-events-auto">
              <ThemeToggle />
            </div>
            <div className="pointer-events-auto hidden py-2 sm:block">
              <Link
                href="https://github.com/helium/network-explorer"
                className="group"
                target="_blank"
                aria-label="GitHub"
              >
                <GitHubIcon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-700 dark:fill-zinc-400 group-hover:dark:fill-zinc-100" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </header>
  )
}
