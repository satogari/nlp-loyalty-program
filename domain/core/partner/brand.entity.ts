import { Entity } from "../common/entity.abstract";
import { Partner } from "./enums/partner.enum";

export default class Brand extends Entity<BrandId> {
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

export class BrandId {
    constructor(private value: string) {
        if (!value) {
            throw new Error("Brand ID must be provided");
        }
    }
}
export type Logo = {
    url: string
    type: string
}
