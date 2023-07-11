import { add, differenceInDays, differenceInYears, isBefore } from "date-fns"

const REMAINING_AUG_1_2024 = 60000000
export const AUG_1_2024 = new Date(1690848000 * 1000)
const YEARLY_EMISSIONS = 15000000

export const getRemainingEmissions = (date: Date) => {
  let daysDelta = Math.abs(differenceInDays(AUG_1_2024, date))
  if (isBefore(date, AUG_1_2024)) {
    const dailyEmissionsRemaining = daysDelta + 1
    return (
      REMAINING_AUG_1_2024 +
      ((YEARLY_EMISSIONS * 2) / 365) * dailyEmissionsRemaining
    )
  }

  let remainingEmissions = REMAINING_AUG_1_2024
  const yearsDeltaAug24 = differenceInYears(date, AUG_1_2024)
  if (yearsDeltaAug24 >= 1) {
    let yearsDelta = yearsDeltaAug24
    daysDelta = Math.abs(
      differenceInDays(add(AUG_1_2024, { years: yearsDelta }), date)
    )

    while (!!yearsDelta) {
      const halvenings = Math.floor((yearsDelta - 1) / 2)
      remainingEmissions -= YEARLY_EMISSIONS / Math.pow(2, halvenings)

      yearsDelta--
    }
  }

  const isLeapYear = yearsDeltaAug24 % 4 === 0
  const numDays = isLeapYear ? 366 : 365
  const halvenings = Math.floor(yearsDeltaAug24 / 2)
  const adjustedYearlyEmissions = YEARLY_EMISSIONS / Math.pow(2, halvenings)
  return remainingEmissions - (daysDelta * adjustedYearlyEmissions) / numDays
}
