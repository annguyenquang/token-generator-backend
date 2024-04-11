import { ContractElement } from "../interfaces/ContractElement";

class OverriderSpecifier_Dev implements ContractElement {
    _identifierPath: String[] = [];
    constructor(identifierPath?: String[]) {
        identifierPath && (this._identifierPath = identifierPath);
    }

    toString = (): String => {
        return (
            this.listToString(this._identifierPath)
        );
    }

    listToString: Function = (list: String[]): String => {
        let res: String = "";
        if (list && list.length > 0) {
            res = list.map(p => " " + p).join(",");
            while (res[0] === " ") {
                res = res.slice(1);
            }
        }

        return (
            res
        );
    }

}

export default OverriderSpecifier_Dev;