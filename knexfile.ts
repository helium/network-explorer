import type { Knex } from "knex"
require("dotenv").config()

const config: Knex.Config = {
  client: "postgresql",
  connection: process.env.DATABASE_URL,
  migrations: {
    extension: "ts",
  },
}

export default config
