import ValueObject from "../common/value-object.abstract";

class Id extends ValueObject<string> {
    constructor(private value: string){
        super(value);
    }
}
class Name extends ValueObject<string> {
    constructor(private name: string){
        super(name);
    }
}

class Value extends ValueObject<string> {
    constructor(private value: string){
        super(value);
    }
}

class Message extends ValueObject<string> {
    constructor(private message: string){
        super(message);
    }
}

export default class ApplicationConfig extends Entity<Id> {
    constructor(
        private applicationConfigId: Id,
        private name: Name, private value: Value, private message: Message
    ){
        super(applicationConfigId);
    }
    update(value: Value, message: Message){
        this.value = value;
        this.message = message;
        this.markAsModified();
    }
}