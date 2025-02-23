import { Entity } from "../common/entity.abstract";
import ValueObject from "../common/value-object.abstract";
import { Partner } from "./enums/partner.enum";

class BrandId extends ValueObject<string> {

}
type Logo = {}

export default class Branch extends Entity<BrandId> {
    constructor(
        private brandId: BrandId,
        private logo: Logo,
        private nameTH: string,
        private category: Partner.Brand.Category,
        private subCategory: Partner.Brand.SubCategory,
    ) {
        super(brandId);
    }
}