import Parameter from "../src/logic/classes/Parameter";
import DataLocation_Dev from "../src/logic/enums/DataLocation_Dev";

const para = new Parameter("uint256", "age", DataLocation_Dev.CALLDATA);
const expectRes = "uint256 CALLDATA age"
describe("Test toString() of Parameter", () => {
    test('', () => {
        expect(para.toString()).toBe(expectRes);
    })
})