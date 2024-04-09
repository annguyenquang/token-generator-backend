import { ContractElement } from "../interfaces/ContractElement";

class Struct_Dev extends ContractElement {
    _name: String;
    _structMemerList: { name: String, type: String }[];
    constructor(name: String, structMemberList: { name: String, type: String }[]) {
        super();
        this._name = name;
        this._structMemerList = structMemberList;
    }
    toString: Function = (): String => {
        let res = `struct ${this._name}{\n`;
        this._structMemerList.forEach((e) => {
            res += `${e.type} ${e.name};\n`
        })
        res += `}`;
        return (res);
    }
}

export default Struct_Dev;