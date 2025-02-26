import { Partner } from "./enums/partner.enum";
import Branch from "./vos/branch.vo";

export default class Brand {
    constructor(
        private id: BrandId,
        private logo: Logo,
        private nameTH: string,
        private category: Partner.Brand.Category,
        private subCategory: Partner.Brand.SubCategory,
        private branches: Branch[]
    ) {
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
