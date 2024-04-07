import StateMutability from "../enums/StateMutability_Dev";
import Visibility_Dev from "../enums/Visibility_Dev";
import { ContractElement } from "../interfaces/ContractElement";
import OverriderSpecifier_Dev from "./OverriderSpecifier_Dev";
import Parameter from "./Parameter";

class Function_Dev extends ContractElement {
    _name: String;
    _parameterList: Parameter[] = [];
    _visibility: Visibility_Dev = Visibility_Dev.INTERNAL;
    _stateMutability: StateMutability; //view - pure
    _isPayable: boolean = true;
    _isVirtual: boolean = false;
    _overrideSpecifier: OverriderSpecifier_Dev;
    _returns: Parameter[] = [];
    _functionBody: String;

    constructor(name: String,
        stateMutability: StateMutability,
        overrideSpecifier: OverriderSpecifier_Dev,
        functionBody: String,
        parameterList?: Parameter[],
        returns?: Parameter[],
        visibility?: Visibility_Dev,
        isPayable?: boolean,
        isVirtual?: boolean,

    ) {
        super();
        this._name = name;
        this._stateMutability = stateMutability;
        this._overrideSpecifier = overrideSpecifier;
        this._functionBody = functionBody;
        parameterList && (this._parameterList = parameterList);
        returns && (this._returns = returns);
        visibility && (this._visibility = visibility);
        isPayable && (this._isPayable = isPayable);
        isVirtual && (this._isVirtual = isVirtual);
    }
    toString: Function = () => {

    }
}

export default Function_Dev;