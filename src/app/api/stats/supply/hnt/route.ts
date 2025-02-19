import { NextRequest, NextResponse } from "next/server";

const staticCirculatingSupply = 178354545.71906236;  //todo: subtract staked
const staticTotalSupply = 178354545.71906236;
const staticSupplyLimit = 223000000;
const staticMaxSupply = 223000000;

enum SupplyType {
  CIRCULATING = "circulating",
  TOTAL = "total",
  LIMIT = "limit",
  MAX = "max",
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get("type");

  if (!type || !Object.values(SupplyType).includes(type as SupplyType)) {
    return new NextResponse("Invalid type", { status: 400 });
  }

  if (type === SupplyType.CIRCULATING) {
    return NextResponse.json(staticCirculatingSupply);
  } else if (type === SupplyType.TOTAL) {
    return NextResponse.json(staticTotalSupply);
  } else if (type === SupplyType.LIMIT) {
    return NextResponse.json(staticSupplyLimit);
  } else if (type === SupplyType.MAX) {
    return NextResponse.json(staticMaxSupply);
  }

  return new NextResponse("Invalid type", { status: 400 });
}
