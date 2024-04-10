import ModifierCall_Dev from "../src/logic/classes/ModifierCall_Dev";

describe('ModifierCall', () => {
    test('Test the ModifierCall toString() function', () => {
        const modifierCall = new ModifierCall_Dev("onlyOwner");
        const expectRes = "onlyOwner()";
        expect(modifierCall.toString()).toBe(expectRes);
    });
    test('Test the ModifierCall toString() function with parameters', () => {
        const modifierCall = new ModifierCall_Dev("onlyOwner", ["\"name\"", "\"age\""]);
        console.log(modifierCall.toString());
        const expectRes = "onlyOwner(\"name\", \"age\")";
        expect(modifierCall.toString()).toBe(expectRes);
    });
    test('Test the ModifierCall listToString() function', () => {
        const modifierCallList = [new ModifierCall_Dev("onlyOwner"), new ModifierCall_Dev("onlyAdmin", ["\"name\""])];
        const expectRes = "onlyOwner(), onlyAdmin(\"name\")";
        expect(ModifierCall_Dev.listToString(modifierCallList)).toBe(expectRes);
    });
});