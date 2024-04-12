import { ContractElement } from "../interfaces/ContractElement";

class ModifierCall_Dev implements ContractElement {
    _name: String;
    _args: String[] = [];
    constructor(object: {
        name: String,
        args?: String[]
    }) {
        const { name, args } = object;
        this._name = name;
        args && (this._args = args);
    }
    toString = (): String => {
        let res = `${this._name}(${this._args.map((item, index) => index === 0 ? item : (' ' + item))})`
        while (res.charAt(0) === ' ' || res.charAt(0) === ',') {
            res = res.slice(1);
        }
        return res;
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