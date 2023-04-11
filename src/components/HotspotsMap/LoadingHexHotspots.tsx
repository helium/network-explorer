import clsx from "clsx"

export function LoadingHexHotspots({ count }: { count: number }) {
  return (
    <div>
      <div
        className={clsx(
          "flex items-center justify-between rounded-lg px-6 py-1 text-sm font-medium",
          "bg-zinc-300/80 text-gray-700",
          "dark:bg-zinc-500/50 dark:text-white"
        )}
      >
        <span className="capitalize">Active</span>
      </div>
      <ul
        role="list"
        className="flex-1 divide-y divide-gray-200 overflow-y-auto dark:divide-white/10"
      >
        {[...Array(count).keys()].map((i) => (
          <li key={i}>
            <div className="group relative flex animate-pulse items-center px-5 py-6">
              <div className="-m-1 block flex-1 p-1">
                <div className="relative flex min-w-0 flex-1 items-center gap-4">
                  <span className="relative inline-block flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-gray-500 dark:bg-gray-700" />
                  </span>
                  <div className="flex-1 space-y-6 py-1">
                    <div className="h-2 rounded bg-gray-500 dark:bg-gray-700" />
                    <div className="h-2 rounded bg-gray-500 dark:bg-gray-700" />
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
