import ValueObject from "../../common/value-object.abstract";

type Scope = {
    canView: boolean;
    canAdd: boolean;
    canEdit: boolean;
    canExport: boolean;
    canApprove: boolean;
}

export default class Permission extends ValueObject<Scope> {

}