import type { Knex } from "knex"
require("dotenv").config()

// used for preview / if DATABASE_URL not set
const SQLITE_CONFIG: Knex.Config = {
  client: "better-sqlite3",
  connection: {
    filename: "./db.sqlite3",
  },
}

const PG_CONFIG = {
  client: "postgresql",
  connection: process.env.DATABASE_URL,
  migrations: {
    extension: "ts",
  },
}

const config: Knex.Config = process.env.DATABASE_URL ? PG_CONFIG : SQLITE_CONFIG

export default config
