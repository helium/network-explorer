import { fetchHntEmissions } from "../utils/dune/fetchHntEmissions"
import { formatDuneDate } from "../utils/dune/formatDuneDate"
import { GraphWrapper } from "./GraphWrapper"
import { HntEmissionRow, HntEmissionsGraph } from "./HntEmissionsGraph"
import { Tooltip } from "./Tooltip"

export const HntEmissions = async () => {
  const { totalEmissions, subDaoEmissions } = await fetchHntEmissions()

  const hntEmissionsData: { [date: string]: HntEmissionRow } = {}
  totalEmissions.forEach(({ block_date, hnt_minted }) => {
    hntEmissionsData[block_date] = {
      date: block_date,
      total: hnt_minted,
      iot: 0,
      mobile: 0,
    }
  })

  subDaoEmissions.result.rows.forEach(({ entity, block_date, hnt_minted }) => {
    // required if both queries have yet to execute in latest epoch
    if (!hntEmissionsData[block_date]) {
      hntEmissionsData[block_date] = {
        date: block_date,
        total: 0,
        iot: 0,
        mobile: 0,
      }
    }
    const subDao = entity === "IOT Treasury" ? "iot" : "mobile"
    hntEmissionsData[block_date][subDao] = parseInt(hnt_minted, 10)
  })

  const hntEmissionsRows = Object.keys(hntEmissionsData)
    .map((date) => hntEmissionsData[date])
    .reverse()
    /*
     Sometimes one query will run before emissions are actually emitted causing 
     non-complete rows. Filtering these rows out. When this happens we'll have 28 
     instead of 30. 
    */
    .filter((row) => !!row.iot && !!row.mobile && !!row.total)

  return (
    <div className="mt-2">
      <GraphWrapper
        label={
          <span className="flex items-center gap-1">
            HNT Emissions History (30 days)
            <Tooltip
              id="hnt-emissions"
              description={`Last fetched: ${formatDuneDate(
                subDaoEmissions.execution_started_at
              )}`}
              cadence="Daily"
              sourceText="Dune queries 3321568 and 3321569"
            />
          </span>
        }
      >
        <HntEmissionsGraph data={hntEmissionsRows} />
      </GraphWrapper>
    </div>
  )
}
