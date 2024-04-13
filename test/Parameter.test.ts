import { Parameter } from "../src/logic/classes/Parameter";
import DataLocation_Dev from "../src/logic/enums/DataLocation_Dev";

const para = new Parameter("uint256", "age", DataLocation_Dev.CALLDATA);
const para1 = new Parameter("uint", "year", DataLocation_Dev.MEMORY);
const para2 = new Parameter("string", "name", DataLocation_Dev.NONE);
describe("Test toString() of Parameter", () => {
    test('', () => {
        const expectRes = "uint256 calldata age";
        expect(para.toString()).toBe(expectRes);
    })
    test('Test hàm listToString', () => {
        const paraList: Parameter[] = [para, para1, para2];
        const expectRes = "uint256 calldata age, uint memory year, string name";
        expect(Parameter.listToString(paraList)).toBe(expectRes);
    })
})