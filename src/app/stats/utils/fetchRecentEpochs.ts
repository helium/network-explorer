import { cache } from "react"
import { fetchSubDaoEpochInfo } from "./fetchSubDaoEpochInfo"

const getRecentEpochs = async () => {
  const mobileEpochQueries: any[] = []
  const iotEpochsQueries: any[] = []

  for (let offset = 0; offset <= 30; offset++) {
    mobileEpochQueries.push(fetchSubDaoEpochInfo("mobile", offset))
    iotEpochsQueries.push(fetchSubDaoEpochInfo("iot", offset))
  }

  const [mobileEpochs, iotEpochs] = await Promise.all([
    Promise.all(mobileEpochQueries),
    Promise.all(iotEpochsQueries),
  ])

  return {
    mobileEpochs,
    iotEpochs,
  }
}

export const fetchRecentEpochs = cache(getRecentEpochs)
