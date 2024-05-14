import { FunctionBuilder, Function_Dev } from "../../../../classes/Function_Dev";
import ModifierCall_Dev from "../../../../classes/ModifierCall_Dev";
import OverriderSpecifier_Dev from "../../../../classes/OverriderSpecifier_Dev";
import { Parameter, ParameterBuilder } from "../../../../classes/Parameter";
import State_Dev from "../../../../classes/State_Dev";
import AccessControl_Dev from "../../../../enums/AccessControl_Dev";
import DataLocation_Dev from "../../../../enums/DataLocation_Dev";
import StateMutability from "../../../../enums/StateMutability_Dev";
import Visibility_Dev from "../../../../enums/Visibility_Dev";
import ERC721Mapper from "../../../../mappers/ERC721Mapper";
import AccessControlState from "../AccessControlState";


class RolesState extends AccessControlState {
    constructor(mapper: ERC721Mapper) {
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
            // ADD FUNCTIONS
            {
                const funcName: String = "supportsInterface";
                const idx = this._mapper.contract.contractBody._functionList.findIndex((item) => item._name === funcName);
                if (idx > -1) {
                    this._mapper.contract.contractBody._functionList[idx]._overrideSpecifier?._identifierPath.push("AccessControl");
                } else {
                    const supportsInterfaceFunction: Function_Dev = new FunctionBuilder()
                        .setName(funcName)
                        .setParameterList([new Parameter('bytes4', 'interfaceId', DataLocation_Dev.NONE)])
                        .setVisibility(Visibility_Dev.PUBLIC)
                        .setStateMutability(StateMutability.VIEW)
                        .setOverrideSpecifier(new OverriderSpecifier_Dev(["ERC721", "AccessControl"]))
                        .setFunctionBody(['return super.supportsInterface(interfaceId);'])
                        .setReturns([new ParameterBuilder().setType("bool").build()])
                        .build();
                    this._mapper.contract.contractBody._functionList.push(supportsInterfaceFunction);
                }
            }
        }
        handleCaseRoles();
    }
    // override setName(name: String) {
    //     super.setName(name);
    // }
    // override setLicense(license: String) {

    // }
    // override setSymbol(symbol: String) {
    //     super.setSymbol(symbol);
    // };
    // setPremint = (amount: number) => {
    //     super.setPremint(amount);
    // };
    // setIsPermit = (isPermit: boolean) => {
    //     super.setIsPermit(isPermit);
    // };
    // setIsBurnable = (isBurnable: boolean) => {
    //     super.setIsBurnable(isBurnable);
    // };
    setIsPausable = (isPausable: boolean) => {
        // ADD IMPORT
        const pausableImport = '@openzeppelin/contracts/token/ERC721/extensions/Pausable.sol';
        if (!this._mapper.contract.importList.includes(pausableImport)) {
            this._mapper.contract.importList.push(pausableImport);
        }
        // ADD INHERITANCE
        const pausableInheritance = 'ERC721Pausable';
        if (!this._mapper.contract.inheritances.includes(pausableInheritance)) {
            this._mapper.contract.inheritances.push(pausableInheritance);
        }
        // ADD PAUSER_ROLE STATE
        const stateName = "PAUSER_ROLE";
        const stateValue = `keccak256("PAUSER_ROLE")`;
        const state = new State_Dev(stateName, "bytes32", Visibility_Dev.PUBLIC, true, undefined, undefined, stateValue);
        if (!this._mapper.contract.contractBody._stateList.find((item) => item._name === stateName)) {
            this._mapper.contract.contractBody._stateList.push(state);
        }
        //ADD CONSTRUCTOR PARAM
        const pauserParamName = 'pauser';
        const paramType = 'address';
        const pauserParam = new ParameterBuilder()
            .setName(pauserParamName)
            .setType(paramType)
            .setDataLocation(DataLocation_Dev.NONE)
            .build();
        if (!this._mapper.contract.contractBody._contractConstructor._parameterList.find((p) => p._name === pauserParamName)) {
            this._mapper.contract.contractBody._contractConstructor._parameterList.push(pauserParam);
        }

        //ADD FUNCTION BODY
        const functionString = `_grandRole(${stateName}, ${pauserParamName})`;
        if (!this._mapper.contract.contractBody._contractConstructor._functionBody.includes(functionString)) {
            this._mapper.contract.contractBody._contractConstructor._functionBody.push(functionString);
        }

        // add pause()
        {
            const pauseFunction: Function_Dev = new FunctionBuilder()
                .setName('pause')
                .setVisibility(Visibility_Dev.PUBLIC)
                .setModifierCallList([new ModifierCall_Dev({ name: 'onlyRole', args: ['PAUSER_ROLE'] })])
                .setFunctionBody(['_pause();']).build();
            this._mapper.contract.contractBody._functionList.push(pauseFunction);
        }
        // add unpause()
        {
            const unpauseFunction: Function_Dev = new FunctionBuilder()
                .setName('unpause')
                .setVisibility(Visibility_Dev.PUBLIC)
                .setModifierCallList([new ModifierCall_Dev({ name: 'onlyRole', args: ['PAUSER_ROLE'] })])
                .setFunctionBody(['_unpause();']).build();
            this._mapper.contract.contractBody._functionList.push(unpauseFunction);
        }
        // add _update()
        {
            const fName = "_update";
            const idx = this._mapper.contract.contractBody._functionList.findIndex((item) => item._name === fName);
            if (idx === -1) {
                const updateFunction: Function_Dev = new FunctionBuilder()
                    .setName(fName)
                    .setVisibility(Visibility_Dev.INTERNAL)
                    .setParameterList([
                        new Parameter('address', 'from', DataLocation_Dev.NONE),
                        new Parameter('address', 'to', DataLocation_Dev.NONE),
                        new Parameter('uint256', 'value', DataLocation_Dev.NONE)
                    ])
                    .setOverrideSpecifier(new OverriderSpecifier_Dev(["ERC721", "ERC721Pausable"]))
                    .setFunctionBody(['super._update(from, to, value);'])
                    .build();
                this._mapper.contract.contractBody._functionList.push(updateFunction);
            } else {
                this._mapper.contract.contractBody._functionList[idx]._overrideSpecifier?._identifierPath.push("ERCPausable");
            }
        }
    };
    // setIsFlashMintable = (isFlashMint: boolean) => {
    //     super.setIsFlashMintable(isFlashMint);
    // };
    setIsMintable = (isMintable: boolean) => {
        if (isMintable === this._mapper._isMintable) {
            return;
        } else {
            const functionList = this._mapper.contract.contractBody._functionList;
            if (isMintable) {

                // ADD MINTER_ROLE CONSTANT
                {

                    const stateName = "MINTER_ROLE";
                    const idx = this._mapper.contract.contractBody._stateList.findIndex((item) => (item._name === stateName));
                    if (idx === - 1) {
                        const state: State_Dev = new State_Dev("MINTER_ROLE", "bytes32", Visibility_Dev.PUBLIC, true, undefined, undefined, "keccak256(\"MINTER_ROLE\")");
                        this._mapper.contract.contractBody._stateList.push(state);
                    }
                }
                //ADD CONSTRUCTOR FUNCTION BODY 
                {
                    const fnString = "_grantRole(MINTER_ROLE, minter);";
                    if (!this._mapper.contract.contractBody._contractConstructor._functionBody.includes(fnString)) {
                        this._mapper.contract.contractBody._contractConstructor._functionBody.push(fnString);
                    }
                }
                // ADD MINTER PARAM TO CONSTRUCTOR
                {
                    const minterParamName = 'minter';
                    const paramType = 'address';
                    const minterParam = new ParameterBuilder()
                        .setName(minterParamName)
                        .setType(paramType)
                        .setDataLocation(DataLocation_Dev.NONE)
                        .build();
                    this._mapper.contract.contractBody._contractConstructor._parameterList.push(minterParam);
                }
                // ADD MINT FUNCTION
                {
                    const modifierList: ModifierCall_Dev[] = [new ModifierCall_Dev({ name: 'onlyRole', args: ['MINTER_ROLE'] })]
                    const funcName: String = 'safeMint';
                    const mintFunction: Function_Dev = new FunctionBuilder()
                        .setName(funcName)
                        .setParameterList([new Parameter('address', 'to', DataLocation_Dev.NONE), new Parameter('uint256', 'tokenId', DataLocation_Dev.NONE)])
                        .setVisibility(Visibility_Dev.PUBLIC)
                        .setModifierCallList(modifierList)
                        .setFunctionBody(['_safeMint(to, tokenId);'])
                        .build();
                    functionList.push(mintFunction);
                }
            } else {
                // REMOVE MINT FUNCTION IF EXIST
                if (functionList.find((item) => item._name === 'safeMint')) {
                    functionList.splice(functionList.findIndex((item) => item._name === 'safeMint'), 1);
                }
            }
        }
        this._mapper._isMintable = isMintable;

    };

}
export default RolesState;