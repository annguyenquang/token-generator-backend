import Event_Dev from "../src/logic/classes/Event_Dev";
import Parameter from "../src/logic/classes/Parameter";
import DataLocation_Dev from "../src/logic/enums/DataLocation_Dev";

const error1 = new Event_Dev("create", []);
const expectRes1 = "event create();";
const error2 = new Event_Dev("widthdraw", [
    new Parameter("uint256", "age", DataLocation_Dev.NONE),
    new Parameter("string", "name", DataLocation_Dev.MEMORY)
])
const expectRes2 = "event widthdraw( uint256 age, string MEMORY name);";

describe("Test toString() of Parameter", () => {
    test('Test case 1, (the SM event dont have Parameter)', () => {
        expect(error1.toString()).toBe(expectRes1);
    });
    test('Test case 2 (do have Parameter)', () => {
        expect(error2.toString()).toBe(expectRes2);
    })
})