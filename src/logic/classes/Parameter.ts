import DataLocation_Dev from "../enums/DataLocation_Dev";
import { ContractElement } from "../interfaces/ContractElement";

class Parameter extends ContractElement {
    _type: String;
    _dataLocation: DataLocation_Dev; //memory -- storage -- none;
    _name: String;

    constructor(type: String, name: String, dataLocation?: DataLocation_Dev) {
        super();
        this._type = type;
        this._name = name;
        this._dataLocation = dataLocation ? dataLocation : DataLocation_Dev.NONE;
    }

    toString: Function = () => {
        return (
            `${this._type} ${Object.values(DataLocation_Dev)[this._dataLocation]} ${this._name}`
        );
    }
}

export default Parameter;