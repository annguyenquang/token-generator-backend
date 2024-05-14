import { FunctionBuilder, Function_Dev } from "../../../../classes/Function_Dev";
import ModifierCall_Dev from "../../../../classes/ModifierCall_Dev";
import OverriderSpecifier_Dev from "../../../../classes/OverriderSpecifier_Dev";
import { Parameter, ParameterBuilder } from "../../../../classes/Parameter";
import AccessControl_Dev from "../../../../enums/AccessControl_Dev";
import DataLocation_Dev from "../../../../enums/DataLocation_Dev";
import Visibility_Dev from "../../../../enums/Visibility_Dev";
import ERC721Mapper from "../../../../mappers/ERC721Mapper";
import AccessControlState from "../AccessControlState";

const TOKEN_TYPE = "ERC721";

class AC_ManagedState extends AccessControlState {
    constructor(mapper: ERC721Mapper) {
        super(mapper);
        this._mapper._accessControl = AccessControl_Dev.MANAGED;
        const handleCaseManaged = () => {
            //ADD CONSTRUCTOR PARAM
            const initialAuthorityParamName = 'initialAuthority';
            const initialAuthorityParam = new ParameterBuilder()
                .setName(initialAuthorityParamName)
                .setType('address')
                .setDataLocation(DataLocation_Dev.NONE)
                .build();
            if (!this._mapper.contract.contractBody._contractConstructor._parameterList.find((p) => p._name === initialAuthorityParamName)) {
                this._mapper.contract.contractBody._contractConstructor._parameterList.push(initialAuthorityParam);
            }
            //ADD IMPORTS
            const AccessManagedImport = '@openzeppelin/contracts/access/manager/AccessManaged.sol';
            if (!this._mapper.contract.importList.includes(AccessManagedImport)) {
                this._mapper.contract.importList.push(AccessManagedImport);
            }
            //ADD INHERITANCE
            const AccessManagerInheritance = 'AccessManaged';
            if (!this._mapper.contract.inheritances.includes(AccessManagerInheritance)) {
                this._mapper.contract.inheritances.push(AccessManagerInheritance);
            }
            //ADD CONSTRUCTOR MODIFIER CALL
            const modifierName = "AccessManaged";
            const modifierArgs = [initialAuthorityParamName];
            const constructorModifierCall = this._mapper.contract.contractBody._contractConstructor._modifierCallList;
            if (!constructorModifierCall.find((item) => item._name === modifierName)) {
                constructorModifierCall.push(new ModifierCall_Dev({ name: modifierName, args: modifierArgs }));
            }
        }
        handleCaseManaged();
    }
    // override setName(name: String) {
    //     super.setName(name);
    // }
    // override setLicense(license: String) {
    //     super.setLicense(license);
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

        // add pause()
        {
            const pauseFunction: Function_Dev = new FunctionBuilder()
                .setName('pause')
                .setVisibility(Visibility_Dev.PUBLIC)
                .setExtraKeyWord(['restricted'])
                .setFunctionBody(['_pause();']).build();
            this._mapper.contract.contractBody._functionList.push(pauseFunction);
        }
        // add unpause()
        {
            const unpauseFunction: Function_Dev = new FunctionBuilder()
                .setName('unpause')
                .setVisibility(Visibility_Dev.PUBLIC)
                .setExtraKeyWord(['restricted'])
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
                        new Parameter('address', 'to', DataLocation_Dev.NONE),
                        new Parameter('uint256', 'tokenId', DataLocation_Dev.NONE),
                        new Parameter('address', 'auth', DataLocation_Dev.NONE),
                    ])
                    .setOverrideSpecifier(new OverriderSpecifier_Dev([TOKEN_TYPE, `${TOKEN_TYPE}Pausable`]))
                    .setReturns([new ParameterBuilder().setType('address').build()])
                    .setFunctionBody(['super._update(to, tokenId, auth);'])
                    .build();
                this._mapper.contract.contractBody._functionList.push(updateFunction);
            } else {
                this._mapper.contract.contractBody._functionList[idx]._overrideSpecifier?._identifierPath.push("ERCPausable");
            }
        }
    };

    setIsMintable = (isMintable: boolean) => {
        if (isMintable === this._mapper._isMintable) {
            return;
        } else {
            const functionList = this._mapper.contract.contractBody._functionList;
            if (isMintable) {
                if (this._mapper._accessControl === AccessControl_Dev.NONE) {
                    console.log("Access control have to be set before mintable")
                    return;
                }

                // ADD MINT FUNCTION
                {
                    //  set mint function modifier list
                    const modifierList: ModifierCall_Dev[] = [new ModifierCall_Dev({ name: 'restricted' })]
                    const funcName: String = 'safeMint';
                    const mintFunction: Function_Dev = new FunctionBuilder()
                        .setName(funcName)
                        .setParameterList([new Parameter('address', 'to'), new Parameter('uint256', 'tokenId')])
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
export default AC_ManagedState;