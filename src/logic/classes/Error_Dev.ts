import { ContractElement } from "../interfaces/ContractElement";
import { Parameter } from "./Parameter";

class Error_Dev implements ContractElement {
    _name: String;
    _parameterList: Parameter[] = [];

    constructor(name: String, parameterList?: Parameter[]) {
        this._name = name;
        parameterList && (this._parameterList = parameterList);
    }

    toString = (): String => {
        return (
            `error ${this._name}(${this._parameterList.map((param) => {
                return ` ${param.toString()}`;
            }
            )});`
        );
    }
}

export default Error_Dev;