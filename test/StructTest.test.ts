import Struct_Dev from "../src/logic/classes/Struct_Dev"

describe('This is the test for toString of Struct', () => {
    test('', () => {
        const struct = new Struct_Dev('Person', [{ name: `name`, type: 'string' }, { name: `age`, type: 'uint' }]);
        const expectRes = 'struct Person{\nstring name;\nuint age;\n}';
        expect(struct.toString()).toBe(expectRes);
    })
})