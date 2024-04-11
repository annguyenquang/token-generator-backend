import { ContractElement } from "../interfaces/ContractElement";
import { Parameter } from "./Parameter";

class Event_Dev implements ContractElement {
    _name: String;
    _parameterList: Parameter[] = [];
    _isAnonymous: boolean = false;

    constructor(name: String, parameterList?: Parameter[], isAnonymous?: boolean) {
        this._name = name;
        parameterList && (this._parameterList = parameterList);
        isAnonymous && (this._isAnonymous = isAnonymous);
    }
    toString = (): String => {
        return (
            `event ${this._name}(${this._parameterList.map((param) => {
                return ` ${param.toString()}`;
            })});`
        );
    }
}

export default Event_Dev;