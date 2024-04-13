import { Function_Dev, FunctionBuilder } from "../src/logic/classes/Function_Dev";
import OverriderSpecifier_Dev from "../src/logic/classes/OverriderSpecifier_Dev";
import { Parameter, ParameterBuilder } from "../src/logic/classes/Parameter";
import DataLocation_Dev from "../src/logic/enums/DataLocation_Dev";
import StateMutability from "../src/logic/enums/StateMutability_Dev";
import Visibility_Dev from "../src/logic/enums/Visibility_Dev";



describe("Test toString of Function", () => {
    test("Test case 1: (full properties function)", () => {
        const func = new Function_Dev({
            name: "widthdraw",
            functionBody: "",
            parameterList: [new Parameter("int", "a"), new Parameter("int256", "b"), new Parameter("string", "c", DataLocation_Dev.MEMORY)],
            visibility: Visibility_Dev.PUBLIC,
            stateMutability: StateMutability.NONE,
            isPayable: true,
            isVirtual: true,
            overrideSpecifier: new OverriderSpecifier_Dev(["Contract1", "Contract2"]),
            extraKeyWord: ["initializer"],
            returns: [new Parameter("int", "d"), new Parameter("int256", "e"), new Parameter("string", "f")],
        });

        const expectRes = `function widthdraw(int a, int256 b, string memory c) public payable virtual initializer override(Contract1, Contract2) returns(int d, int256 e, string f){}`;
        expect(func.toString()).toBe(expectRes);
    })
    test("Test case 2: (blank function)", () => {
        const func = new Function_Dev({
            name: "add",
            functionBody: "int a = 1;\nint b = a;",
        });
        const expectRes =
            "function add() internal{\n" +
            "int a = 1;\n" +
            "int b = a;\n}";

        console.log("funct", func.toString());
        console.log("expect", expectRes);

        expect(func.toString()).toBe(expectRes);
    })
    test("Test case 3: (function with parameters)", () => {
        const func = new Function_Dev({
            name: "add",
            functionBody: "",
            parameterList: [new Parameter("int", "a"), new Parameter("int256", "b"), new Parameter("string", "c", DataLocation_Dev.MEMORY)],
            visibility: Visibility_Dev.PUBLIC,
            stateMutability: StateMutability.NONE,
            isPayable: true,
            isVirtual: true,
            overrideSpecifier: new OverriderSpecifier_Dev(["Contract1", "Contract2"]),
            extraKeyWord: ["initializer"],
            returns: [new ParameterBuilder().setName('d').setType('int').build(), new Parameter("int256", "e"), new Parameter("string", "f")],
        });

        const expectRes = `function add(int a, int256 b, string memory c) public payable virtual initializer override(Contract1, Contract2) returns(int d, int256 e, string f){}`;
        expect(func.toString()).toBe(expectRes);
    });
    test("Test case 5: Test FunctionBuilder", () => {
        const func = new FunctionBuilder().setName("add")
            .setParameterList([new Parameter("int", "a"), new Parameter("int256", "b"), new Parameter("string", "c", DataLocation_Dev.MEMORY)])
            .setVisibility(Visibility_Dev.PUBLIC)
            .setIsPayable(true)
            .setIsVirtual(true)
            .setOverrideSpecifier(new OverriderSpecifier_Dev(["Contract1", "Contract2"]))
            .setExtraKeyWord(["initializer"])
            .setReturns([new Parameter("int", "d"), new Parameter("int256", "e"), new Parameter("string", "f")])
            .setFunctionBody("int a = 1;\nint b = a;")
            .build();
        const expectRes = `function add(int a, int256 b, string memory c) public payable virtual initializer override(Contract1, Contract2) returns(int d, int256 e, string f){\nint a = 1;\nint b = a;\n}`;
        expect(func.toString()).toBe(expectRes);
    })
})