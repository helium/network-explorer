import { NextRequest, NextResponse } from "next/server"
import { fetchMint } from "@/app/stats/utils/fetchMint"
import { HNT_MINT, MOBILE_MINT, IOT_MINT, toNumber } from "@helium/spl-utils"
import {
  getRemainingEmissions,
  getDailyEmisisons,
  MAX_DAILY_NET_EMISSIONS,
} from "@/app/stats/utils/remainingEmissions"
import {
  HNT_MAX_SUPPLY,
  IOT_MAX_SUPPLY,
  MOBILE_MAX_SUPPLY,
} from "@/app/stats/utils/emissions"

enum SupplyToken {
  HNT = "hnt",
  MOBILE = "mobile",
  IOT = "iot",
}

enum SupplyType {
  CIRCULATING = "circulating",
  TOTAL = "total",
  LIMIT = "limit",
  MAX = "max",
}

export async function GET(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  const searchParams = request.nextUrl.searchParams
  const token = params.token as SupplyToken
  const type = searchParams.get("type") as SupplyType

  if (
    !Object.values(SupplyToken).includes(token) ||
    !Object.values(SupplyType).includes(type)
  ) {
    return new NextResponse(null, { status: 400 })
  }

  const mintInfo = await fetchMint(
    {
      [SupplyToken.HNT]: HNT_MINT,
      [SupplyToken.MOBILE]: MOBILE_MINT,
      [SupplyToken.IOT]: IOT_MINT,
    }[token]
  )

  if (type === SupplyType.CIRCULATING || type === SupplyType.TOTAL) {
    const circulatingSupply = mintInfo.info?.info.supply!

    return NextResponse.json(
      toNumber(circulatingSupply, mintInfo?.info?.info.decimals || 0)
    )
  } else if (type === SupplyType.LIMIT) {
    let remainingEmissions = Math.ceil(getRemainingEmissions(new Date(), token))

    if (token === SupplyToken.HNT) {
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
  } else if (type === SupplyType.MAX) {
    switch (token) {
      case SupplyToken.HNT:
        return NextResponse.json(HNT_MAX_SUPPLY)
      case SupplyToken.MOBILE:
        return NextResponse.json(MOBILE_MAX_SUPPLY)
      case SupplyToken.IOT:
        return NextResponse.json(IOT_MAX_SUPPLY)
      default:
        return new NextResponse(null, { status: 400 })
    }
  }
}
