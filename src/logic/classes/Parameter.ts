import DataLocation_Dev from "../enums/DataLocation_Dev";
import { ContractElement } from "../interfaces/ContractElement";

class ParameterBuilder {
    _type: String = '';
    _dataLocation: DataLocation_Dev = DataLocation_Dev.NONE; //memory -- storage -- none;
    _name: String = '';

    setType(type: String): ParameterBuilder {
        this._type = type;
        return this;
    }

    setDataLocation(dataLocation: DataLocation_Dev): ParameterBuilder {
        this._dataLocation = dataLocation;
        return this;
    }

    setName(name: String): ParameterBuilder {
        this._name = name;
        return this;
    }

    build(): Parameter {
        return new Parameter(this._type, this._name, this._dataLocation);
    }
}

class Parameter implements ContractElement {
    _type: String;
    _dataLocation: DataLocation_Dev = DataLocation_Dev.NONE; //memory -- storage -- none;
    _name: String;

    constructor(type: String, name: String, dataLocation?: DataLocation_Dev) {
        this._type = type;
        this._name = name;
        dataLocation && (this._dataLocation = dataLocation)
    }

    toString = () => {
        const location = this._dataLocation === DataLocation_Dev.NONE ? " " : " " + Object.values(DataLocation_Dev)[this._dataLocation] + " ";
        return (
            `${this._type}${location}${this._name}`
        );
    }

    static listToString: Function = (list: Parameter[]): String => {
        let res: String;
        res = `${list.map(p => (" " + p.toString()))}`;
        while (res[0] === " ") {
            res = res.slice(1);
        }
        return (
            res
        );
    }
}

export { Parameter, ParameterBuilder };