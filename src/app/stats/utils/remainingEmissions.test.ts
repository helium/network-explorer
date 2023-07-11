import { add, sub } from "date-fns"
import { AUG_1_2024, getRemainingEmissions } from "./remainingEmission"

describe("getRemaingEmissions", () => {
  it("returns remaining emissions on Aug 1st, 2024", () => {
    const dayOf = add(AUG_1_2024, { hours: 1 })
    expect(getRemainingEmissions(dayOf)).toEqual(60000000)
  })

  it("adds emissions when before Aug 1st, 2024", () => {
    const twoDaysBefore = sub(AUG_1_2024, { days: 1, hours: 6 })
    expect(getRemainingEmissions(twoDaysBefore)).toEqual(60164383.56164384)
  })

  describe("when after after Aug 1st, 2024", () => {
    it("subtracts emissions in a leap year", () => {
      const nextDay = add(AUG_1_2024, { days: 1, hours: 1 })
      expect(getRemainingEmissions(nextDay)).toEqual(59959016.39344262)

      const almostYear = add(AUG_1_2024, { days: 365, hours: 1 })
      expect(getRemainingEmissions(almostYear)).toEqual(45040983.60655738)
    })

    it("subtracts emissions in a none leap year", () => {
      const postLeapYear = add(AUG_1_2024, { years: 1, days: 1, hours: 1 })
      expect(getRemainingEmissions(postLeapYear)).toEqual(44958904.10958904)
    })

    it("returns remaining emissions from 2026 halvening", () => {
      const atHalvening2026 = add(AUG_1_2024, { years: 2, hours: 1 })
      expect(getRemainingEmissions(atHalvening2026)).toEqual(30000000)
    })

    it("subtracts emissions after next halvening", () => {
      const dayAfterHalvening2026 = add(AUG_1_2024, {
        years: 2,
        days: 1,
        hours: 1,
      })
      expect(getRemainingEmissions(dayAfterHalvening2026)).toEqual(
        29979452.05479452
      )
    })

    it("subtracts emissions for the following leap year", () => {
      const dayAfterHalvening2026 = add(AUG_1_2024, {
        years: 4,
        days: 1,
        hours: 1,
      })
      expect(getRemainingEmissions(dayAfterHalvening2026)).toEqual(
        14989754.098360656
      )
    })
  })
})
