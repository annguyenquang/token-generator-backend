import OverriderSpecifier_Dev from "../src/logic/classes/OverriderSpecifier_Dev"
import State_Dev from "../src/logic/classes/State_Dev"
import StateMutability from "../src/logic/enums/StateMutability_Dev"
import Visibility_Dev from "../src/logic/enums/Visibility_Dev"

describe('This is State toString() function test', () => {
    test("First test for toString() function", () => {
        const state = new State_Dev('name', 'uint256', Visibility_Dev.EXTERNAL, false, new OverriderSpecifier_Dev(), true, '2');
        const expectRes = 'uint256 external immutable = 2;';
        expect(state.toString()).toBe(expectRes);

    })
    test("Seconde test for toString() function", () => {
        const state = new State_Dev('name', 'uint256', undefined, true, new OverriderSpecifier_Dev(), true, '2');
        const expectRes = 'uint256 internal immutable constant = 2;';
        expect(state.toString()).toBe(expectRes);
    })

}
)