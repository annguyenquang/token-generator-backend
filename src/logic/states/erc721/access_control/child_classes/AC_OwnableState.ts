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

class AC_OwnableState extends AccessControlState {
    constructor(mapper: ERC721Mapper) {
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
        if (this._mapper._isPausable === isPausable) {
            return;
        }
        const ERC721PausableImport = '@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol';
        const initialOwnerParam = new ParameterBuilder()
            .setName('initialOwner')
            .setType('address')
            .setDataLocation(DataLocation_Dev.NONE)
            .build();

        if (isPausable) {
            //ADD CONSTRUCTOR PARAM
            if (!this._mapper.contract.contractBody._contractConstructor._parameterList.find((p) => p._name === 'initialOwner')) {
                this._mapper.contract.contractBody._contractConstructor._parameterList.push(initialOwnerParam);
            }
            //ADD IMPORTS
            if (!this._mapper.contract.importList.includes(ERC721PausableImport)) {
                this._mapper.contract.importList.push(ERC721PausableImport);
            }
            // ADD CONTRACT INHERITANCE
            if (!this._mapper.contract.inheritances.includes('ERC721Pausable')) {
                this._mapper.contract.inheritances.push('ERC721Pausable');
            }
            if (!this._mapper.contract.inheritances.includes('Ownable')) {
                this._mapper.contract.inheritances.push('Ownable');
            }
            // ADD CONSTRUCTOR CONTRACT MODIFIER CALL
            const constructorModifierCall = this._mapper.contract.contractBody._contractConstructor._modifierCallList;
            if (!constructorModifierCall.find((item) => item._name === 'Ownable')) {
                constructorModifierCall.push(new ModifierCall_Dev({ name: 'Ownable', args: ["initialOwner"] }));
            }
            // ADD CONTRACT FUNCTIONS
            // add pause()
            {
                const pauseFunction: Function_Dev = new FunctionBuilder()
                    .setName('pause')
                    .setVisibility(Visibility_Dev.PUBLIC)
                    .setModifierCallList([new ModifierCall_Dev({ name: 'onlyOwner' })])
                    .setFunctionBody(['_pause();']).build();
                this._mapper.contract.contractBody._functionList.push(pauseFunction);
            }
            // add unpause()
            {
                const unpauseFunction: Function_Dev = new FunctionBuilder()
                    .setName('unpause')
                    .setVisibility(Visibility_Dev.PUBLIC)
                    .setModifierCallList([new ModifierCall_Dev({ name: 'onlyOwner' })])
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
        } else {
            //REMOVE IMPORTS
            const indexERC721PausableImp = this._mapper.contract.importList.indexOf(ERC721PausableImport);
            if (indexERC721PausableImp > -1) {
                this._mapper.contract.importList.splice(indexERC721PausableImp, 1);
            }
            // REMOVE CONTRACT INHERITANCE
            const indexERC721Pausable = this._mapper.contract.inheritances.indexOf('ERC721Pausable');
            if (indexERC721Pausable > -1) {
                this._mapper.contract.inheritances.splice(indexERC721Pausable, 1);
            }
            const indexOwnable = this._mapper.contract.inheritances.indexOf('Ownable');
            if (indexOwnable > -1) {
                this._mapper.contract.inheritances.splice(indexOwnable, 1);
            }
            // REMOVE CONTRACT FUNCTIONS
            const contractBody = this._mapper.contract.contractBody;
            if (contractBody && contractBody._functionList) {

                const pauseFunctionIndex = contractBody._functionList.findIndex((item) => item._name === 'pause');
                if (pauseFunctionIndex > -1) {
                    contractBody._functionList.splice(pauseFunctionIndex, 1);
                }
                const unpauseFunctionIndex = contractBody._functionList.findIndex((item) => item._name === 'unpause');
                if (unpauseFunctionIndex > -1) {
                    contractBody?._functionList.splice(unpauseFunctionIndex, 1);
                }
                const updateFunctionIndex = contractBody._functionList.findIndex((item) => item._name === '_update');
                if (updateFunctionIndex > -1) {
                    contractBody._functionList.splice(updateFunctionIndex, 1);
                }
            }
        }

        this._mapper._isPausable = isPausable;
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
                // ADD safeMint FUNCTION
                {
                    // Set mint function modifier list
                    const modifierList: ModifierCall_Dev[] = [new ModifierCall_Dev({ name: 'onlyOwner' })];
                    const funcName = 'safeMint';
                    const safeMintFunction: Function_Dev = new FunctionBuilder()
                        .setName(funcName)
                        .setParameterList([new Parameter('address', 'to'), new Parameter('uint256', 'tokenId')])
                        .setVisibility(Visibility_Dev.PUBLIC)
                        .setModifierCallList(modifierList)
                        .setFunctionBody([`_safeMint(to, tokenId);`])
                        .build();
                    functionList.push(safeMintFunction);
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
export default AC_OwnableState;