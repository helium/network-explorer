import { add, sub } from "date-fns"
import { AUG_1_2023, getRemainingEmissions } from "./remainingEmission"

describe("getRemaingEmissions", () => {
  describe("hnt", () => {
    const HNT_YEARLY = 15000000
    const HNT_EMISSIONS_REMAING = HNT_YEARLY * 4

    it("returns remaining emissions on Aug 1st, 2024", () => {
      const dayOf = add(AUG_1_2023, { hours: 1 })
      expect(getRemainingEmissions(dayOf, "hnt")).toEqual(HNT_EMISSIONS_REMAING)
    })

    it("adds emissions when before Aug 1st, 2024", () => {
      const twoDaysBefore = sub(AUG_1_2023, { days: 1, hours: 6 })
      expect(getRemainingEmissions(twoDaysBefore, "hnt")).toEqual(
        HNT_EMISSIONS_REMAING + ((HNT_YEARLY * 2) / 365) * 2
      )
    })

    describe("when after after Aug 1st, 2024", () => {
      it("subtracts emissions in a leap year", () => {
        const nextDay = add(AUG_1_2023, { days: 1, hours: 1 })
        expect(getRemainingEmissions(nextDay, "hnt")).toEqual(
          HNT_EMISSIONS_REMAING - HNT_YEARLY / 366
        )

        const almostYear = add(AUG_1_2023, { days: 365, hours: 1 })
        expect(getRemainingEmissions(almostYear, "hnt")).toEqual(
          HNT_EMISSIONS_REMAING - (HNT_YEARLY / 366) * 365
        )
      })

      it("subtracts emissions in a none leap year", () => {
        const postLeapYear = add(AUG_1_2023, { years: 1, days: 1, hours: 1 })
        expect(getRemainingEmissions(postLeapYear, "hnt")).toEqual(
          HNT_EMISSIONS_REMAING - HNT_YEARLY - HNT_YEARLY / 365
        )
      })

      it("returns remaining emissions from 2025 halvening", () => {
        const atHalvening2025 = add(AUG_1_2023, { years: 2, hours: 1 })
        expect(getRemainingEmissions(atHalvening2025, "hnt")).toEqual(
          HNT_EMISSIONS_REMAING - HNT_YEARLY * 2
        )
      })

      it("subtracts emissions after next halvening", () => {
        const dayAfterHalvening2025 = add(AUG_1_2023, {
          years: 2,
          days: 1,
          hours: 1,
        })
        expect(getRemainingEmissions(dayAfterHalvening2025, "hnt")).toEqual(
          HNT_EMISSIONS_REMAING - HNT_YEARLY * 2 - HNT_YEARLY / 2 / 365
        )
      })

      it("subtracts emissions for the following leap year", () => {
        const dayAfterHalvening2027 = add(AUG_1_2023, {
          years: 4,
          days: 1,
          hours: 1,
        })
        expect(getRemainingEmissions(dayAfterHalvening2027, "hnt")).toEqual(
          HNT_EMISSIONS_REMAING -
            HNT_YEARLY * 2 - // 2023 + 2024
            (HNT_YEARLY / 2) * 2 - // 2025 + 2026
            HNT_YEARLY / 4 / 366 // one day into next leap year
        )
      })
    })
  })

  describe("mobile", () => {
    it("has the same behavior for mobile", () => {
      const MOBILE_YEARLY = 30000000000
      const MOBILE_EMISSIONS_REMAINING = MOBILE_YEARLY * 4
      const dayOf = add(AUG_1_2023, { hours: 1 })
      expect(getRemainingEmissions(dayOf, "mobile")).toEqual(
        MOBILE_EMISSIONS_REMAINING
      )
      const twoDaysBefore = sub(AUG_1_2023, { days: 1, hours: 6 })
      expect(getRemainingEmissions(twoDaysBefore, "mobile")).toEqual(
        MOBILE_EMISSIONS_REMAINING + ((MOBILE_YEARLY * 2) / 365) * 2
      )

      const nextDay = add(AUG_1_2023, { days: 1, hours: 1 })
      expect(getRemainingEmissions(nextDay, "mobile")).toEqual(
        MOBILE_EMISSIONS_REMAINING - MOBILE_YEARLY / 366
      )

      const almostYear = add(AUG_1_2023, { days: 365, hours: 1 })
      expect(getRemainingEmissions(almostYear, "mobile")).toEqual(
        MOBILE_EMISSIONS_REMAINING - (MOBILE_YEARLY / 366) * 365
      )

      const postLeapYear = add(AUG_1_2023, { years: 1, days: 1, hours: 1 })
      expect(getRemainingEmissions(postLeapYear, "mobile")).toEqual(
        MOBILE_EMISSIONS_REMAINING - MOBILE_YEARLY - MOBILE_YEARLY / 365
      )

      const atHalvening2026 = add(AUG_1_2023, { years: 2, hours: 1 })
      expect(getRemainingEmissions(atHalvening2026, "mobile")).toEqual(
        MOBILE_EMISSIONS_REMAINING - MOBILE_YEARLY * 2
      )

      const dayAfterHalvening2025 = add(AUG_1_2023, {
        years: 2,
        days: 1,
        hours: 1,
      })
      expect(getRemainingEmissions(dayAfterHalvening2025, "mobile")).toEqual(
        MOBILE_EMISSIONS_REMAINING - MOBILE_YEARLY * 2 - MOBILE_YEARLY / 2 / 365
      )

      const dayAfterHalvening2027 = add(AUG_1_2023, {
        years: 4,
        days: 1,
        hours: 1,
      })
      expect(getRemainingEmissions(dayAfterHalvening2027, "mobile")).toEqual(
        MOBILE_EMISSIONS_REMAINING -
          MOBILE_YEARLY * 2 - // 2023 + 2024
          (MOBILE_YEARLY / 2) * 2 - // 2025 + 2026
          MOBILE_YEARLY / 4 / 366 // one day into next leap year
      )
    })
  })

  describe("iot", () => {
    it("has the same behavior for iot", () => {
      const IOT_YEARLY = 32500000000
      const IOT_EMISSIONS_REMAINING = IOT_YEARLY * 4
      const dayOf = add(AUG_1_2023, { hours: 1 })
      expect(getRemainingEmissions(dayOf, "iot")).toEqual(
        IOT_EMISSIONS_REMAINING
      )
      const twoDaysBefore = sub(AUG_1_2023, { days: 1, hours: 6 })
      expect(getRemainingEmissions(twoDaysBefore, "iot")).toEqual(
        IOT_EMISSIONS_REMAINING + ((IOT_YEARLY * 2) / 365) * 2
      )

      const nextDay = add(AUG_1_2023, { days: 1, hours: 1 })
      expect(getRemainingEmissions(nextDay, "iot")).toEqual(
        IOT_EMISSIONS_REMAINING - IOT_YEARLY / 366
      )

      const almostYear = add(AUG_1_2023, { days: 365, hours: 1 })
      expect(getRemainingEmissions(almostYear, "iot")).toEqual(
        IOT_EMISSIONS_REMAINING - (IOT_YEARLY / 366) * 365
      )

      const postLeapYear = add(AUG_1_2023, { years: 1, days: 1, hours: 1 })
      expect(getRemainingEmissions(postLeapYear, "iot")).toEqual(
        IOT_EMISSIONS_REMAINING - IOT_YEARLY - IOT_YEARLY / 365
      )

      const atHalvening2026 = add(AUG_1_2023, { years: 2, hours: 1 })
      expect(getRemainingEmissions(atHalvening2026, "iot")).toEqual(
        IOT_EMISSIONS_REMAINING - IOT_YEARLY * 2
      )

      const dayAfterHalvening2025 = add(AUG_1_2023, {
        years: 2,
        days: 1,
        hours: 1,
      })
      expect(getRemainingEmissions(dayAfterHalvening2025, "iot")).toEqual(
        IOT_EMISSIONS_REMAINING - IOT_YEARLY * 2 - IOT_YEARLY / 2 / 365
      )

      const dayAfterHalvening2027 = add(AUG_1_2023, {
        years: 4,
        days: 1,
        hours: 1,
      })
      expect(getRemainingEmissions(dayAfterHalvening2027, "iot")).toEqual(
        IOT_EMISSIONS_REMAINING -
          IOT_YEARLY * 2 - // 2023 + 2024
          (IOT_YEARLY / 2) * 2 - // 2025 + 2026
          IOT_YEARLY / 4 / 366 // one day into next leap year
      )
    })
  })
})
