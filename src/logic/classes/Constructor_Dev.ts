import Parameter from "./Parameter";


class Constructor_Dev {
    _parameterList: Parameter[] = [];
    _payable: boolean = true;
    _visibility: String = "public";
    _functionBody: String;
    constructor(functionBody: String, parameterList?: Parameter[], payable?: boolean, visibility?: String) {
        this._functionBody = functionBody;
        if (parameterList) this._parameterList = parameterList;
        if (payable) this._payable = payable;
        if (visibility) this._visibility = visibility;
    }

}

export default Constructor_Dev;