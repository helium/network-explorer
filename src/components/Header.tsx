"use client"

import { Container } from "@/components/Container"
import { Popover, Transition } from "@headlessui/react"
import { MoonIcon, SunIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { ChevronDownIcon } from "@heroicons/react/24/solid"
import clsx from "clsx"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"
import { Fragment } from "react"
import GitHubIcon from "./GithubIcon"
import HeliumIcon from "./HeliumIcon"

const NAVIGATION_LINKS = [
  { title: "Hotspot Map", href: "/" },
  { title: "Network Stats", href: "/network-stats" },
]

function MobileNavigation(props: { className?: string }) {
  return (
    <Popover {...props}>
      <Popover.Button className="group flex items-center px-4 py-2 text-sm font-medium text-zinc-800 dark:text-zinc-200">
        Menu
        <ChevronDownIcon className="ml-3 h-auto w-2 stroke-zinc-500 group-hover:stroke-zinc-700 dark:group-hover:stroke-zinc-400" />
      </Popover.Button>
      <Transition.Root>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Popover.Overlay className="fixed inset-0 z-50 bg-zinc-800/40 backdrop-blur-sm dark:bg-black/80" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="fixed inset-x-4 top-8 z-50 origin-top rounded-3xl bg-white p-8 ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-zinc-800"
          >
            <div className="flex flex-row-reverse items-center justify-between">
              <Popover.Button aria-label="Close menu" className="-m-1 p-1">
                <XMarkIcon className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />
              </Popover.Button>
              <h2 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                Navigation
              </h2>
            </div>
            <nav className="mt-6">
              <ul className="-my-2 divide-y divide-zinc-100 text-base text-zinc-800 dark:divide-zinc-100/5 dark:text-zinc-300">
                {NAVIGATION_LINKS.map(({ title, href }) => (
                  <li key={href}>
                    <Popover.Button
                      as={Link}
                      href={href}
                      className="block py-2"
                    >
                      {title}
                    </Popover.Button>
                  </li>
                ))}
              </ul>
            </nav>
          </Popover.Panel>
        </Transition.Child>
      </Transition.Root>
    </Popover>
  )
}

function NavItem({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  const activeSegment = useSelectedLayoutSegment()
  const isActive = `/${activeSegment ?? ""}` === href

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

function DesktopNavigation(props: { className?: string }) {
  return (
    <nav {...props}>
      <ul className="flex px-3 text-sm font-medium text-zinc-800 dark:text-zinc-200">
        {NAVIGATION_LINKS.map(({ title, href }) => (
          <NavItem key={href} href={href}>
            {title}
          </NavItem>
        ))}
      </ul>
    </nav>
  )
}

function ThemeToggle() {
  function disableTransitionsTemporarily() {
    document.documentElement.classList.add("[&_*]:!transition-none")
    window.setTimeout(() => {
      document.documentElement.classList.remove("[&_*]:!transition-none")
    }, 0)
  }

  function toggleTheme() {
    disableTransitionsTemporarily()

    let darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    let isSystemDarkMode = darkModeMediaQuery.matches
    let isDarkMode = document.documentElement.classList.toggle("dark")

    if (isDarkMode === isSystemDarkMode) {
      delete window.localStorage.isDarkMode
    } else {
      window.localStorage.isDarkMode = isDarkMode
    }
  }

  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      className="group py-2"
      onClick={toggleTheme}
    >
      <SunIcon className="h-6 w-6 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:hidden" />
      <MoonIcon className="hidden h-6 w-6 transition dark:block dark:stroke-zinc-400 group-hover:dark:stroke-zinc-100" />
    </button>
  )
}

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

export default function Header() {
  return (
    <header className="fixed z-10 h-24 pt-6">
      <Container className="fixed w-full">
        <div className="relative flex gap-4 rounded-xl bg-white/30 px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/30 dark:text-zinc-200 dark:ring-white/10">
          <div className="flex flex-1 items-center">
            <Logo />
          </div>
          <div className="flex flex-1 justify-end md:justify-center">
            <MobileNavigation className="pointer-events-auto md:hidden" />
            <DesktopNavigation className="pointer-events-auto hidden md:block" />
          </div>
          <div className="flex justify-end gap-4 md:flex-1">
            <div className="pointer-events-auto">
              <ThemeToggle />
            </div>
            <div className="pointer-events-auto py-2">
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
