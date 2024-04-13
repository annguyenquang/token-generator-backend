import Modifier_Dev from "../src/logic/classes/Modifier_Dev";
import { Parameter } from "../src/logic/classes/Parameter";
import DataLocation_Dev from "../src/logic/enums/DataLocation_Dev";

const modifier = new Modifier_Dev("myModifier", [new Parameter("uint256", "age"), new Parameter("string", "name", DataLocation_Dev.CALLDATA)]);
const expectRes = "myModifier(uint256 age,string calldata name)"
describe("Test toString of Modifier ", () => {
    test('', () => {
        expect(modifier.toString()).toBe(expectRes);
    })
})