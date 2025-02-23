// Base interface for all domain events
interface DomainEvent {
    readonly occurredOn: Date;
    readonly eventVersion: number;
}

// Base abstract class for domain events
abstract class BaseDomainEvent implements DomainEvent {
    public readonly occurredOn: Date;
    public readonly eventVersion: number;

    protected constructor() {
        this.occurredOn = new Date();
        this.eventVersion = 1;
    }
}
