import Constructor_Dev from "../src/logic/classes/Constructor_Dev";
import ModifierCall_Dev from "../src/logic/classes/ModifierCall_Dev";
import Modifier_Dev from "../src/logic/classes/Modifier_Dev";
import { Parameter } from "../src/logic/classes/Parameter";
import Visibility_Dev from "../src/logic/enums/Visibility_Dev";

describe('Constructor', () => {
    test('Test the constructor toString() function', () => {
        const constructor = new Constructor_Dev("console.log('Hello World!');");
        const expectRes = "PUBLIC constructor(){\nconsole.log('Hello World!');\n}";
        expect(constructor.toString()).toBe(expectRes);
    });
    test('Test the constructor toString() function with parameters', () => {
        const constructor = new Constructor_Dev("console.log('Hello World!');", [new Parameter("string", "name"), new Parameter("uint", "age")]);
        const expectRes = "PUBLIC constructor(string name, uint age){\nconsole.log('Hello World!');\n}";
        expect(constructor.toString()).toBe(expectRes);
    });
    test('Test real world example', () => {
        const constructor = new Constructor_Dev("", [], [new ModifierCall_Dev("ERC20", ["\"MyToken\"", "\"MTK\""]), new ModifierCall_Dev("ERC20Permit", ["\"MyToken\""])], false, Visibility_Dev.PUBLIC,);
        const expectRes = "PUBLIC constructor() ERC20(\"MyToken\", \"MTK\"), ERC20Permit(\"MyToken\"){}";
        expect(constructor.toString()).toBe(expectRes);
    });
});