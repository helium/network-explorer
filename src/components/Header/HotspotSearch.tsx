"use client"

import { Combobox, Dialog, Transition } from "@headlessui/react"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid"
import clsx from "clsx"
import { isValidCell } from "h3-js"
import { useRouter } from "next/navigation"
import { Fragment, useCallback, useState } from "react"
import { useDebouncedCallback } from "use-debounce"
import { Hotspot } from "../HotspotsMap/HexHotspots"
import { HeliumIotIcon } from "../icons/HeliumIotIcon"
import { HeliumMobileIcon } from "../icons/HeliumMobileIcon"
import { LoadingIcon } from "../icons/LoadingIcon"

let controller: AbortController | null = null

const RESULTS_LIMIT = 20

export function HotspotSearch() {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)
  const [searchResults, setSearchResults] = useState<Hotspot[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const searchItemByQuery = useCallback(async (query: string) => {
    if (controller) controller.abort()

    controller = new AbortController()
    const signal = controller.signal

    setSearchResults([])

    if (!query) return null

    setIsLoading(true)

    try {
      const searchUrl = new URL(
        `${process.env.NEXT_PUBLIC_HELIUMGEEK_EXPLORER_API2_URL}`
      )
      searchUrl.searchParams.append("name", query.trim())

      const results = (await fetch(searchUrl, {
        signal,
        next: { revalidate: 10 },
        headers: {
          "x-api-key": `${process.env.NEXT_PUBLIC_HELIUMGEEK_EXPLORER_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }).then((res) => res.json())) as Hotspot[]

      setSearchResults(results)
      setIsLoading(false)
    } catch {
      setIsLoading(false)
    }
  }, [])

  const onChangeSearch = useDebouncedCallback((query: string) => {
    if (query.length === 15 && isValidCell(query)) {
      router.push(`/hex/${query}`)
      setOpen(false)
      clearSearchModal()
    } else {
      searchItemByQuery(query)
    }
  }, 400)

  const clearSearchModal = useCallback(() => {
    setQuery("")
    setSearchResults([])
    setIsLoading(false)
  }, [])

  const handleHotspotSelection = useCallback(
    (hotspot: Hotspot) => {
      router.push(`/hex/${hotspot.location.hex}`)
      setOpen(false)
    },
    [router]
  )

  return (
    <>
      <button
        type="button"
        aria-label="Open Hotspot search"
        className="group py-2"
        onClick={() => setOpen(true)}
      >
        <MagnifyingGlassIcon className="h-6 w-6 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-400 group-hover:dark:stroke-zinc-100" />
      </button>

      <Transition.Root
        show={open}
        as={Fragment}
        appear
        afterLeave={clearSearchModal}
      >
        <Dialog as="div" className="relative z-50" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto p-4 sm:p-6 md:p-24">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="mx-auto max-w-2xl transform divide-y divide-gray-500 divide-opacity-10 overflow-hidden rounded-xl bg-white bg-opacity-80 shadow-2xl transition-all dark:divide-opacity-20 dark:bg-gray-900 dark:bg-opacity-100">
                <Combobox onChange={handleHotspotSelection}>
                  <div className="relative">
                    {isLoading ? (
                      <LoadingIcon className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 animate-spin text-gray-900 text-opacity-40 dark:text-gray-500 dark:text-opacity-100" />
                    ) : (
                      <MagnifyingGlassIcon
                        className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-900 text-opacity-40 dark:text-gray-500 dark:text-opacity-100"
                        aria-hidden="true"
                      />
                    )}

                    <Combobox.Input
                      className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 focus:ring-0 dark:text-white sm:text-sm"
                      placeholder="Search Hotspot by name..."
                      type="search"
                      onChange={(event) => {
                        const value = event.target.value
                        setQuery(value)
                        onChangeSearch.call(null, value)
                      }}
                    />
                  </div>

                  {searchResults.length > 0 && (
                    <Combobox.Options
                      static
                      className="max-h-80 scroll-py-2 divide-y divide-gray-500 divide-opacity-10 overflow-y-auto dark:divide-opacity-20"
                    >
                      <li className="p-2">
                        <ul className="text-sm text-gray-700 dark:text-gray-400">
                          {searchResults
                            .slice(0, RESULTS_LIMIT)
                            .map((hotspot) => {
                              const { cbrs, wifi, mobile } =
                                hotspot.capabilities
                              const isMobile = cbrs || wifi || mobile
                              const Avatar = isMobile
                                ? HeliumMobileIcon
                                : HeliumIotIcon
                              return (
                                <Combobox.Option
                                  key={hotspot.address}
                                  value={hotspot}
                                  className={({ active }) =>
                                    clsx(
                                      "flex cursor-pointer select-none items-center rounded-md px-3 py-3",
                                      active &&
                                        "bg-gray-900 bg-opacity-5 text-gray-900 dark:bg-gray-800 dark:bg-opacity-100 dark:text-white"
                                    )
                                  }
                                >
                                  {({ active }) => (
                                    <>
                                      <Avatar
                                        className="h-6 w-6 flex-none"
                                        aria-hidden="true"
                                      />
                                      <span className="ml-3 flex-auto truncate capitalize">
                                        {hotspot.name.replaceAll("-", " ")}
                                      </span>
                                      {active && (
                                        <span className="ml-3 flex-none text-gray-500 dark:text-gray-400">
                                          Go to Hotspot
                                        </span>
                                      )}
                                    </>
                                  )}
                                </Combobox.Option>
                              )
                            })}
                        </ul>
                      </li>
                    </Combobox.Options>
                  )}

                  {query !== "" && searchResults.length === 0 && !isLoading && (
                    <div className="px-6 py-14 text-center sm:px-14">
                      <QuestionMarkCircleIcon
                        className="mx-auto h-12 w-12 text-gray-900 dark:text-gray-500"
                        aria-hidden="true"
                      />
                      <p className="mt-4 text-sm text-gray-900 dark:text-gray-200">
                        We couldn&#39;t find matching Hotspots...
                      </p>
                    </div>
                  )}
                </Combobox>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}
