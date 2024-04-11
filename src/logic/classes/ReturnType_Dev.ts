import { ContractElement } from "../interfaces/ContractElement";
import DataLocation_Dev from "../enums/DataLocation_Dev";

class ReturnType_Dev implements ContractElement {
    _type: String;
    _dataLocation: DataLocation_Dev = DataLocation_Dev.NONE;

    constructor(type: String, dataLocation?: DataLocation_Dev) {
        this._type = type;
        dataLocation && (this._dataLocation = dataLocation);
    }
    toString = () => {
        return (
            `${this._type} ${this._dataLocation}`
        )
    }
}

export default ReturnType_Dev;

