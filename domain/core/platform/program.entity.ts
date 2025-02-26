type ProgramType = 'Telecome Service Provider' | 'E-Commerce'
type Logo = string
type ProgramColor = string
type CurrencyCode = string

type Currency = {
    logo: Logo,
    nameTH: string
    nameEN: string
    code: CurrencyCode
    unitNameTH: string
    unitNameEN: string
    decimal: number
}
type PlatformCurrency = Currency & {
    default: boolean
    ratio: number // Currency Value per Unit
}
type PartnerCurrency = Currency & {
    partnerName: string
}

class ProgramId {}

export default class Program {
    constructor(
        private programId: ProgramId,
        private name: string,
        private type: ProgramType,
        private logo: Logo,
        private color: ProgramColor,
        private currencies: Currency[]
    ) {
    }
}