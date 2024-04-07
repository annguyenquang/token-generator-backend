import { ContractElement } from "../interfaces/ContractElement";

class Enum_Dev extends ContractElement {
    _name: String;
    _enumMember: String[] = [];
    constructor(name: String, enumMember?: String[]) {
        super();
        this._name = name;
        enumMember && (this._enumMember = enumMember);
    }
    toString: Function = () => {
        return (
            `enum ${this._name} {${this._enumMember.map((member) => {
                return (" " + member);
            })} }`
        );
    }
}

export default Enum_Dev;