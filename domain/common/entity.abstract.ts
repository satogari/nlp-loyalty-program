import { DomainEvent } from "./event.abstract";

export abstract class Entity<T> {
    private _id: T;
    private _createdAt: Date;
    private _updatedAt: Date;
    private _version: number;
    private _domainEvents: DomainEvent[] = [];

    protected constructor(id: T) {
        this._id = id;
        this._createdAt = new Date();
        this._updatedAt = new Date();
        this._version = 1;
    }

    get id(): T {
        return this._id;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    get updatedAt(): Date {
        return this._updatedAt;
    }

    get version(): number {
        return this._version;
    }

    get domainEvents(): DomainEvent[] {
        return this._domainEvents;
    }

    protected addDomainEvent(event: DomainEvent): void {
        this._domainEvents.push(event);
    }

    public clearDomainEvents(): void {
        this._domainEvents = [];
    }

    protected markAsModified(): void {
        this._updatedAt = new Date();
        this._version++;
    }

    public equals(object?: Entity<T>): boolean {
        if (object === null || object === undefined || !(object instanceof Entity)) {
            return false;
        }

        if (this === object) {
            return true;
        }


        return this._id === object._id;
    }

    public hasId(): boolean {
        return this._id !== null && this._id !== undefined;
    }
}
