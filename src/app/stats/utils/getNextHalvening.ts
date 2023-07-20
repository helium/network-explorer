import { add, isAfter } from "date-fns"

const HALVENING_2023 = 1690848000 * 1000

export const getNextHalvening = (date: Date = new Date()) => {
  let nextHalvening = new Date(HALVENING_2023)
  while (isAfter(date, nextHalvening)) {
    nextHalvening = add(nextHalvening, { years: 2 })
  }
  return nextHalvening.valueOf()
}
