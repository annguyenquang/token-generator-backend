import StateMutability from "../enums/StateMutability_Dev";
import Visibility_Dev from "../enums/Visibility_Dev";
import { ContractElement } from "../interfaces/ContractElement";
import Modifier_Dev from "./Modifier_Dev";
import OverriderSpecifier_Dev from "./OverriderSpecifier_Dev";
import { Parameter } from "./Parameter";

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

    constructor(options: {
        name: String,
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
    }) {
        super();
        const {
            name,
            functionBody,
            parameterList,
            visibility,
            stateMutability,
            modifierList,
            isPayable,
            isVirtual,
            overrideSpecifier,
            extraKeyWord,
            returns
        } = options;
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

class FunctionBuilder {
    private _name: String = '';
    private _parameterList: Parameter[] = [];
    private _visibility: Visibility_Dev = Visibility_Dev.INTERNAL;
    private _stateMutability: StateMutability = StateMutability.NONE;
    private _modifierList: Modifier_Dev[] = [];
    private _isPayable: boolean = false;
    private _isVirtual: boolean = false;
    private _overrideSpecifier: OverriderSpecifier_Dev | undefined;
    private _extraKeyWord: String[] = [];
    private _returns: Parameter[] = [];
    private _functionBody: String = '';

    setName(name: String): FunctionBuilder {
        this._name = name;
        return this;
    }

    setParameterList(parameterList: Parameter[]): FunctionBuilder {
        this._parameterList = parameterList;
        return this;
    }

    setVisibility(visibility: Visibility_Dev): FunctionBuilder {
        this._visibility = visibility;
        return this;
    }

    setStateMutability(stateMutability: StateMutability): FunctionBuilder {
        this._stateMutability = stateMutability;
        return this;
    }

    setModifierList(modifierList: Modifier_Dev[]): FunctionBuilder {
        this._modifierList = modifierList;
        return this;
    }
    setIsPayable(isPayable: boolean): FunctionBuilder {
        this._isPayable = isPayable;
        return this;
    }
    setIsVirtual(isVirtual: boolean): FunctionBuilder { // This is a virtual function
        this._isVirtual = isVirtual;
        return this;
    }
    setOverrideSpecifier(overrideSpecifier: OverriderSpecifier_Dev): FunctionBuilder {
        this._overrideSpecifier = overrideSpecifier;
        return this;
    }
    setExtraKeyWord(extraKeyWord: String[]): FunctionBuilder {
        this._extraKeyWord = extraKeyWord;
        return this;
    }
    setFunctionBody(functionBody: String): FunctionBuilder {
        this._functionBody = functionBody;
        return this;
    }
    setReturns(returns: Parameter[]): FunctionBuilder {
        this._returns = returns;
        return this;
    }
    build(): Function_Dev {
        return new Function_Dev({
            name: this._name,
            functionBody: this._functionBody,
            parameterList: this._parameterList,
            visibility: this._visibility,
            stateMutability: this._stateMutability,
            modifierList: this._modifierList,
            isPayable: this._isPayable,
            isVirtual: this._isVirtual,
            overrideSpecifier: this._overrideSpecifier,
            extraKeyWord: this._extraKeyWord,
            returns: this._returns
        });
    }
}

export { Function_Dev, FunctionBuilder };