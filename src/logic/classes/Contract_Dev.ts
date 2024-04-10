import { ContractElement } from "../interfaces/ContractElement"
import ContractBody_Dev from "./ContractBody_Dev";
class Contract_Dev extends ContractElement {
    name: String;
    isAbstract: boolean = false;
    inheritances: String[] = [];
    contractBody: ContractBody_Dev;
    importList: String[] = [];
    version: String = "0.8.0";
    constructor(options: {
        name: String,
        contractBody: ContractBody_Dev,
        version?: String,
        isAbstract?: boolean,
        inheritances?: String[],
        imports?: String[]
    }) {
        super();
        const {
            name,
            contractBody,
            version = "0.8.0",
            isAbstract = false,
            inheritances = [],
            imports = []
        } = options;
        this.name = name;
        this.contractBody = contractBody;
        this.isAbstract = isAbstract;
        this.inheritances = inheritances;
        this.version = version;
        this.importList = imports;
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

// class ContractBuilder {
//     _name: String = "";
//     _isAbstract: boolean = false;
//     _inheritances: String[] = [];
//     _contractBody: ContractBody_Dev = new ContractBody_Dev(); // Initialize _contractBody property
//     _importList: String[] = [];
//     _version: String = "0.8.0";

//     setName(name: String): ContractBuilder {
//         this._name = name;
//         return this;
//     }

//     setIsAbstract(isAbstract: boolean): ContractBuilder {
//         this._isAbstract = isAbstract;
//         return this;
//     }

//     setInheritances(inheritances: String[]): ContractBuilder {
//         this._inheritances = inheritances;
//         return this;
//     }

//     setContractBody(contractBody: ContractBody_Dev): ContractBuilder {
//         this._contractBody = contractBody;
//         return this;
//     }

//     setImportList(importList: String[]): ContractBuilder {
//         this._importList = importList;
//         return this;
//     }

//     build(): Contract_Dev {
//         return new Contract_Dev({
//             name: this._name,
//             contractBody: this._contractBody,
//             version: this._version,
//             isAbstract: this._isAbstract,
//             inheritances: this._inheritances,
//             imports: this._importList
//         });
//     }
// }

export default Contract_Dev;