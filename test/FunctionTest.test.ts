import Function_Dev from "../src/logic/classes/Function_Dev";
import OverriderSpecifier_Dev from "../src/logic/classes/OverriderSpecifier_Dev";
import Parameter from "../src/logic/classes/Parameter";
import DataLocation_Dev from "../src/logic/enums/DataLocation_Dev";
import StateMutability from "../src/logic/enums/StateMutability_Dev";
import Visibility_Dev from "../src/logic/enums/Visibility_Dev";



describe("Test toString of Function", () => {
    test("Test case 1: (full properties function)", () => {
        const func = new Function_Dev("widthdraw",
            "",
            [new Parameter("int", "a"), new Parameter("int256", "b"), new Parameter("string", "c", DataLocation_Dev.MEMORY)],
            Visibility_Dev.PUBLIC,
            StateMutability.NONE,
            [],
            true,
            true,
            new OverriderSpecifier_Dev(["Contract1", "Contract2"]),
            [new Parameter("int", "d"), new Parameter("int256", "e"), new Parameter("string", "f")],
        );

        const expectRes = `function widthdraw(int a, int256 b, string MEMORY c) PUBLIC payable virtual override(Contract1, Contract2) returns(int d, int256 e, string f){}`;
        expect(func.toString()).toBe(expectRes);
    })
    test("Test case 2: (blank function)", () => {
        const func = new Function_Dev("add", "int a = 1;\nint b = a;");
        const expectRes =
            "function add() INTERNAL{\n" +
            "int a = 1;\n" +
            "int b = a;\n}";

        console.log("funct", func.toString());
        console.log("expect", expectRes);

        expect(func.toString()).toBe(expectRes);
    })
})