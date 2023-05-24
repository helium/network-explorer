import { BN } from "@coral-xyz/anchor"
import { humanReadable, numberWithCommas } from "@helium/spl-utils"

export const fetcher = async (url: string) => {
  return fetch(url).then((response) => response.json())
}

export const veTokenWoDecimal = (numberStr: string, decimals: number) => {
  return parseInt(
    numberStr
      .split("")
      .slice(0, numberStr.length - decimals)
      .join(""),
    0
  )
}

export const humanReadableVeToken = (numberStr: string, decimals: number) => {
  const numberWODecimal = veTokenWoDecimal(numberStr, decimals)
  return numberWithCommas(numberWODecimal, 0)
}

export const ONE_DAY_UNIX = 60 * 60 * 24
export const ONE_DAY_MS = ONE_DAY_UNIX * 1000

export const humanReadableLockup = (bn: BN) => {
  const num = bn.toNumber()
  const days = Math.round(num / ONE_DAY_UNIX)
  return `${days} days`
}

export const humanReadableToken = (bn: BN, decimals: number) => {
  return humanReadable(bn, decimals).split(".")[0]
}
