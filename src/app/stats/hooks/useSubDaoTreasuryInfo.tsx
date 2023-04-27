"use client"

import { useIdlAccount } from "@helium/helium-react-hooks"
import { TreasuryManagement } from "@helium/idls/lib/types/treasury_management"
import { treasuryManagementKey } from "@helium/treasury-management-sdk"
import { PublicKey } from "@solana/web3.js"
// @ts-ignore
import { IDL as treasuryMgmtIDL } from "@helium/idls/treasury_management"

export const useSubDaoTreasuryInfo = (subDaoMint: PublicKey) => {
  const treasuryMgmtKey = treasuryManagementKey(subDaoMint)[0]
  return useIdlAccount<TreasuryManagement>(
    treasuryMgmtKey,
    treasuryMgmtIDL as TreasuryManagement,
    "treasuryManagementV0"
  )
}
