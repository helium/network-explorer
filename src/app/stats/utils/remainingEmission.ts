import { add, differenceInDays, differenceInYears, isBefore } from "date-fns"

export const AUG_1_2023 = new Date(1690848000 * 1000)
const YEARLY_EMISSIONS = {
  hnt: 15000000,
  iot: 30225000000,
  mobile: 19800000000,
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
  const yearsDeltaAug24 = differenceInYears(date, AUG_1_2023)
  if (yearsDeltaAug24 >= 1) {
    let yearsDelta = yearsDeltaAug24
    daysDelta = Math.abs(
      differenceInDays(add(AUG_1_2023, { years: yearsDelta }), date)
    )

    while (!!yearsDelta) {
      const halvenings = Math.floor((yearsDelta - 1) / 2)
      remainingEmissions -= yearlyEmissions / Math.pow(2, halvenings)

      yearsDelta--
    }
  }

  const isLeapYear = yearsDeltaAug24 % 4 === 0
  const numDays = isLeapYear ? 366 : 365
  const halvenings = Math.floor(yearsDeltaAug24 / 2)
  const adjustedYearlyEmissions = yearlyEmissions / Math.pow(2, halvenings)
  return remainingEmissions - (daysDelta * adjustedYearlyEmissions) / numDays
}
