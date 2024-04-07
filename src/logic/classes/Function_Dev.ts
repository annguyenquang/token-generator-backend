import StateMutability from "../enums/StateMutability_Dev";
import Visibility_Dev from "../enums/Visibility_Dev";
import { ContractElement } from "../interfaces/ContractElement";
import OverriderSpecifier_Dev from "./OverriderSpecifier_Dev";
import Parameter from "./Parameter";

class Function_Dev extends ContractElement {
    _name: String;
    _parameterList: Parameter[] = [];
    _visibility: Visibility_Dev = Visibility_Dev.INTERNAL;
    _stateMutability: StateMutability = StateMutability.NONE;
    _isPayable: boolean = false;
    _isVirtual: boolean = false;
    _overrideSpecifier: OverriderSpecifier_Dev | undefined;
    _returns: Parameter[] = [];
    _functionBody: String;

    constructor(name: String,
        functionBody: String,
        stateMutability?: StateMutability,
        overrideSpecifier?: OverriderSpecifier_Dev,
        parameterList?: Parameter[],
        returns?: Parameter[],
        visibility?: Visibility_Dev,
        isPayable?: boolean,
        isVirtual?: boolean,

    ) {
        super();
        this._name = name;
        this._functionBody = functionBody;
        stateMutability && (this._stateMutability = stateMutability);
        overrideSpecifier && (this._overrideSpecifier = overrideSpecifier);
        parameterList && (this._parameterList = parameterList);
        returns && (this._returns = returns);
        visibility && (this._visibility = visibility);
        isPayable && (this._isPayable = isPayable);
        isVirtual && (this._isVirtual = isVirtual);
    }
    toString: Function = () => {
        return (
            `function ${this._name}(${this._parameterList.map((p) => { return (`${p.toString()}`) })}) ${Object.values(Visibility_Dev)[this._visibility]} ${this._stateMutability ? Object.values(StateMutability)[this._stateMutability] : ""} ${this._isVirtual ? `virtual` : ""} ${this._overrideSpecifier ? `override(${this._overrideSpecifier._identifierPath.toString()}) ` : ""}${this._isPayable ? "payable" : ""} ${this._returns.length !== 0 ? `returns(${this._returns.map(p => `${p.toString()}`)})` : ""}` + `{\n
                ${this._functionBody} \n}`

        )
    }
}

export default Function_Dev;