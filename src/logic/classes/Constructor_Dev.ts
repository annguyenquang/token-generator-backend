import Visibility_Dev from "../enums/Visibility_Dev";
import { ContractElement } from "../interfaces/ContractElement";
import Parameter from "./Parameter";


class Constructor_Dev extends ContractElement {
    _parameterList: Parameter[] = [];
    _payable: boolean = true;
    _visibility: Visibility_Dev = Visibility_Dev.PUBLIC;
    _functionBody: String;
    constructor(functionBody: String, parameterList?: Parameter[], payable?: boolean, visibility?: Visibility_Dev) {
        super();
        this._functionBody = functionBody;
        if (parameterList) this._parameterList = parameterList;
        if (payable) this._payable = payable;
        if (visibility) this._visibility = visibility;
    }
    // Implement the code here
    toString = (): string => {
        // Generate the code for the constructor
        let code = `${Object.values(Visibility_Dev)[this._visibility]} constructor(`;
        if (this._parameterList.length > 0) {
            code += Parameter.listToString(this._parameterList);
        }
        code += `)`;

        // Add the function body if provided
        if (this._functionBody) {
            code += `{\n${this._functionBody}\n}`;
        }

        return code;
    }
    // Generate getters and setters for the class properties
    get parameterList(): Parameter[] {
        return this._parameterList;
    }

    set parameterList(value: Parameter[]) {
        this._parameterList = value;
    }

    get payable(): boolean {
        return this._payable;
    }

    set payable(value: boolean) {
        this._payable = value;
    }

    get visibility(): Visibility_Dev {
        return this._visibility;
    }

    set visibility(value: Visibility_Dev) {
        this._visibility = value;
    }

    get functionBody(): String {
        return this._functionBody;
    }

    set functionBody(value: String) {
        this._functionBody = value;
    }
}

export default Constructor_Dev;