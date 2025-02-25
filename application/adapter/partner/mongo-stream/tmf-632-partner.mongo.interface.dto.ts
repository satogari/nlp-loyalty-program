interface Timestamp {
    t: number;
    i: number;
}

interface GeographicAddress {
    id: string;
    '@type': string;
    name: string;
}

interface ExternalReference {
    name: string;
    externalReferenceType: string;
}

interface OtherName {
    nameType: string;
    tradingName: string;
    name: string;
    validFor: {
        startDateTime: string;
        endDateTime: string;
    };
}

interface PartyCharacteristic {
    name: string;
    value: string;
    valueType: string;
}

interface OrganizationIdentification {
    identificationType: string;
    identificationId: string;
    identificationDisplay: string;
    registrationDate: string;
    issuingAuthority: string;
}

interface OrganizationParentRelationship {
    relationshipType: string;
    organization: {
        id: string;
        name: string;
        '@referredType': string;
    };
}

interface ContactMedium {
    preferred: boolean;
    mediumType: string;
    geographicAddress: GeographicAddress;
}

interface Attachment {
    attachmentType: string;
    name: string;
    description: string;
    mimeType: string;
    url: string;
}

interface Metadata {
    version: string;
    timestamp: string;
    orgService: string;
    from: string;
    channel: string;
    useCase: string;
    useCaseStep: string;
    session: string;
    transaction: string;
    tmfSpec: string;
    baseApiVersion: string;
    schemaVersion: string;
}

interface FullDocument {
    _id: string;
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
    externalReference: ExternalReference[];
    otherName: OtherName[];
    partyCharacteristic: PartyCharacteristic[];
    organizationIdentification: OrganizationIdentification[];
    organizationParentRelationship: OrganizationParentRelationship;
    contactMedium: ContactMedium[];
    attachment: Attachment[];
    metadata: Metadata;
}

interface DocumentKey {
    _id: string;
}

interface UpdateDescription {
    updatedFields: Record<string, string>;
    removedFields: string[];
    truncatedArrays: any[];
}

interface ClusterTime {
    $timestamp: Timestamp;
}

export interface PartnerMongoDBChangeStreamDocument {
    _id: {
        _data: string;
    };
    operationType: string;
    clusterTime: ClusterTime;
    wallTime: string;
    ns: {
        db: string;
        coll: string;
    };
    documentKey: DocumentKey;
    updateDescription: UpdateDescription;
    fullDocumentBeforeChange: FullDocument;
    fullDocument: FullDocument;
}