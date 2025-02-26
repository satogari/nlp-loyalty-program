import { Partner } from "../enums/partner.enum";
import ValueObject from "../../../common/value-object.abstract";

type BrandT = {
    id: string
    nameTH: string
    nameEN: string
    category: Partner.Brand.Category
    subCategory: Partner.Brand.SubCategory
    totalBranches: number
    totalBangkokBranches: number
    totalUpcountryBranches: number
}
export default class Brand extends ValueObject<BrandT> {}