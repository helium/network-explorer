import { numberWithCommas } from "@helium/spl-utils"

export const fetcher = async (url: string) => {
  return fetch(url).then((response) => response.json())
}

export const veHntWoDecimal = (numberStr: string) => {
  return parseInt(
    numberStr
      .split("")
      .slice(0, numberStr.length - 8)
      .join(""),
    0
  )
}

export const humanReadableVeHNT = (numberStr: string) => {
  const numberWODecimal = veHntWoDecimal(numberStr)
  return numberWithCommas(numberWODecimal, 0)
}

export const ONE_DAY_UNIX = 60 * 60 * 24
export const ONE_DAY_MS = ONE_DAY_UNIX * 1000
