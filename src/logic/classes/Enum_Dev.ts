import { ContractElement } from "../interfaces/ContractElement";

class Enum_Dev implements ContractElement {
    _name: String;
    _enumMember: String[] = [];
    constructor(name: String, enumMember?: String[]) {
        this._name = name;
        enumMember && (this._enumMember = enumMember);
    }
    toString = () => {
        return (
            `enum ${this._name} {${this._enumMember.map((member) => {
                return (" " + member);
            })} }`
        );
    }
}

export default Enum_Dev;