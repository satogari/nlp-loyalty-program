type ProgramType = 'Telecome Service Provider' | 'E-Commerce'
type Logo = string
type ProgramColor = string
type CurrencyCode = string

type Currency = {
    logo: Logo,
    code: CurrencyCode
    nameTH: string
    nameEN: string
    pointNameTH: string
    pointNameEN: string
    ratio: number // Currency Value per Unit
    decimal: number
    default: boolean
}

class Program {
    private constructor(
        private name: string,
        private type: ProgramType,
        private logo: Logo,
        private color: ProgramColor,
        private currencies: Currency[]
    ) { }
    public static create(
        name:string, type:ProgramType, logo:Logo, color:ProgramColor, currencies: Currency[]
    ) {
        return new Program(name, type, logo, color, currencies)
    }
}