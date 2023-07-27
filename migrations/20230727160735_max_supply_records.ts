import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("max_supply_records", (table) => {
    table.timestamp("recorded_at").primary()
    table.bigint("hnt_burned").notNullable()
    table.bigint("supply").notNullable()
    table.bigint("max_supply").notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("max_supply_records")
}
