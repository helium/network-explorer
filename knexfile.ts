import type { Knex } from "knex"
require("dotenv").config()

// used for preview / if DATABASE_URL not set
const SQLITE_CONFIG: Knex.Config = {
  client: "better-sqlite3",
  connection: {
    filename: "./db.sqlite3",
  },
}

const PG_CONFIG_PROD: Knex.Config = {
  client: "postgresql",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  },
  migrations: {
    extension: "ts",
  },
}

const PG_CONFIG_LOCAL: Knex.Config = {
  client: "postgresql",
  connection: {
    connectionString: process.env.DATABASE_URL,
  },
  migrations: {
    extension: "ts",
  },
}

const getConfig = () => {
  if (!process.env.DATABASE_URL) return SQLITE_CONFIG
  if (process.env.LOCAL) return PG_CONFIG_LOCAL
  return PG_CONFIG_PROD
}

const config: Knex.Config = getConfig()

export default config
