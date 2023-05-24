import { IOT_MINT, MOBILE_MINT } from "@helium/spl-utils"
import { fetchSubDaoEpochInfo } from "./fetchSubDaoEpochInfo"

export const fetchRecentEpochs = async () => {
  const mobileEpochQueries: any[] = []
  const iotEpochsQueries: any[] = []

  for (let offset = 0; offset <= 30; offset++) {
    mobileEpochQueries.push(fetchSubDaoEpochInfo(MOBILE_MINT, offset))
    iotEpochsQueries.push(fetchSubDaoEpochInfo(IOT_MINT, offset))
  }

  const [mobileEpochs, iotEpochs] = await Promise.all([
    await Promise.all(mobileEpochQueries),
    await Promise.all(iotEpochsQueries),
  ])

  return {
    mobileEpochs,
    iotEpochs,
  }
}
