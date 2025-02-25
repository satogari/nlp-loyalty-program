export interface TMF632PartnerResponse {
    header: {
        version: string;
        timestamp: string;
        orgService: string;
        from: string;
        channel: string;
        broker: string;
        useCase: string;
        useCaseStep: string;
        useCaseAge: string;
        session: string;
        transaction: string;
        communication: string;
        groupTags: string[];
        identity: {
            user: string;
        };
        tmfSpec: string;
        baseApiVersion: string;
        schemaVersion: string;
        instanceData: string;
    };
    body: {
        name: string;
        tradingName: string;
        nameType: string;
        status: string;
        otherName: Array<{
            name: string;
            nameType: string;
        }>;
        partyCharacteristic: Array<{
            name: string;
            value: string;
        }>;
        organizationIdentification: Array<{
            identificationType: string;
            identificationId: string;
        }>;
        attachment: Array<{
            attachmentType: string;
            name: string;
            description: string;
            mimeType: string;
            url: string;
        }>;
    };
}


export interface TMF632BrandResponse {
    header: {
        version: string;
        timestamp: string;
        orgService: string;
        from: string;
        channel: string;
        broker: string;
        useCase: string;
        useCaseStep: string;
        useCaseAge: string;
        session: string;
        transaction: string;
        communication: string;
        groupTags: string[];
        identity: {
            user: string;
        };
        tmfSpec: string;
        baseApiVersion: string;
        schemaVersion: string;
        instanceData: string;
    };
    body: {
        id: string;
        isLegalEntity: boolean;
        isHeadOffice: boolean;
        organizationType: string;
        name: string;
        existsDuring: {
            startDateTime: string;
            endDateTime: string;
        };
        tradingName: string;
        nameType: string;
        status: string;
        externalReference: {
            name: string;
            externalReferenceType: string;
        }[];
        otherName: {
            nameType: string;
            tradingName: string;
            name: string;
            validFor: {
                startDateTime: string;
                endDateTime: string;
            };
        }[];
        partyCharacteristic: {
            name: string;
            value: string;
            valueType: string;
        }[];
        organizationIdentification: {
            identificationType: string;
            identificationId: string;
            identificationDisplay: string;
            registrationDate: string;
            issuingAuthority: string;
        }[];
        organizationParentRelationship: {
            relationshipType: string;
            organization: {
                id: string;
                name: string;
                "@referredType": string;
            };
        };
        contactMedium: {
            preferred: boolean;
            mediumType: string;
            geographicAddress: {
                id: string;
                "@type": string;
                name: string;
            };
        }[];
        attachment: {
            attachmentType: string;
            name: string;
            description: string;
            mimeType: string;
            url: string;
        }[];
    };
}