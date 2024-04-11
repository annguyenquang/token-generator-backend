import { ContractElement } from "../interfaces/ContractElement";

class ModifierCall_Dev implements ContractElement {
    _name: String;
    _args: String[] = [];
    constructor(name: String, args?: String[]) {
        this._name = name;
        args && (this._args = args);
    }
    toString = (): String => {
        return (
            `${this._name}(${this._args.join(", ")})`
        );
    }
    static listToString = (modifierCallList: ModifierCall_Dev[]): String => {
        let res = '';
        modifierCallList.forEach((m) => {
            res += `${m.toString()}, `;
        });
        while (res.charAt(res.length - 1) === ' ' || res.charAt(res.length - 1) === ',') {
            res = res.slice(0, res.length - 1);
        }
        return res;
    }

}
export default ModifierCall_Dev;