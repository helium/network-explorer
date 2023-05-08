import { TreasuryManagement } from "@helium/idls/lib/types/treasury_management"
import { treasuryManagementKey } from "@helium/treasury-management-sdk"
import { PublicKey } from "@solana/web3.js"
// @ts-ignore
import { IDL as treasuryMgmtIDL } from "@helium/idls/treasury_management"
import { fetchIdlAccount } from "./fetchIdlAccount"

export const fetchSubDaoTreasuryInfo = (subDaoMint: PublicKey) => {
  const treasuryMgmtKey = treasuryManagementKey(subDaoMint)[0]
  return fetchIdlAccount<TreasuryManagement>(
    treasuryMgmtKey,
    treasuryMgmtIDL as TreasuryManagement,
    "treasuryManagementV0"
  )
}
