import { ContractElement } from "../interfaces/ContractElement";
import Parameter from "./Parameter";

class Error_Dev extends ContractElement {
    _name: String;
    _parameterList: Parameter[] = [];
    _isAnonymous: boolean = false;

    constructor(name: String, parameterList?: Parameter[], isAnonymous?: boolean) {
        super();
        this._name = name;
        parameterList && (this._parameterList = parameterList);
        isAnonymous && (this._isAnonymous = isAnonymous);
    }

    toString: Function = () => {

    }
}

export default Error_Dev;