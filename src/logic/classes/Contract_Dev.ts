import { ContractElement } from "../interfaces/ContractElement"
import ContractBody_Dev from "./ContractBody_Dev";
class Contract_Dev extends ContractElement {
    name: String;
    isAbstract: boolean = false;
    inheritances: String[] = [];
    contractBody: ContractBody_Dev;
    importList: String[] = [];
    version: String = "0.8.0";
    constructor(_name: String, _contractBody: ContractBody_Dev, version?: String, _isAbstract?: boolean, _inheritances?: String[], imports?: String[]) {
        super();
        this.name = _name;
        this.contractBody = _contractBody;
        if (_isAbstract) { this.isAbstract = _isAbstract; }
        if (_inheritances) { this.inheritances = _inheritances; }
        version && (this.version = version);
        imports && (this.importList = imports);
    }
    toString: Function = (): String => {
        let res = "SPDX-License-Identifier: MIT\n"
            + "pragma solidity ^" + this.version + ";\n"
            + `${this.importList.length > 0 ? `${this.importList.map((imp) => `import ${imp};`).join("\n")}\n` : ''}`
            + `contract ${this.name} ${this.inheritances.length > 0 ? "is " + this.inheritances.join(", ") : ""}`
            + `${this.contractBody.toString().length > 0 ? `{\n${this.contractBody.toString()}\n}` : `{}`}`;
        return res;
    }
}

export default Contract_Dev;