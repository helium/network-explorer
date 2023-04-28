import { numberWithCommas } from "@helium/spl-utils"

export const fetcher = async (url: string) => {
  return fetch(url).then((response) => response.json())
}

export const humanReadableVeHNT = (numberStr: string) => {
  const numberWODecimal = numberStr
    .split("")
    .slice(0, numberStr.length - 8)
    .join("")
  return numberWithCommas(parseInt(numberWODecimal, 0), 0)
}

export const ONE_DAY_UNIX = 60 * 60 * 24
export const ONE_DAY_MS = ONE_DAY_UNIX * 1000
