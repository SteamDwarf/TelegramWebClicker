import { Address, beginCell } from "@ton/core"

export const getJettonBuyMesssage = () => {
    return beginCell()
    .storeUint(1863739432, 32)
    .storeUint(0n, 64)
    .storeUint(100n, 257)
    .endCell()
}


export const getJettonBurnMessage = (amount: number, senderAddress: Address) => {
    return beginCell()
        .storeUint(1499400124, 32)
        .storeUint(0n, 64)
        .storeCoins(BigInt(amount))
        .storeAddress(senderAddress)
        .storeBit(false)
        .endCell()
}