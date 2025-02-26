import { Entity } from "../common/entity.abstract";

type BranchId = {}
export default class Branch extends Entity<BranchId> {
    constructor(
        private branchId: BranchId,
        private nameTH: string,
        private nameEN?: string,
        private location?: string,
        private address?: string,
        private zipCode?: string,
        private pronvince?: string,
        private district?: string,
        private subDistrict?: string,
        private latitude?: string,
        private longitude?: string,
    ) {
        super(branchId)
    }
}