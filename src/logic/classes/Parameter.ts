import DataLocation_Dev from "../enums/DataLocation_Dev";
import { ContractElement } from "../interfaces/ContractElement";

class Parameter extends ContractElement {
    _type: String;
    _dataLocation: DataLocation_Dev = DataLocation_Dev.NONE; //memory -- storage -- none;
    _name: String;

    constructor(type: String, name: String, dataLocation?: DataLocation_Dev) {
        super();
        this._type = type;
        this._name = name;
        dataLocation && (this._dataLocation = dataLocation)
    }

    toString: Function = () => {
        const location = this._dataLocation === DataLocation_Dev.NONE ? " " : " " + Object.values(DataLocation_Dev)[this._dataLocation] + " ";
        // console.log("location1:", this._dataLocation);
        // console.log("location2:", location);
        // // console.log(location);
        // // Object.values((DataLocation_Dev)).forEach((element: any) => {
        // //     console.log(element);
        // // });
        return (
            `${this._type}${location}${this._name}`
        );
    }
}

export default Parameter;