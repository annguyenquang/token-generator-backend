import { FunctionBuilder, Function_Dev } from "../../../classes/Function_Dev";
import ModifierCall_Dev from "../../../classes/ModifierCall_Dev";
import { Parameter, ParameterBuilder } from "../../../classes/Parameter";
import State_Dev from "../../../classes/State_Dev";
import AccessControl_Dev from "../../../enums/AccessControl_Dev";
import DataLocation_Dev from "../../../enums/DataLocation_Dev";
import Visibility_Dev from "../../../enums/Visibility_Dev";
import AccessControlState from "../AccessControlState";
import ERC20Mapper from "../../../mappers/ERC20Mapper";

const TOKEN_TYPE = "ERC20";

class RolesState extends AccessControlState {
    constructor(mapper: ERC20Mapper) {
        super(mapper);
        this._mapper._accessControl = AccessControl_Dev.ROLES;
        const handleCaseRoles = () => {
            //ADD CONSTRUCTOR PARAM
            const defaultAdminParamName = 'defaultAdmin';
            const defaultAdminParam = new ParameterBuilder()
                .setName(defaultAdminParamName)
                .setType('address')
                .setDataLocation(DataLocation_Dev.NONE)
                .build();
            if (!this._mapper.contract.contractBody._contractConstructor._parameterList.find((p) => p._name === defaultAdminParamName)) {
                this._mapper.contract.contractBody._contractConstructor._parameterList.push(defaultAdminParam);
            }
            //ADD IMPORTS
            const accessControlImport = '@openzeppelin/contracts/access/AccessControl.sol';
            if (!this._mapper.contract.importList.includes(accessControlImport)) {
                this._mapper.contract.importList.push(accessControlImport);
            }
            //ADD INHERITANCE
            const accessControlInheritance = 'AccessControl';
            if (!this._mapper.contract.inheritances.includes(accessControlInheritance)) {
                this._mapper.contract.inheritances.push(accessControlInheritance);
            }
            //ADD FUNCTION BODY
            const functionString = "_grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);";
            const idx = this._mapper.contract.contractBody._contractConstructor._functionBody.indexOf(functionString);
            if (idx === -1) {
                let constructorFunctionBody = this._mapper.contract.contractBody._contractConstructor._functionBody;
                this._mapper.contract.contractBody._contractConstructor._functionBody =
                    constructorFunctionBody.concat(functionString);
            }
        }
        handleCaseRoles();
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
        if (isMintable === this._mapper._isMintable) {
            return;
        } else {
            const functionList = this._mapper.contract.contractBody._functionList;
            if (isMintable) {

                // ADD MINT FUNCTION
                // ADD MINTER_ROLE CONSTANCE
                const stateName = "MINTER_ROLE";
                const idx = this._mapper.contract.contractBody._stateList.findIndex((item) => (item._name === stateName));
                if (idx === - 1) {
                    const state: State_Dev = new State_Dev("MINTER_ROLE", "bytes32", Visibility_Dev.PUBLIC, true, undefined, undefined, "keccak256(\"MINTER_ROLE\")");
                    this._mapper.contract.contractBody._stateList.push(state);
                }
                //ADD CONSTRUCTOR FUNCTION BODY 
                const fnString = "_grantRole(MINTER_ROLE, minter);";
                if (!this._mapper.contract.contractBody._contractConstructor._functionBody.includes(fnString)) {
                    this._mapper.contract.contractBody._contractConstructor._functionBody.push(fnString);
                }

                const modifierList = [new ModifierCall_Dev({ name: 'onlyRole', args: ['MINTER_ROLE'] })]
                const mintFunction: Function_Dev = new FunctionBuilder()
                    .setName('mint')
                    .setParameterList([new Parameter('address', 'to', DataLocation_Dev.NONE), new Parameter('uint256', 'amount', DataLocation_Dev.NONE)])
                    .setVisibility(Visibility_Dev.PUBLIC)
                    .setModifierCallList(modifierList)
                    .setFunctionBody(['_mint(to, amount);'])
                    .build();
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
export default RolesState;