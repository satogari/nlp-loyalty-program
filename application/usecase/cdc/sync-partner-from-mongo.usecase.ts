import Partner from "../../../domain/core/partner/partner.entity";
import { Partner as _Partner } from "../../../domain/core/partner/enums/partner.enum";
import TaxId from "../../../domain/core/partner/vos/tax-id.vo";
import { PartnerMongoDBChangeStreamDocument } from "../../adapter/partner/mongo-stream/tmf-632-partner.mongo.interface.dto";
import { PartnerMapper } from "../../adapter/partner/partner.mapper";

export default class CdcSyncPartnerUseCase {
    constructor(private partnerRepository: PartnerRepository, private partnerMapper: PartnerMapper, private eventPublisher: EventPublisher) {
    }
    async execute(changedPartnerStreamDocument: PartnerMongoDBChangeStreamDocument) {
        switch (changedPartnerStreamDocument.operationType) {
            case StreamOperationType.INSERT:
            case StreamOperationType.REPLACE:
                await this.handleInsertOrReplace(changedPartnerStreamDocument);
                break;

            case StreamOperationType.UPDATE:
                await this.handleUpdate(changedPartnerStreamDocument);
                break;

            case StreamOperationType.DELETE:
                await this.handleDelete(changedPartnerStreamDocument);
                break;

            default:
                // Log unsupported operation type
                console.log(`Unsupported operation type: ${changedPartnerStreamDocument.operationType}`);
                break;
        }

    }

    private async handleInsertOrReplace(document: PartnerMongoDBChangeStreamDocument): Promise<void> {
        // Map the document to domain entity
        let partner = this.partnerMapper.fromMongoDocumentToDomain(document);

        // Save entity to repository (create or replace)
        partner = await this.partnerRepository.save(partner);

        // Publish any domain events that were registered
        this.eventPublisher.publishAll(partner.domainEvents);
        partner.clearDomainEvents();
    }


    private async handleUpdate(document: PartnerMongoDBChangeStreamDocument): Promise<void> {
        // For updates, we need to be more careful - we may want to update only specific fields
        // based on the updateDescription in the change stream document

        // First fetch the existing entity if needed
        const taxId = document.documentKey._id;
        let partner = await this.partnerRepository.findById(new TaxId(taxId));

        if (partner === null) {
            // Handle the case where the entity doesn't exist
            // This could happen in case of data inconsistency
            console.log(`Update operation for non-existent partner: ${taxId}`);

            // You might want to create it instead
            return await this.handleInsertOrReplace(document);
        }

        this.applyPartialUpdates(partner, document.updateDescription);

        // Save the updated entity
        await this.partnerRepository.save(partner);

        // Publish events
        this.eventPublisher.publishAll(partner.domainEvents);
        partner.clearDomainEvents();
    }

    private async handleDelete(document: PartnerMongoDBChangeStreamDocument): Promise<void> {
        let taxId = new TaxId(document.documentKey._id);

        // Delete from repository
        taxId = await this.partnerRepository.delete(taxId);

        this.eventPublisher.publish(new PartnerDeletedEvent(taxId));
    }

    private applyPartialUpdates(partner: Partner, updateDescription: any): void {
        // Extract updated fields from the update description
        const { updatedFields } = updateDescription;

        // Apply updates based on field paths
        for (const [path, value] of Object.entries(updatedFields)) {
            // Handle specific field updates
            // This requires knowledge of your data structure
            if (path === 'status') {
                partner.updatePartnerStatus(this.mapStatus(value as string));
            } else if (path.startsWith('partyCharacteristic')) {
                // Handle characteristic updates
                // You might need more complex logic here
            }
            // Add more field-specific handling as needed
        }
    }

    private mapStatus(status: string): _Partner.Status {
        switch (status.toLowerCase()) {
            case 'validated':
                return _Partner.Status.Active;
            case 'suspended':
                return _Partner.Status.Suspend;
            default:
                return _Partner.Status.Active;
        }
    }
}

interface PartnerRepository {
    findById(taxId: TaxId): Promise<Partner | null>;
    save(partner: Partner): Promise<Partner>;
    delete(taxId: TaxId): Promise<TaxId>;
}
export enum StreamOperationType {
    INSERT = 'insert',
    UPDATE = 'update',
    DELETE = 'delete',
    REPLACE = 'replace',
}

class EventPublisher {
    publish(event: any) {
        // Publish the event
    }
    publishAll(events: any[]) {
        // Publish all events
    }
}

class PartnerDeletedEvent {
    constructor(taxId: TaxId) { }
}
