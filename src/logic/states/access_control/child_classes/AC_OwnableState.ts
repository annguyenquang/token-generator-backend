import { FunctionBuilder, Function_Dev } from "../../../classes/Function_Dev";
import ModifierCall_Dev from "../../../classes/ModifierCall_Dev";
import { Parameter, ParameterBuilder } from "../../../classes/Parameter";
import State_Dev from "../../../classes/State_Dev";
import AccessControl_Dev from "../../../enums/AccessControl_Dev";
import DataLocation_Dev from "../../../enums/DataLocation_Dev";
import Visibility_Dev from "../../../enums/Visibility_Dev";
import Vote_Dev from "../../../enums/Vote_Dev";
import AccessControlState from "../AccessControlState";
import ERC20Mapper from "../../../mappers/ERC20Mapper";

const TOKEN_TYPE = "ERC20";

class AC_OwnableState extends AccessControlState {
    constructor(mapper: ERC20Mapper) {
        super(mapper);
        this._mapper._accessControl = AccessControl_Dev.OWNABLE;
        const handleCaseOwnable = () => {
            //ADD CONSTRUCTOR PARAM
            const initialOwnerParamName = 'initialOwner';
            const initialOwnerParam = new ParameterBuilder()
                .setName(initialOwnerParamName)
                .setType('address')
                .setDataLocation(DataLocation_Dev.NONE)
                .build();
            if (!this._mapper.contract.contractBody._contractConstructor._parameterList.find((p) => p._name === initialOwnerParamName)) {
                this._mapper.contract.contractBody._contractConstructor._parameterList.push(initialOwnerParam);
            }
            //ADD IMPORTS
            const OwnableImport = '@openzeppelin/contracts/access/Ownable.sol';
            if (!this._mapper.contract.importList.includes(OwnableImport)) {
                this._mapper.contract.importList.push(OwnableImport);
            }
            //ADD INHERITANCE
            const OwnableInheritance = 'Ownable';
            if (!this._mapper.contract.inheritances.includes(OwnableInheritance)) {
                this._mapper.contract.inheritances.push(OwnableInheritance);
            }
            //ADD CONSTRUCTOR MODIFIER CALL
            const modifierName = "Ownable";
            const modifierArgs = ["initialOwner"];
            const constructorModifierCall = this._mapper.contract.contractBody._contractConstructor._modifierCallList;
            if (!constructorModifierCall.find((item) => item._name === 'Ownable')) {
                constructorModifierCall.push(new ModifierCall_Dev({ name: modifierName, args: modifierArgs }));
            }
        }
        handleCaseOwnable();
    }
    override setName(name: String) {
        super.setName(name);
    }
    override setLicense(license: String) {

    }
    override setSymbol(symbol: String) {
        super.setSymbol(symbol);
    };
    setPremint = (amount: number) => {
        super.setPremint(amount);
    };
    setIsPermit = (isPermit: boolean) => {
        super.setIsPermit(isPermit);
    };
    setIsBurnable = (isBurnable: boolean) => {
        super.setIsBurnable(isBurnable);
    };
    setIsPausable = (isPausable: boolean) => {
    };
    setIsFlashMintable = (isFlashMint: boolean) => {
        super.setIsFlashMintable(isFlashMint);
    };
    setIsMintable = (isMintable: boolean) => {
        console.log("isMintable(at AC_OwnableState):", isMintable);
        if (isMintable === this._mapper._isMintable) {
            return;
        } else {
            const functionList = this._mapper.contract.contractBody._functionList;
            if (isMintable) {
                // ADD MINT FUNCTION
                //  set mint function modifier list
                let modifierList: ModifierCall_Dev[] = [new ModifierCall_Dev({ name: 'onlyOwner' })];
                // console.log("Modifier call LIST", modifierList);

                const mintFunction: Function_Dev = new FunctionBuilder()
                    .setName('mint')
                    .setParameterList([new Parameter('address', 'to', DataLocation_Dev.NONE), new Parameter('uint256', 'amount', DataLocation_Dev.NONE)])
                    .setVisibility(Visibility_Dev.PUBLIC)
                    .setModifierCallList(modifierList)
                    .setFunctionBody(['_mint(to, amount);'])
                    .build();
                console.log("MINT FUNCTION::", mintFunction);
                functionList.push(mintFunction);
                // this._mapper.contract.contractBody._functionList = functionList;
            } else {
                // REMOVE MINT FUNCTION IF EXIST
                if (functionList.find((item) => item._name === 'mint')) {
                    functionList.splice(functionList.findIndex((item) => item._name === 'mint'), 1);
                }
            }
        }
        this._mapper._isMintable = isMintable;

    };

}
export default AC_OwnableState;