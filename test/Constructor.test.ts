import Constructor_Dev from "../src/logic/classes/Constructor_Dev";
import ModifierCall_Dev from "../src/logic/classes/ModifierCall_Dev";
import Modifier_Dev from "../src/logic/classes/Modifier_Dev";
import { Parameter } from "../src/logic/classes/Parameter";
import Visibility_Dev from "../src/logic/enums/Visibility_Dev";

describe('Constructor', () => {
    test('Test the constructor toString() function', () => {
        const constructor = new Constructor_Dev({
            functionBody: "console.log('Hello World!');",
        });
        const expectRes = "constructor(){\nconsole.log('Hello World!');\n}";
        expect(constructor.toString()).toBe(expectRes);
    });
    test('Test the constructor toString() function with parameters', () => {
        const constructor = new Constructor_Dev({ functionBody: "console.log('Hello World!');", parameterList: [new Parameter("string", "name"), new Parameter("uint", "age")] });
        const expectRes = "constructor(string name, uint age){\nconsole.log('Hello World!');\n}";
        expect(constructor.toString()).toBe(expectRes);
    });
    test('Test real world example', () => {
        const constructor = new Constructor_Dev({
            functionBody: "",
            modifierCallList: [new ModifierCall_Dev({ name: "ERC20", args: ["\"MyToken\"", "\"MTK\""] }), new ModifierCall_Dev({ name: "ERC20Permit", args: ["\"MyToken\""] })],
            payable: false,
            visibility: Visibility_Dev.PUBLIC
        });
        const expectRes = "constructor() ERC20(\"MyToken\", \"MTK\"), ERC20Permit(\"MyToken\"){}";
        expect(constructor.toString()).toBe(expectRes);
    });
});