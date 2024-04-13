import { ContractElement } from "../interfaces/ContractElement"
import Visitable from "../interfaces/Visitable";
import Visitor from "../visitors/Visitor";
import Constructor_Dev from "./Constructor_Dev";
import ContractBody_Dev from "./ContractBody_Dev";
class Contract_Dev implements ContractElement, Visitable {
    name: String;
    isAbstract: boolean = false;
    inheritances: String[] = [];
    contractBody: ContractBody_Dev = new ContractBody_Dev({ contractConstructor: new Constructor_Dev({ functionBody: '' }) });
    importList: String[] = [];
    version: String = "0.8.0";
    constructor(options: {
        name: String,
        contractBody?: ContractBody_Dev,
        version?: String,
        isAbstract?: boolean,
        inheritances?: String[],
        imports?: String[]
    }) {
        const {
            name,
            contractBody,
            version = "0.8.0",
            isAbstract = false,
            inheritances = [],
            imports = []
        } = options;
        this.name = name;
        contractBody && (this.contractBody = contractBody);
        this.isAbstract = isAbstract;
        this.inheritances = inheritances;
        this.version = version;
        this.importList = imports;
    }
    accept(visitor: Visitor): void {
        throw new Error("Method not implemented.");
    }
    toString: () => string = (): string => {
        let res = "SPDX-License-Identifier: MIT\n"
            + "pragma solidity " + this.version + ";\n"
            + `${this.importList.length > 0 ? `${this.importList.map((imp) => `import "${imp}";`).join("\n")}\n` : ''}`
            + `contract ${this.name} ${this.inheritances.length > 0 ? "is " + this.inheritances.join(", ") : ""}`
            + `${(this.contractBody && this.contractBody.toString().length > 0) ? `{\n${this.contractBody.toString()}\n}` : `{}`}`;
        return res
    }
}

class Contract_DevBuilder {
    private options: {
        name: String,
        contractBody?: ContractBody_Dev,
        version?: String,
        isAbstract?: boolean,
        inheritances?: String[],
        imports?: String[]
    };

    constructor() {
        this.options = {
            name: "",
            contractBody: undefined,
            version: "0.8.0",
            isAbstract: false,
            inheritances: [],
            imports: []
        };
    }

    setName(name: String): Contract_DevBuilder {
        this.options.name = name;
        return this;
    }

    setContractBody(contractBody: ContractBody_Dev): Contract_DevBuilder {
        this.options.contractBody = contractBody;
        return this;
    }

    setVersion(version: String): Contract_DevBuilder {
        this.options.version = version;
        return this;
    }

    setIsAbstract(isAbstract: boolean): Contract_DevBuilder {
        this.options.isAbstract = isAbstract;
        return this;
    }

    setInheritances(inheritances: String[]): Contract_DevBuilder {
        this.options.inheritances = inheritances;
        return this;
    }

    setImports(imports: String[]): Contract_DevBuilder {
        this.options.imports = imports;
        return this;
    }

    build(): Contract_Dev {
        return new Contract_Dev(this.options);
    }
    copy(contract: Contract_Dev): Contract_DevBuilder {
        this.options = {
            name: contract.name,
            contractBody: contract.contractBody,
            version: contract.version,
            isAbstract: contract.isAbstract,
            inheritances: contract.inheritances,
            imports: contract.importList
        }
        return this;
    }
}

export { Contract_Dev, Contract_DevBuilder };