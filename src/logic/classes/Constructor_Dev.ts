import Visibility_Dev from "../enums/Visibility_Dev";
import { ContractElement } from "../interfaces/ContractElement";
import { Parameter } from "./Parameter";
import ModifierCall_Dev from "./ModifierCall_Dev";
import exp from "constants";


class Constructor_Dev implements ContractElement {
    accept: Function = () => { };
    _parameterList: Parameter[] = [];
    _payable: boolean = true;
    _visibility: Visibility_Dev = Visibility_Dev.PUBLIC;
    _functionBody: String;
    _modifierCallList: ModifierCall_Dev[] = [];
    constructor({
        functionBody,
        parameterList,
        modifierCallList,
        payable,
        visibility
    }: {
        functionBody: string,
        parameterList?: Parameter[],
        modifierCallList?: ModifierCall_Dev[],
        payable?: boolean,
        visibility?: Visibility_Dev
    }) {
        this._functionBody = functionBody;
        if (parameterList) {
            this._parameterList = parameterList;
        }
        if (payable) {
            this._payable = payable;
        }
        if (visibility) {
            this._visibility = visibility;
        }
        if (modifierCallList) {
            this._modifierCallList = modifierCallList;
        }
    }
    // Implement the code here
    toString = (): String => {
        // Generate the code for the constructor
        let code = `${Object.values(Visibility_Dev)[this._visibility]} constructor(`;
        if (this._parameterList.length > 0) {
            code += Parameter.listToString(this._parameterList);
        }
        code += `)`;
        // Add the modifiers if provided
        if (this._modifierCallList.length > 0) {
            code += ` ${ModifierCall_Dev.listToString(this._modifierCallList)}`
        }

        if (this._functionBody.length > 0) {
            code += `{\n${this._functionBody}\n}`;
        } else {
            code += "{}";
        }

        return code;

    }
}

export default Constructor_Dev;