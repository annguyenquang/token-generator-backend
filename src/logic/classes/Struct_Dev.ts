import { ContractElement } from "../interfaces/ContractElement";

class Struct_Dev implements ContractElement {
    _name: String;
    _structMemerList: { name: String, type: String }[];
    constructor(name: String, structMemberList: { name: String, type: String }[]) {
        this._name = name;
        this._structMemerList = structMemberList;
    }
    toString = (): String => {
        let res = `struct ${this._name}{\n`;
        this._structMemerList.forEach((e) => {
            res += `${e.type} ${e.name};\n`
        })
        res += `}`;
        return (res);
    }
}

export default Struct_Dev;