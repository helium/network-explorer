import { cache } from "react"

const DUNE_KEY = process.env.DUNE_KEY || "bad-api-key"
const meta = {
  "x-dune-api-key": DUNE_KEY,
}
const header = new Headers(meta)

const duneQuery = async <ResponseT>(
  id: number
): Promise<{
  execution_started_at: string
  result: {
    rows: ResponseT
  }
}> => {
  return await fetch(`https://api.dune.com/api/v1/query/${id}/results`, {
    headers: header,
  })
    .then((res) => res.json())
    .catch(() => [])
}

type TotalHntEmission = {
  block_date: string
  hnt_minted: string
}

type TreasuryHntEmission = {
  block_date: string
  entity: "IOT Treasury" | "MOBILE Treasury"
  hnt_minted: string
}

export const fetchHntEmissions = cache(async () => {
  const [totalEmissions, subDaoEmissions] = await Promise.all([
    duneQuery<TotalHntEmission[]>(2727450),
    duneQuery<TreasuryHntEmission[]>(2727529),
  ])

  return { totalEmissions, subDaoEmissions }
})
