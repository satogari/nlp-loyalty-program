// Interface Adapters Layer - Domain Mapper

import { Partner as _Partner } from "../../../domain/core/partner/enums/partner.enum";
import Partner from "../../../domain/core/partner/partner.entity";
import Attachment from "../../../domain/core/partner/vos/attachment.vo";
import TaxId from "../../../domain/core/partner/vos/tax-id.vo";
import Title from "../../../domain/core/partner/vos/title.vo";
import { TMF632PartnerResponse } from "./response/dto/tmf-632.dto.interface";

export class PartnerMapper {
    static toDomain(request: TMF632PartnerResponse): Partner {
        // Extract and validate tax ID
        const taxIdInfo = this.extractTaxId(request);
        const taxId = new TaxId(taxIdInfo);

        // Extract title
        const title = new Title(request.body.nameType);

        // Extract characteristics
        const characteristics = this.extractCharacteristics(request.body.partyCharacteristic);

        // Map attachments
        const attachments = this.mapAttachments(request.body.attachment);

        // Create Partner instance
        return new Partner(
            taxId,
            title,
            request.body.name,                    // nameTH
            this.extractEnglishName(request),     // nameEN
            characteristics.owner,                 // owner
            this.mapBusinessType(characteristics.businessIndustry),
            request.header.identity.user,         // createdBy
            new Date().toISOString(),            // createdDate
            request.header.identity.user,         // lastModifiedBy
            new Date().toISOString(),            // lastModifiedDate
            this.mapStatus(request.body.status),  // status
            this.mapVendorStatus(characteristics.vendorCode), // vendorStatus
            [],                                   // brands - empty by default
            [],                                   // currency - empty by default
            characteristics.branchNumber,         // branchCode
            attachments,                          // attachments
        );
    }

    private static extractTaxId(request: TMF632PartnerResponse): string {
        const taxIdInfo = request.body.organizationIdentification.find(
            id => id.identificationType === 'tax identification'
        );
        if (!taxIdInfo?.identificationId) {
            throw new Error('Tax ID not found in request');
        }
        return taxIdInfo.identificationId;
    }

    private static extractEnglishName(request: TMF632PartnerResponse): string {
        const englishNameInfo = request.body.otherName.find(
            name => name.nameType === request.body.nameType
        );
        return englishNameInfo?.name || '';
    }

    private static extractCharacteristics(characteristics: Array<{ name: string; value: string }>) {
        return {
            owner: this.findCharacteristicValue(characteristics, 'account owner'),
            businessIndustry: this.findCharacteristicValue(characteristics, 'business industry'),
            branchNumber: this.findCharacteristicValue(characteristics, 'branch number'),
            vendorCode: this.findCharacteristicValue(characteristics, 'vendor code')
        };
    }

    private static findCharacteristicValue(
        characteristics: Array<{ name: string; value: string }>,
        name: string
    ): string {
        return characteristics.find(c => c.name === name)?.value || '';
    }

    private static mapBusinessType(industry: string): _Partner.BusinessType {
        // Map industry to your domain's BusinessType
        switch (industry.toLowerCase()) {
            case 'food & beverage':
                return _Partner.BusinessType.Corporate;
            default:
                return _Partner.BusinessType.Corporate;
        }
    }

    private static mapStatus(status: string): _Partner.Status {
        switch (status.toLowerCase()) {
            case 'validated':
                return _Partner.Status.Active;
            case 'suspended':
                return _Partner.Status.Suspend;
            default:
                return _Partner.Status.Active;
        }
    }

    private static mapVendorStatus(vendorCode: string): _Partner.VendorStatus {
        if (!vendorCode) return _Partner.VendorStatus.None;
        // Map based on your business rules
        return _Partner.VendorStatus.Approved;
    }

    private static mapAttachments(attachmentData: TMF632PartnerResponse['body']['attachment']): Attachment[] {
        return attachmentData.map(att => new Attachment(
            att.attachmentType,
            att.name,
            att.url,
            att.mimeType
        ));
    }

    // Validation method for the request
    static validateRequest(request: unknown): asserts request is TMF632PartnerResponse {
        const req = request as TMF632PartnerResponse;
        if (!req?.body?.organizationIdentification) {
            throw new Error('Invalid request structure: missing organization identification');
        }
        if (!req?.body?.name) {
            throw new Error('Invalid request structure: missing name');
        }
        // Add more validation as needed
    }

    // Public method to map with validation
    static mapToDomainModel(request: unknown): Partner {
        this.validateRequest(request);
        return this.toDomain(request);
    }
}