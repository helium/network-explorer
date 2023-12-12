import { epochFromDate } from "@/app/stats/utils"
import { Knex } from "knex"

type MaxSupplyRecord = {
  recorded_at: Date
  hnt_burned: bigint
  supply: bigint
  max_supply: bigint
}

export class MaxSupply {
  knex: Knex

  constructor(knex: Knex) {
    this.knex = knex
  }

  async getLatest({
    withBurn,
  }: {
    withBurn: boolean
  }): Promise<MaxSupplyRecord | undefined> {
    const query = this.knex("max_supply_records")
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
      max_supply: BigInt(latest.max_supply),
    }
  }

  private async addRecord(record: MaxSupplyRecord) {
    return this.knex("max_supply_records").insert(record)
  }

  async latestOrInsert(record: MaxSupplyRecord) {
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
      await this.addRecord(record)
      if (record.hnt_burned === BigInt(0)) return record
      if (!latest && !latestBurn) return record
    }
    return latest || latestBurn || record
  }
}
