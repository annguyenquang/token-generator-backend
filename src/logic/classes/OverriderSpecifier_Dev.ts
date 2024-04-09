import { ContractElement } from "../interfaces/ContractElement";

class OverriderSpecifier_Dev extends ContractElement {
    _identifierPath: String[] = [];
    constructor(identifierPath?: String[]) {
        super();
        identifierPath && (this._identifierPath = identifierPath);
    }

    toString: Function = (): String => {
        return (
            this.listToString(this._identifierPath)
        );
    }

    listToString: Function = (list: String[]): String => {
        let res: String = "";
        if (list && list.length > 0) {
            res = `${list.map(p => (" " + p.toString()))}`;
            while (res[-1] === " ") {
                res = res.slice(0);
            }
        }

        return (
            res
        );
    }

}

export default OverriderSpecifier_Dev;