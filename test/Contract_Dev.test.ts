import e from "express";
import Constructor_Dev from "../src/logic/classes/Constructor_Dev";
import ContractBody_Dev from "../src/logic/classes/ContractBody_Dev";
import { Contract_Dev } from "../src/logic/classes/Contract_Dev";

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

});