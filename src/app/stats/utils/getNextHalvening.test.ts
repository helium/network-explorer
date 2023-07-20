import { add, sub } from "date-fns"
import { getNextHalvening } from "./getNextHalvening"

describe("getNextHalvening", () => {
  it("returns the right halvenings", () => {
    const HALVENING_2023 = 1690848000 * 1000
    const before2023 = sub(new Date(1690848000 * 1000), { days: 1 })
    const after2023 = add(new Date(1690848000 * 1000), { days: 1 })
    const after2025 = add(new Date(1690848000 * 1000), { years: 2, days: 1 })
    const after2027 = add(new Date(1690848000 * 1000), { years: 4, days: 1 })
    const after2029 = add(new Date(1690848000 * 1000), { years: 6, days: 1 })

    expect(getNextHalvening(before2023)).toEqual(HALVENING_2023)
    expect(getNextHalvening(after2023)).toEqual(
      add(HALVENING_2023, { years: 2 }).valueOf()
    )
    expect(getNextHalvening(after2025)).toEqual(
      add(HALVENING_2023, { years: 4 }).valueOf()
    )
    expect(getNextHalvening(after2027)).toEqual(
      add(HALVENING_2023, { years: 6 }).valueOf()
    )
    expect(getNextHalvening(after2029)).toEqual(
      add(HALVENING_2023, { years: 8 }).valueOf()
    )
  })
})
