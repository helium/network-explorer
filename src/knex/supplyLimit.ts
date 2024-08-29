import { epochFromDate } from "@/app/stats/utils"
import { isEqual } from "date-fns"
import { Knex } from "knex"

type SupplyLimitRecord = {
  recorded_at: Date
  hnt_burned: bigint
  supply: bigint
  supply_limit: bigint
}

export class SupplyLimit {
  knex: Knex

  constructor(knex: Knex) {
    this.knex = knex
  }

  async getLatest({
    withBurn,
  }: {
    withBurn: boolean
  }): Promise<SupplyLimitRecord | undefined> {
    const query = this.knex("supply_limit_records")
      .select("*")
      .orderBy("recorded_at", "desc")
      .first()
    if (!withBurn) query.where("hnt_burned", "0")

    const latest = await query

    if (!latest) return

    return {
      recorded_at: latest.recorded_at,
      hnt_burned: BigInt(latest.hnt_burned),
      supply: BigInt(latest.supply),
      supply_limit: BigInt(latest.supply_limit),
    }
  }

  private async addRecord(record: SupplyLimitRecord) {
    return this.knex("supply_limit_records").insert(record)
  }

  async latestOrInsert(record: SupplyLimitRecord) {
    // only want to display latest without burn but want to track both. The with burn value helps as heuristic for when HNT was disbursed.
    const [latest, latestBurn] = await Promise.all([
      this.getLatest({ withBurn: false }),
      this.getLatest({ withBurn: true }),
    ])

    const isSameDay =
      epochFromDate(latestBurn?.recorded_at || new Date(0)) ===
      epochFromDate(record.recorded_at)
    const hasBurnIncrease =
      record.hnt_burned > (latestBurn?.hnt_burned || BigInt(0))

    // HEROKU_PR_NUMBER injected to env vars when review app.
    if (!!process.env.HEROKU_PR_NUMBER) return latest || latestBurn || record

    if (
      // first time app is run
      (!latest && !latestBurn) ||
      // when new UTC day + supply has been disbursed
      (!isSameDay && (latestBurn?.supply || 0) < record.supply) ||
      // true when different hnt burn result and guards against dune query failure
      (isSameDay && hasBurnIncrease) ||
      // true when first recording of the day happens between treasury and HST emissions
      (isSameDay && (latest?.supply || 0) < record.supply)
    ) {
      // guard to avoid duplicate entry for primary key
      if (
        !isEqual(record.recorded_at, latest?.recorded_at || 0) &&
        !isEqual(record.recorded_at, latestBurn?.recorded_at || 0)
      ) {
        await this.addRecord(record)
      }
      if (record.hnt_burned === BigInt(0)) return record
      if (!latest && !latestBurn) return record
    }
    return latest || latestBurn || record
  }
}
