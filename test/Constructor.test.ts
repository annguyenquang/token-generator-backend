import Constructor_Dev from "../src/logic/classes/Constructor_Dev";
import Parameter from "../src/logic/classes/Parameter";

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
});