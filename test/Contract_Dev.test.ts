import e from "express";
import Constructor_Dev from "../src/logic/classes/Constructor_Dev";
import ContractBody_Dev from "../src/logic/classes/ContractBody_Dev";
import { Contract_Dev, Contract_DevBuilder } from "../src/logic/classes/Contract_Dev";
import ModifierCall_Dev from "../src/logic/classes/ModifierCall_Dev";

describe('Contract_Dev', () => {
    test('Test Contract_Dev toString Function', () => {
        const expectRes = 'SPDX-License-Identifier: MIT\npragma solidity ^0.8.0;\ncontract TestContract is BaseContract{}';
        const contract = new Contract_Dev({
            name: "TestContract",
            contractBody: new ContractBody_Dev({
                contractConstructor: new Constructor_Dev({
                    functionBody: ''
                })
            }),
            inheritances: ["BaseContract"],
            version: "0.8.0",
            isAbstract: false,
            imports: [],
        });
        expect(contract.toString()).toBe(expectRes);
    }
    ); // Removed extra arguments
    test('Test if contract body is contained in toString function', () => {
        const expectRes = 'SPDX-License-Identifier: MIT\npragma solidity ^0.8.20;\ncontract MyToken is ERC20{\nconstructor() ERC20("MyToken, ""){}';
        const contract: String = new Contract_DevBuilder()
            .setName("Antrium")
            .setInheritances(["ERC20"])
            .setImports(["@openzeppelin/contracts/token/ERC20/ERC20.sol"])
            .setVersion("^0.8.20")
            .setContractBody(new ContractBody_Dev({
                contractConstructor: new Constructor_Dev({
                    functionBody: "",
                    modifierCallList: [new ModifierCall_Dev({ name: "ERC20", args: ["Antrium"] })]
                })
            }))
            .build().toString();
        expect(contract).toBe(expectRes);
    })
});