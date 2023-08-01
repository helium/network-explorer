import {
  add,
  differenceInDays,
  differenceInYears,
  isAfter,
  isBefore,
} from "date-fns"
import subNetworkEmissions from "./subNetworkEmissions.json"
import { SubDao } from "./types"

export const AUG_1_2023 = new Date(1690848000 * 1000)
const YEARLY_EMISSIONS = {
  hnt: 15000000,
  iot: 32500000000,
  mobile: 30000000000,
}

type Token = "hnt" | "mobile" | "iot"
export const getRemainingEmissions = (date: Date, token: Token) => {
  const yearlyEmissions = YEARLY_EMISSIONS[token]
  const REMAINING_AUG_1_2023 = yearlyEmissions * 4
  let daysDelta = Math.abs(differenceInDays(AUG_1_2023, date))
  if (isBefore(date, AUG_1_2023)) {
    const dailyEmissionsRemaining = daysDelta + 1
    return (
      REMAINING_AUG_1_2023 +
      ((yearlyEmissions * 2) / 365) * dailyEmissionsRemaining
    )
  }

  let remainingEmissions = REMAINING_AUG_1_2023
  const yearsDeltaAug23 = differenceInYears(date, AUG_1_2023)
  if (yearsDeltaAug23 >= 1) {
    let yearsDelta = yearsDeltaAug23
    daysDelta = Math.abs(
      differenceInDays(add(AUG_1_2023, { years: yearsDelta }), date)
    )

    while (!!yearsDelta) {
      const halvenings = Math.floor((yearsDelta - 1) / 2)
      remainingEmissions -= yearlyEmissions / Math.pow(2, halvenings)

      yearsDelta--
    }
  }

  return remainingEmissions - daysDelta * getDailyEmisisons(date, token)
}

export const getDailyEmisisons = (date: Date, token: Token) => {
  const yearlyEmissions = YEARLY_EMISSIONS[token]
  const yearsDeltaAug23 = differenceInYears(date, AUG_1_2023)
  const isLeapYear = yearsDeltaAug23 % 4 === 0
  const numDays = isLeapYear ? 366 : 365
  const halvenings = Math.floor(yearsDeltaAug23 / 2)
  const adjustedYearlyEmissions = yearlyEmissions / Math.pow(2, halvenings)

  return adjustedYearlyEmissions / numDays
}

// emissions schedule taken from https://github.com/helium/helium-program-library/tree/master/packages/helium-admin-cli/emissions
export const getLatestSubNetworkEmissions = (date: Date, token: SubDao) => {
  const emissions = subNetworkEmissions[token]
  let currentEmissions = emissions[0].emissionsPerEpoch
  let index = 1
  while (
    index < emissions.length &&
    isAfter(date, new Date(emissions[index].startTime))
  ) {
    currentEmissions = emissions[index].emissionsPerEpoch
    index++
  }
  return currentEmissions
}
