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
    static listToString = (modifierList: Modifier_Dev[]): String => {
        let res = '';
        for (let i = 0; i < modifierList.length; i++) {
            res += modifierList[i].toString() + ' ';
        }
        if (res[res.length - 1] === ' ') {
            res = res.slice(0, res.length - 1);
        }
        return res;
    }
}

export default Modifier_Dev;