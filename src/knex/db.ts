import knex from "knex"
import config from "../../knexfile"

const newDb = () => {
  return knex(config)
}

export const db = newDb()
