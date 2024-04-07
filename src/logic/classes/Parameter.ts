class Parameter {
    _type: String;
    _dataLocation: String; //memory -- storage -- none;
    _name: String;

    constructor(type: String, name: String, dataLocation?: String) {
        this._type = type;
        this._name = name;
        this._dataLocation = dataLocation ? dataLocation : "";
    }
}

export default Parameter;