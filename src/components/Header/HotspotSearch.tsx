"use client"

import { Combobox, Dialog, Transition } from "@headlessui/react"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid"
import clsx from "clsx"
import { useRouter } from "next/navigation"
import { Fragment, useCallback, useState } from "react"
import { useDebouncedCallback } from "use-debounce"
import HeliumIotIcon from "../icons/HeliumIotIcon"
import HeliumMobileIcon from "../icons/HeliumMobileIcon"
import LoadingIcon from "../icons/LoadingIcon"

let controller: AbortController | null = null

const RESULTS_LIMIT = 20

export interface HotspotResult {
  hotspot_id: string
  location_res8: string
  location_res12: string
  name: string
  owner: string
  cell_count: number
}

export default function HotspotSearch() {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)
  const [searchResults, setSearchResults] = useState<HotspotResult[]>([])
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
        `${process.env.NEXT_PUBLIC_HOTSPOTTY_EXPLORER_API_URL}/search`
      )
      searchUrl.searchParams.append(
        "name",
        query.toLowerCase().trim().replaceAll(" ", "-")
      )

      const results = (await fetch(searchUrl, {
        signal,
        next: { revalidate: 10 },
        headers: {
          Authorization: `bearer ${process.env.NEXT_PUBLIC_HOTSPOTTY_EXPLORER_API_TOKEN}`,
        },
      }).then((res) => res.json())) as HotspotResult[]

      setSearchResults(results)
      setIsLoading(false)
    } catch {
      setIsLoading(false)
    }
  }, [])

  const onChangeSearch = useDebouncedCallback((query: string) => {
    searchItemByQuery(query)
  }, 400)

  const clearSearchModal = useCallback(() => {
    setQuery("")
    setSearchResults([])
    setIsLoading(false)
  }, [])

  const handleHotspotSelection = useCallback(
    (hotspot: HotspotResult) => {
      router.push(`/hex/${hotspot.location_res8}`)
      setOpen(false)
    },
    [router]
  )

  return (
    <>
      <button
        type="button"
        aria-label="Open hotspot search"
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
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
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

          <div className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-24">
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
                      placeholder="Search hotspot by name..."
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
                              const Avatar =
                                hotspot.cell_count > 0
                                  ? HeliumMobileIcon
                                  : HeliumIotIcon
                              return (
                                <Combobox.Option
                                  key={hotspot.hotspot_id}
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
                                          Go to hotspot
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
                        We couldn&#39;t find matching hotspots...
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
