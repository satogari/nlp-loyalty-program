export namespace Partner {
    export enum BusinessType {
        Corporate = 'CORPORATE',
        Individual = 'INDIVIDUAL'
    }
    export enum Status {
        Active = 'ACTIVE',
        Suspend = 'SUSPEND'
    }
    export enum VendorStatus {
        None = 'NONE',
        Requested = 'REQUESTED',
        Processing = 'PROCESSING',
        Approved = 'APPROVED',
        Rejected = 'REJECTED',
    }
    export namespace Brand {
        export enum Category {
            Food = 'FOOD',
            Beverage = 'BEVERAGE',
            Retail = 'RETAIL',
            Service = 'SERVICE',
            Other = 'OTHER'
        }
        export enum SubCategory {
            Restaurant = 'RESTAURANT',
            Cafe = 'CAFE',
            Bar = 'BAR',
            Bakery = 'BAKERY',
        }
    }
}