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

  private async getLatest(): Promise<MaxSupplyRecord | undefined> {
    const latest = await this.knex("max_supply_records")
      .select("*")
      .orderBy("recorded_at", "desc")
      .first()

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
    const latest = await this.getLatest()

    const isSameDay =
      epochFromDate(latest?.recorded_at || new Date(0)) ===
      epochFromDate(record.recorded_at)
    const hasBurnIncrease =
      record.hnt_burned > (latest?.hnt_burned || BigInt(0))

    if (
      !latest || // first time app is run
      !isSameDay || // when new UTC day
      hasBurnIncrease // true when different hnt burn result and guards against dune query failure
    ) {
      await this.addRecord(record)
      return record
    }
    return latest
  }
}
