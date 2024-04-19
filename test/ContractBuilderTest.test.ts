import { Contract_DevBuilder } from '../src/logic/classes/Contract_Dev';
describe(

    'ContractBuilderTest',
    () => {
        test('first builder',
            () => {
                const expectRes: String[] = ["fisrt import"];
                const contractBuilder = new Contract_DevBuilder();
                contractBuilder.setImports(["fisrt import"]);
                expect(contractBuilder.build().importList).toStrictEqual(expectRes);
            }
        )
        test('second builder',
            () => {
                const expectRes: String[] = ["fisrt import", "second import"];
                const contractBuilder = new Contract_DevBuilder();
                contractBuilder.setImports(["fisrt import", "second import"]);
                expect(contractBuilder.build().importList).toStrictEqual(expectRes);
            }
        )
        test('third builder',

            () => {
                const expectRes: String[] = ["fisrt import"];
                const contractBuilder = new Contract_DevBuilder();
                contractBuilder.setImports(["fisrt import"]);
                expect(contractBuilder.build().importList).toStrictEqual(expectRes);
            })
    }
)