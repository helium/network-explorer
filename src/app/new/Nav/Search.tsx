"use client"

import { HeliumIotIcon } from "@/components/icons/HeliumIotIcon"
import { HeliumMobileIcon } from "@/components/icons/HeliumMobileIcon"
import { LoadingIcon } from "@/components/icons/LoadingIcon"
import { Combobox, Dialog, Transition } from "@headlessui/react"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid"
import clsx from "clsx"
import { isValidCell } from "h3-js"
import { useRouter } from "next/navigation"
import { Fragment, useCallback, useState } from "react"
import { useDebouncedCallback } from "use-debounce"
import styles from "./Nav.module.css"

let controller: AbortController | null = null

const RESULTS_LIMIT = 20

type SearchResponse = {
  result: {
    data: {
      json: HotspotResult[]
    }
  }
}
export interface HotspotResult {
  address: string
  hotspotType: string
  name: string
  statusString: "inactive" | "active"
  location: {
    hex: string
  }
}

export function Search() {
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
      const queryObj = {
        json: {
          name: query,
        },
      }
      const jsonString = JSON.stringify(queryObj)
      const urlEncoded = encodeURIComponent(jsonString)
      const queryString = `?input=${urlEncoded}`
      const searchUrl = new URL(
        `${process.env.NEXT_PUBLIC_HELIUMGEEK_EXPLORER_API_URL}${queryString}`
      )

      const response = (await fetch(searchUrl, {
        signal,
        next: { revalidate: 10 },
      }).then((res) => res.json())) as SearchResponse

      setSearchResults(response.result.data.json)
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
    (hotspot: HotspotResult) => {
      router.push(
        `/new/hex/${hotspot.location.hex}/hotspots/${hotspot.address}`
      )
      setOpen(false)
    },
    [router]
  )

  return (
    <>
      <button
        type="button"
        aria-label="Open Hotspot search"
        className="group rounded-lg p-2 transition hover:bg-[#8A8A8A]/20"
        onClick={() => setOpen(true)}
      >
        <MagnifyingGlassIcon className="h-6 w-6 stroke-[#DBE0E6] opacity-75 transition group-hover:opacity-100" />
      </button>
      <Transition.Root show={open} as={Fragment} appear>
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

          <div
            className={`fixed inset-0 overflow-y-auto p-4 sm:p-6 md:p-24 ${styles.blur}`}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="mx-auto flex max-w-2xl flex-col gap-2 overflow-hidden transition-all">
                <Combobox onChange={handleHotspotSelection}>
                  <div className="flex flex-col gap-2">
                    <div className="relative">
                      {isLoading ? (
                        <LoadingIcon className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 animate-spin text-neutral-200 text-opacity-40 dark:text-gray-500 dark:text-opacity-100" />
                      ) : (
                        <MagnifyingGlassIcon
                          className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 stroke-[#DBE0E6] opacity-75"
                          aria-hidden="true"
                        />
                      )}
                      <Combobox.Input
                        className="h-12 w-full rounded-xl border-0 bg-[#131313]/60 pl-11 pr-4 text-neutral-200 focus:ring-0 dark:text-white sm:text-sm"
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
                        className={clsx(
                          "max-h-80 scroll-py-2 divide-gray-500 divide-opacity-10 overflow-y-auto rounded-xl bg-[#131313]/60 dark:divide-opacity-20",
                          styles.wrapper
                        )}
                      >
                        <li className="p-1">
                          <ul className="text-sm text-neutral-200 dark:text-gray-400">
                            {searchResults
                              .slice(0, RESULTS_LIMIT)
                              .map((hotspot) => {
                                const Avatar =
                                  hotspot.hotspotType === "iot"
                                    ? HeliumIotIcon
                                    : HeliumMobileIcon
                                return (
                                  <Combobox.Option
                                    key={hotspot.address}
                                    value={hotspot}
                                    className={({ active }) =>
                                      clsx(
                                        "my-1 flex cursor-pointer select-none items-center rounded-md p-2",
                                        active &&
                                          "bg-[#8A8A8A]/20 dark:text-white"
                                      )
                                    }
                                  >
                                    {({ active }) => (
                                      <>
                                        <Avatar
                                          className="h-6 w-6 flex-none"
                                          aria-hidden="true"
                                        />
                                        <span
                                          className={clsx(
                                            "ml-3 flex-auto truncate capitalize text-[#DBE0E6]",
                                            active
                                              ? "opacity-100"
                                              : "opacity-75"
                                          )}
                                        >
                                          {hotspot.name.replaceAll("-", " ")}
                                        </span>
                                        {active && (
                                          <span className="ml-3 flex-none text-[#DBE0E6]">
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

                    {query !== "" &&
                      searchResults.length === 0 &&
                      !isLoading && (
                        <div className="rounded-xl bg-[#131313]/60 px-6 py-14 text-center sm:px-14">
                          <QuestionMarkCircleIcon
                            className="mx-auto h-12 w-12 text-neutral-200 dark:text-gray-500"
                            aria-hidden="true"
                          />
                          <p className="mt-4 text-sm text-neutral-200 dark:text-gray-200">
                            We couldn&#39;t find matching Hotspots...
                          </p>
                        </div>
                      )}
                  </div>
                </Combobox>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}
