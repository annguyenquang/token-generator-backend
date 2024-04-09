import { ContractElement } from "../interfaces/ContractElement";
import Constructor_Dev from "./Constructor_Dev";
import Enum_Dev from "./Enum_Dev";
import Error_Dev from "./Error_Dev";
import Event_Dev from "./Event_Dev";
import Fallback_Dev from "./Fallback_Dev";
import Function_Dev from "./Function_Dev";
import Modifier_Dev from "./Modifier_Dev";
import State_Dev from "./State_Dev";
import Struct_Dev from "./Struct_Dev";

class ContractBody_Dev extends ContractElement {

    _contractConstructor: Constructor_Dev;
    _functionList?: Function_Dev[];
    _modifierList?: Modifier_Dev[];
    _fallbackList?: Fallback_Dev[];
    _structList?: Struct_Dev[];
    _enumList?: Enum_Dev[];
    _stateList?: State_Dev[];
    _eventList?: Event_Dev[];
    _errorList?: Error_Dev[];
    _userDefineValueTypeList?: String[];
    _usingDirectiveList?: String[];

    constructor(contractConstructor: Constructor_Dev,
        stateList?: State_Dev[],
        functionList?: Function_Dev[],
        modifierList?: Modifier_Dev[],
        fallbackList?: Fallback_Dev[],
        structList?: Struct_Dev[],
        enumList?: Enum_Dev[],
        eventList?: Event_Dev[],
        errorList?: Error_Dev[],
        userDefineValueTypeList?: String[],
        usingDerectiveList?: String[]
    ) {
        super();
        this._contractConstructor = contractConstructor;
        stateList && (this._stateList = stateList);
        functionList && (this._functionList = functionList);
        modifierList && (this._modifierList = modifierList);
        fallbackList && (this._fallbackList = fallbackList);
        structList && (this._structList = structList);
        enumList && (this._enumList = enumList);
        eventList && (this._eventList = eventList);
        errorList && (this._errorList = errorList);
        userDefineValueTypeList && (this._userDefineValueTypeList = userDefineValueTypeList);
        usingDerectiveList && (this._usingDirectiveList = usingDerectiveList);
    }

    toString: Function = () => {

    }

}

export default ContractBody_Dev;