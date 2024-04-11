import { ContractElement } from "../interfaces/ContractElement";
import { Parameter } from "./Parameter";

class Modifier_Dev implements ContractElement {
    _name: String;
    _parameterList: Parameter[] = [];
    constructor(name: String, parameterList?: Parameter[]) {
        this._name = name;
        parameterList && (this._parameterList = parameterList);
    }

    toString = (): String => {
        return (
            `${this._name}(${this._parameterList.map(p => p.toString())})`
        );
    }
}

export default Modifier_Dev;