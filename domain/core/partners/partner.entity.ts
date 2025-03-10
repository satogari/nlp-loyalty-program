import { Entity } from "../../common/entity.abstract";
import { Partner as _Partner } from "./enums/partner.enum";
import Brand from "./vos/brand.vo";
import Attachment from "./vos/attachment.vo";
import TaxId from "./vos/tax-id.vo";
import Title from "./vos/title.vo";
import AccountInformation from "./vos/account-information.vo";
import Currency from "./vos/currency.vo";

export default class Partner {
    constructor(
        private id: TaxId,
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
        private brands: Brand[],
        private currency: Currency[],
        private branchCode?: string,
        private attachments?: Attachment[],
        private accountInformation?: AccountInformation
    ) {
    }
    updateInformation(
        taxId: TaxId, title: Title, nameTH: string, nameEN: string, owner: string, businessType: _Partner.BusinessType, lastModifiedBy:
            string, lastModifiedDate: string, branchNumber?: string) {
    }
    updateAttachment(attachments: Attachment[]) {
        this.attachments = attachments;
    }
    updatePartnerStatus(status: _Partner.Status) {
        this.status = status;
    }
    updateVendorStatus(vendorStatus: _Partner.VendorStatus) {
        this.vendorStatus = vendorStatus;
    }
}