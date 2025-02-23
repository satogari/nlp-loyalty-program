import ValueObject from "../common/value-object.abstract"

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

class ProgramId extends ValueObject<ProgramId> {}

export default class Program extends Entity<ProgramId> {
    constructor(
        private programId: ProgramId,
        private name: string,
        private type: ProgramType,
        private logo: Logo,
        private color: ProgramColor,
        private currencies: Currency[]
    ) {
        super(programId)
    }

    public override equals(object?: Entity<ProgramId>): boolean {
        if (!super.equals(object)) return false;

        if (!(object instanceof Program)) return false;

        // Additional Program-specific equality checks
        return this.programId.equals(object.programId) &&
            this.name === object.name &&
            this.type === object.type
    }
}