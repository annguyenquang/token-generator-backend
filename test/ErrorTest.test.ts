import Error_Dev from "../src/logic/classes/Error_Dev";
import { Parameter } from "../src/logic/classes/Parameter";
import DataLocation_Dev from "../src/logic/enums/DataLocation_Dev";

const error1 = new Error_Dev("NotOwner", []);
const expectRes1 = "error NotOwner();";
const error2 = new Error_Dev("NotSigner", [
    new Parameter("uint256", "age", DataLocation_Dev.NONE),
    new Parameter("string", "name", DataLocation_Dev.MEMORY)
])
const expectRes2 = "error NotSigner( uint256 age, string memory name);";

describe("Test toString() of Parameter", () => {
    test('Test case 1, (the SM error dont have Parameter)', () => {
        expect(error1.toString()).toBe(expectRes1);
    });
    test('Test case 2 (do have Parameter)', () => {
        expect(error2.toString()).toBe(expectRes2);
    })
})