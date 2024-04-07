import { ContractElement } from "../interfaces/ContractElement";
import Parameter from "./Parameter";

class Error_Dev extends ContractElement {
    _name: String;
    _parameterList: Parameter[] = [];

    constructor(name: String, parameterList?: Parameter[]) {
        super();
        this._name = name;
        parameterList && (this._parameterList = parameterList);
    }

    toString: Function = (): String => {
        return (
            `error ${this._name}(${this._parameterList.map((param) => {
                return ` ${param.toString()}`;
            }
            )});`
        );
    }
}

export default Error_Dev;