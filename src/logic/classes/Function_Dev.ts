import StateMutability from "../enums/StateMutability_Dev";
import Visibility_Dev from "../enums/Visibility_Dev";
import { ContractElement } from "../interfaces/ContractElement";
import Modifier_Dev from "./Modifier_Dev";
import OverriderSpecifier_Dev from "./OverriderSpecifier_Dev";
import Parameter from "./Parameter";

class Function_Dev extends ContractElement {
    _name: String;
    _parameterList: Parameter[] = [];
    _visibility: Visibility_Dev = Visibility_Dev.INTERNAL;
    _stateMutability: StateMutability = StateMutability.NONE;
    _modifierList: Modifier_Dev[] = [];
    _isPayable: boolean = false;
    _isVirtual: boolean = false;
    _overrideSpecifier: OverriderSpecifier_Dev | undefined;
    _extraKeyWord: String[] = [];
    _returns: Parameter[] = [];
    _functionBody: String;

    constructor(name: String,
        functionBody: String,
        parameterList?: Parameter[],
        visibility?: Visibility_Dev,
        stateMutability?: StateMutability,
        modifierList?: Modifier_Dev[],
        isPayable?: boolean,
        isVirtual?: boolean,
        overrideSpecifier?: OverriderSpecifier_Dev,
        extraKeyWord?: String[],  // This is an extra keyword that can be added to the function
        returns?: Parameter[],
    ) {
        super();
        this._name = name;
        this._functionBody = functionBody;
        stateMutability && (this._stateMutability = stateMutability);
        overrideSpecifier && (this._overrideSpecifier = overrideSpecifier);
        modifierList && (this._modifierList = modifierList);
        parameterList && (this._parameterList = parameterList);
        returns && (this._returns = returns);
        visibility && (this._visibility = visibility);
        isPayable && (this._isPayable = isPayable);
        isVirtual && (this._isVirtual = isVirtual);
        extraKeyWord && (this._extraKeyWord = extraKeyWord);
    }

    toString: Function = () => {
        return (
            "function" +
            ` ${this._name}`
            + `(${Parameter.listToString(this._parameterList)})`
            + `${this._visibility && " " + Object.values(Visibility_Dev)[this._visibility]}`
            + `${this._stateMutability ? "" + Object.values(StateMutability)[this._stateMutability] : ""}`
            + `${this._isPayable ? " payable" : ""}`
            + `${this._isVirtual ? " virtual" : ""}`
            + `${this._extraKeyWord.length !== 0 ? ` ${this._extraKeyWord.join(" ")}` : ""}`
            + `${this._overrideSpecifier ? ` override(${this._overrideSpecifier.toString()})` : ""}`
            + `${this._returns.length !== 0 ? ` returns(${Parameter.listToString(this._returns)})` : ""}` +
            "{" +
            `${this._functionBody.length !== 0 ? ('\n' + this._functionBody + '\n') : ''}`
            + "}"

        )
    }
}

export default Function_Dev;