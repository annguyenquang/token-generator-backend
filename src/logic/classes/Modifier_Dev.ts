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
        let res = `${this._name}(${this._parameterList.map(p => p.toString())})`
        while (res[res.length - 1] === ',' || res[res.length - 1] === ' ') {
            res = res.slice(0, res.length - 1);
        }
        return (res
        );
    }
}

export default Modifier_Dev;