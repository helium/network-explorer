import { isAfter } from "date-fns"
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
      max_supply: BigInt(latest.supply),
    }
  }

  private async addRecord(record: MaxSupplyRecord) {
    return this.knex("max_supply_records").insert(record)
  }

  async latestOrInsert(record: MaxSupplyRecord) {
    const latest = await this.getLatest()

    if (!latest || isAfter(record.recorded_at, latest.recorded_at)) {
      await this.addRecord(record)
      return record
    }
    return latest
  }
}
