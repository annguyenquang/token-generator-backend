import Function_Dev from "../src/logic/classes/Function_Dev";
import OverriderSpecifier_Dev from "../src/logic/classes/OverriderSpecifier_Dev";
import Parameter from "../src/logic/classes/Parameter";
import DataLocation_Dev from "../src/logic/enums/DataLocation_Dev";
import StateMutability from "../src/logic/enums/StateMutability_Dev";
import Visibility_Dev from "../src/logic/enums/Visibility_Dev";

const func = new Function_Dev("widthdraw",
    "",
    StateMutability.VIEW,
    new OverriderSpecifier_Dev(["Contract1", "Contract2"]),
    [new Parameter("int", "a"), new Parameter("int256", "b"), new Parameter("string", "c", DataLocation_Dev.MEMORY)],
    [new Parameter("int", "d"), new Parameter("int256", "e"), new Parameter("string", "f")],
    Visibility_Dev.PUBLIC, true, true
);

const expectRes = "function widthdraw( int a, int256 b, string MEMORY c) PUBLIC VIEW payable override( Contract1, Contract2 ) payable returns( int d, inte256 e, string f ) {\n}";

describe("Test toString of Function", () => {
    test("Test case 1: (blank function)", () => {
        expect(func.toString()).toBe(expectRes);
    })
})