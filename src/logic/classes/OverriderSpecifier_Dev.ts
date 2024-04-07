import { ContractElement } from "../interfaces/ContractElement";

class OverriderSpecifier_Dev extends ContractElement {
    _identifierPath: String[] = [];
    constructor(identifierPath?: String[]) {
        super();
        identifierPath && (this._identifierPath = identifierPath);
    }

    toString = (): String => {
        return (`${this._identifierPath.map((path) => {
            return (` ${path}`)
        })}`);
    }


}

export default OverriderSpecifier_Dev;