import { Entity } from "../common/entity.abstract";
import ValueObject from "../common/value-object.abstract";
import Permission from "./permission.vo";
import { User } from "./user.entity";

type RoleId = string;

class Name extends ValueObject<string> {
}
export default class Role {
    constructor(
        private id: RoleId,
        private name: string,
        private permissions: Permission[],
        private modifiedBy: User,
        private modifiedDate: Date,
    ) {
    }
    edit(name: string, permissions: Permission[]) {
        this.name = name
        this.permissions = permissions
    }
}