import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("max_supply_records", (table) => {
    table.renameColumn("max_supply", "supply_limit")
  })

  return knex.schema.renameTable("max_supply_records", "supply_limit_records")
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("supply_limit_records", (table) => {
    table.renameColumn("supply_limit", "max_supply")
  })

  return knex.schema.renameTable("supply_limit_records", "max_supply_records")
}
