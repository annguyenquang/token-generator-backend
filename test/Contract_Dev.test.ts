import e from "express";
import Constructor_Dev from "../src/logic/classes/Constructor_Dev";
import ContractBody_Dev from "../src/logic/classes/ContractBody_Dev";
import Contract_Dev from "../src/logic/classes/Contract_Dev";

describe('Contract_Dev', () => {
    test('Test Contract_Dev toString Function', () => {
        const expectRes = 'SPDX-License-Identifier: MIT\npragma solidity ^0.8.0;\ncontract TestContract is BaseContract{}';
        const contract = new Contract_Dev('TestContract',
            new ContractBody_Dev(
                new Constructor_Dev(''),
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined
            ), undefined, false, ['BaseContract'], undefined);
        expect(contract.toString()).toBe(expectRes);
    });
});