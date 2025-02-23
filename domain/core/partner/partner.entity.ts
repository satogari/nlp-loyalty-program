import { Entity } from "../common/entity.abstract";
import { Partner as _Partner } from "./partner.enum";
import ValueObject from "../common/value-object.abstract";

class TaxId extends ValueObject<string> {
}

class Title extends ValueObject<string>{}


type AttachmentT = {

}

type BrandT = {
    id: string
    nameTH: string
    nameEN: string
    category: _Partner.Brand.Category
    subCategory: _Partner.Brand.SubCategory
    totalBranches: number
    totalBangkokBranches: number
    totalUpcountryBranches: number
}
class Attachment extends ValueObject<AttachmentT>{

}
class Brand extends ValueObject<BrandT> {
}

class Partner extends Entity<TaxId> {
    constructor(
        private taxId: TaxId,
        private title: Title,
        private nameTH: string,
        private nameEN: string,
        private owner: string,
        private businessType: _Partner.BusinessType,
        private createdBy: string,
        private createdDate: string,
        private lastModifiedBy: string,
        private lastModifiedDate: string,
        private status: _Partner.Status,
        private vendorStatus: _Partner.VendorStatus,
        private branchCode?: string,
        private brands?: Brand[],
        private attachment?: Attachment
    ) {
        super(taxId)
    }
    updateInformation(
        taxId: TaxId, title: Title, nameTH: string, nameEN: string, owner: string, businessType: _Partner.BusinessType, lastModifiedBy: 
        string, lastModifiedDate: string, branchNumber?: string) {
        this.markAsModified();
    }
    updateAttachment(attachment: Attachment) {
        this.attachment = attachment;
    }
    updatePartnerStatus(status: _Partner.Status) {
        this.status = status;
        this.markAsModified();
    }
    updateVendorStatus(vendorStatus: _Partner.VendorStatus){
        this.vendorStatus = vendorStatus;
        this.markAsModified();
    }
}