import { Entity } from "../common/entity.abstract";
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

export default class ApplicationConfig {
    constructor(
        private id: Id,
        private name: Name, private value: Value, private message: Message
    ){
    }
    update(value: Value, message: Message){
        this.value = value;
        this.message = message;
    }
}