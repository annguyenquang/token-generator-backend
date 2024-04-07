import Enum_Dev from "../src/logic/classes/Enum_Dev";

const _enum = new Enum_Dev("FreshJuiceSize", ["SMALL", "MEDIUM", "LARGE"]);
const correctRes = "enum FreshJuiceSize { SMALL, MEDIUM, LARGE }";

describe('Test toString function Of Enum', () => {
    test('', () => {
        expect(_enum.toString()).toBe(correctRes);
    })
})

