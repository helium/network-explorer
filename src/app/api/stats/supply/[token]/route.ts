import { NextRequest, NextResponse } from "next/server"
import { fetchMint } from "@/app/stats/utils/fetchMint"
import { HNT_MINT, MOBILE_MINT, IOT_MINT, toNumber } from "@helium/spl-utils"
import {
  getRemainingEmissions,
  getDailyEmisisons,
  MAX_DAILY_NET_EMISSIONS,
} from "@/app/stats/utils/remainingEmissions"

type SupplyToken = "hnt" | "mobile" | "iot"
type SupplyType = "circulating" | "total" | "max"

export async function GET(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  const searchParams = request.nextUrl.searchParams
  const token = params.token as SupplyToken
  const type = searchParams.get("type") as SupplyType

  if (
    !["hnt", "mobile", "iot"].includes(token) ||
    !["circulating", "total", "max"].includes(type)
  ) {
    return new NextResponse(null, { status: 400 })
  }

  const mintInfo = await fetchMint(
    {
      hnt: HNT_MINT,
      mobile: MOBILE_MINT,
      iot: IOT_MINT,
    }[token]
  )

  if (type === "circulating") {
    const circulatingSupply = mintInfo.info?.info.supply!

    return NextResponse.json(
      toNumber(circulatingSupply, mintInfo?.info?.info.decimals || 0)
    )
  } else if (type === "total" || type === "max") {
    // Return the same thing for total and max as they are functionally the same for us
    let remainingEmissions = Math.ceil(getRemainingEmissions(new Date(), token))

    if (token === "hnt") {
      // Due to Net Emissions, assume the max amount will be re-emitted
      remainingEmissions += Math.ceil(MAX_DAILY_NET_EMISSIONS)
    }

    // Add the daily emissions for today to be conservative
    // bc they may or may not have been emitted yet
    const dailyEmissions = getDailyEmisisons(new Date(), token)
    remainingEmissions += Math.ceil(dailyEmissions)

    const totalSupply =
      mintInfo.info?.info.supply! +
      BigInt(remainingEmissions) *
        BigInt(Math.pow(10, mintInfo?.info?.info.decimals || 0))

    return NextResponse.json(
      toNumber(totalSupply, mintInfo?.info?.info.decimals || 0)
    )
  }
}
