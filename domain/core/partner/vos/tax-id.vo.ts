import ValueObject from "../../common/value-object.abstract";

export default class TaxId extends ValueObject<string> {
    constructor(private readonly taxId: string) {
        super(taxId)
        if (!this.validate(taxId)) {
            throw new Error('Invalid Tax ID format');
        }
    }

    private validate(value: string): boolean {
        return value.length === 13 && /^\d+$/.test(value);
    }
    get value(): string {
        return this.taxId;
    }
}