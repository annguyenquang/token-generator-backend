import { stat } from "fs";
import Visibility_Dev from "../enums/Visibility_Dev";
import { ContractElement } from "../interfaces/ContractElement";
import OverriderSpecifier_Dev from "./OverriderSpecifier_Dev";
class State_Dev implements ContractElement {
    _name: String;
    _type: String;
    _visibility?: Visibility_Dev = Visibility_Dev.INTERNAL;
    _isConstant?: boolean = false;
    _overrideList?: OverriderSpecifier_Dev;
    _isImmutable?: boolean = false;
    _value?: String | undefined;
    constructor(name: String, type: String, visibility?: Visibility_Dev, isConstant?: boolean, overrideList?: OverriderSpecifier_Dev, isImmutable?: boolean, value?: String) {
        this._name = name;
        this._type = type;
        visibility && (this._visibility = visibility);
        isConstant && (this._isConstant = isConstant);
        overrideList && (this._overrideList = overrideList);
        isImmutable && (this._isImmutable = isImmutable);
        value && (this._value = value);
    }
    toString = (): String => {
        return (`${this._type}`
            + `${this._visibility ? ' ' + this._visibility : ''}`
            + `${this._isImmutable ? ' immutable' : ''}`
            + `${this._isConstant ? ' constant' : ''}`
            + `${this._overrideList ? this._overrideList.listToString() : ''}`)
            + ` ${this._name}`
            + `${this._value ? (` = ${this._value};`) : ''}`;
    }

    static listToString = (stateList: State_Dev[]): String => {
        let res = '';
        stateList.forEach((item, idx) => {
            if (idx === 0) {
                res += item.toString();
            } else {
                res += '\n' + item.toString();
            }
        })
        return res;
    }
}


export default State_Dev;
