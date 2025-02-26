import { Entity } from "../common/entity.abstract";
import { User as _User } from "./user.enum"
import ValueObject from "../common/value-object.abstract";

class UserId extends ValueObject<string> {
    constructor(private value: string) {
        super(value);
    }
}
class Email extends ValueObject<string> {
}
class Role extends ValueObject<string> {

}

class Password extends ValueObject<string> {
}
export class User {
    constructor(
        private id: UserId,
        private email: Email,
        private password: Password,
        private confirmPassword: Password,
        private role: Role,
        private status: _User.Status
    ) {}
    edit(email: Email, role: Role, status: _User.Status) {
        this.email = email;
        this.role = role;
        this.status = status;
    }
}