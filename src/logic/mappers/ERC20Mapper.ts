import { Contract_Dev, Contract_DevBuilder } from "../classes/Contract_Dev";
import AccessControl_Dev from "../enums/AccessControl_Dev";
import Vote_Dev from "../enums/Vote_Dev";
import Upgradeability_Dev from "../enums/Upgradeability_Dev";
import ContractBody_Dev from "../classes/ContractBody_Dev";
import ModifierCall_Dev from "../classes/ModifierCall_Dev";
import Constructor_Dev from "../classes/Constructor_Dev";
import { FunctionBuilder, Function_Dev } from "../classes/Function_Dev";
import Visibility_Dev from "../enums/Visibility_Dev";
import OverriderSpecifier_Dev from "../classes/OverriderSpecifier_Dev";
import DataLocation_Dev from "../enums/DataLocation_Dev";
import { Parameter, ParameterBuilder } from "../classes/Parameter";
import ContractMapper from "../interfaces/ContractMapper";
import StateMutability from "../enums/StateMutability_Dev";
import AccessControlState from "../states/access_control/AccessControlState";
import AC_NoneState from "../states/access_control/child_classes/AC_NoneState";
import AC_OwnableState from "../states/access_control/child_classes/AC_OwnableState";
import AC_RolesState from "../states/access_control/child_classes/AC_RolesState";
import AC_ManagedState from "../states/access_control/child_classes/AC_ManagedState";

type TokenInformation = {
    securityContact?: String;
    license?: String;
}
const INIT_IMPORTS = ['@openzeppelin/contracts/token/ERC20/ERC20.sol'];
const TOKEN_TYPE = "ERC20";
class ERC20Mapper implements ContractMapper {

    public contract: Contract_Dev;

    _name: String = "";
    _symbol: String = "";
    _premint: number = 0;
    _isMintable: boolean = false;
    _isBurnable: boolean = false;
    _isPausable: boolean = false;
    _isPermint: boolean = false;
    _isFlashMint: boolean = false;
    _vote: Vote_Dev = Vote_Dev.NONE;
    _accessControl: AccessControl_Dev = AccessControl_Dev.NONE;
    _upgradeability: Upgradeability_Dev = Upgradeability_Dev.NONE;
    _tokenInformation: TokenInformation = {
        securityContact: "",
        license: "MIT"
    };
    _accessControlState: AccessControlState = new AC_NoneState(this);
    constructor() {
        this.contract = new Contract_DevBuilder()
            .setInheritances([TOKEN_TYPE])
            .setVersion('^0.8.20')
            .setName("")
            .setContractBody(new ContractBody_Dev({
                contractConstructor: new Constructor_Dev({
                    functionBody: [],
                    modifierCallList: [new ModifierCall_Dev({
                        name: TOKEN_TYPE,
                        args: [`""`, `""`]
                    })]
                })
            }))
            .setImports(INIT_IMPORTS).build();

    }

    getContract = (): Contract_Dev => {
        return this.contract;
    }

    setName(name: String) {
        this._accessControlState.setName(name);
    }

    setLicense = (license: String) => {
        this._accessControlState.setLicense(license);
        // this._tokenInformation.license = license;
        // this.contract.license = license;
    }

    setSymbol = (symbol: String) => {
        this._accessControlState.setSymbol(symbol);
        // if (symbol === "") {
        //     return;
        // }
        // const currentERC20ModifierCall: ModifierCall_Dev | undefined = this.contract
        //     .contractBody
        //     ?._contractConstructor
        //     ._modifierCallList.find((item) =>
        //         item._name === TOKEN_TYPE)
        // if (currentERC20ModifierCall === undefined) {
        //     throw new Error("The ERC20 modifier call is not found");
        // }

        // const ERC20ModifierCall = new ModifierCall_Dev({ name: TOKEN_TYPE, args: [currentERC20ModifierCall._args[0], `"${symbol}"`] })
        // const newModifierCallList: ModifierCall_Dev[] = [ERC20ModifierCall, ...this.contract.contractBody?._contractConstructor._modifierCallList.slice(1) ?? []]
        // if (this.contract.contractBody?._contractConstructor) {
        //     this.contract.contractBody._contractConstructor._modifierCallList = newModifierCallList;
        // }
        // this._symbol = symbol;
    }

    setPremint = (amount: number) => {
        this._accessControlState.setPremint(amount);
        // if (amount <= 0) {
        //     return;
        // }
        // const permitCommand = `_mint(msg.sender, ${amount} * 10 ** decimals());`;
        // if (this.contract.contractBody?._contractConstructor) {
        //     if (this.contract.contractBody._contractConstructor._functionBody.length === 0) {
        //         this.contract.contractBody._contractConstructor._functionBody.push(permitCommand);
        //     } else {
        //         this.contract.contractBody._contractConstructor._functionBody.push(`\n${permitCommand}`);
        //     }
        // }
        // this._premint = amount;
    }

    setIsPermit = (isPermit: boolean) => {
        this._accessControlState.setIsPermit(isPermit);
        // if (this._isPermint && isPermit) {
        //     return;
        // } else {
        //     const permitInheritance = 'ERC20Permit';
        //     const permitImport = '@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol';
        //     const importList = this.contract.importList;
        //     if (isPermit) {
        //         // ADD INHERITANCE
        //         if (!this.contract.inheritances.includes(permitInheritance)) {
        //             this.contract.inheritances.push(permitInheritance);
        //         }
        //         // ADD IMPORT
        //         if (!importList.includes(permitImport)) {
        //             importList.push(permitImport);
        //         }
        //         // ADD CONSTRUCTOR MODIFIER CALL
        //         const constructorModifierCall: ModifierCall_Dev = new ModifierCall_Dev({ name: 'ERC20Permit', args: [`"${this.contract.name}"`] });
        //         if (!this.contract.contractBody._contractConstructor._modifierCallList.find((item) => item._name === 'ERC20Permit')) {
        //             this.contract.contractBody._contractConstructor._modifierCallList.push(constructorModifierCall);
        //         }
        //     } else {
        //         const idx = importList.findIndex((imp) => imp === permitImport);
        //         if (idx > -1) {
        //             importList.splice(idx, 1);
        //         }
        //     }
        // }
        // this._isPermint = isPermit;
    }

    setIsBurnable = (isBurnable: boolean) => {
        this._accessControlState.setIsBurnable(isBurnable);
        // const importList = this.contract.importList;
        // const burnableImport = '@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol';
        // const burnableInheritance = "ERC20Burnable";
        // if (this._isBurnable && isBurnable) {
        //     console.log("BURNABLE IS ALREADY ENABLED");
        //     return;
        // } else {
        //     if (isBurnable) {
        //         // ADD INHERITANCE
        //         if (!this.contract.inheritances.includes(burnableInheritance)) {
        //             this.contract.inheritances.push(burnableInheritance);
        //         }
        //         // ADD IMPORT
        //         if (!importList.includes(burnableImport)) {
        //             importList.push(burnableImport);
        //             console.log("PUSHED BURNABLE IMPORT");
        //         }
        //     } else {
        //         const index = importList.indexOf(burnableImport);
        //         if (index > -1) { importList.splice(index, 1); }
        //     }
        //     console.log("PERMIT IS ALREADY ENABLED");
        // }
        // this._isBurnable = isBurnable;
    }

    setIsPausable = (isPausable: boolean) => {
        const ERC20PausableImport = '@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol';
        const OwnableImport = '@openzeppelin/contracts/access/Ownable.sol';
        const initialOwnerParam = new ParameterBuilder()
            .setName('initialOwner')
            .setType('address')
            .setDataLocation(DataLocation_Dev.NONE)
            .build();
        if (this._isPausable && isPausable) {
            return;
        } else {
            if (isPausable) {
                //ADD CONSTRUCTOR PARAM
                if (!this.contract.contractBody._contractConstructor._parameterList.find((p) => p._name === 'initialOwner')) {
                    this.contract.contractBody._contractConstructor._parameterList.push(initialOwnerParam);
                }
                //ADD IMPORTS
                if (!this.contract.importList.includes(ERC20PausableImport)) {
                    this.contract.importList.push(ERC20PausableImport);
                }
                if (!this.contract.importList.includes(OwnableImport)) {
                    this.contract.importList.push(OwnableImport);
                }
                // ADD CONTRACT INHERITANCE
                if (!this.contract.inheritances.includes('ERC20Pausable')) {
                    this.contract.inheritances.push('ERC20Pausable');
                }
                if (!this.contract.inheritances.includes('Ownable')) {
                    this.contract.inheritances.push('Ownable');
                }
                // ADD CONSTRUCTOR CONTRACT MODIFIER CALL
                const constructorModifierCall = this.contract.contractBody._contractConstructor._modifierCallList;
                if (!constructorModifierCall.find((item) => item._name === 'Ownable')) {
                    constructorModifierCall.push(new ModifierCall_Dev({ name: 'Ownable', args: ["initialOwner"] }));
                }
                // ADD CONTRACT FUNCTIONS
                // add pause()
                const pauseFunction: Function_Dev = new FunctionBuilder()
                    .setName('pause')
                    .setVisibility(Visibility_Dev.PUBLIC)
                    .setModifierCallList([new ModifierCall_Dev({ name: 'onlyOwner' })])
                    .setFunctionBody(['_pause();']).build();
                this.contract.contractBody._functionList.push(pauseFunction);
                // add unpause()
                const unpauseFunction: Function_Dev = new FunctionBuilder()
                    .setName('unpause')
                    .setVisibility(Visibility_Dev.PUBLIC)
                    .setModifierCallList([new ModifierCall_Dev({ name: 'onlyOwner' })])
                    .setFunctionBody(['_unpause();']).build();
                this.contract.contractBody._functionList.push(unpauseFunction);
                // add _update()
                {
                    const fName = "_update";
                    const idx = this.contract.contractBody._functionList.findIndex((item) => item._name === fName);
                    if (idx === -1) {
                        const updateFunction: Function_Dev = new FunctionBuilder()
                            .setName(fName)
                            .setVisibility(Visibility_Dev.INTERNAL)
                            .setParameterList([
                                new Parameter('address', 'from', DataLocation_Dev.NONE),
                                new Parameter('address', 'to', DataLocation_Dev.NONE),
                                new Parameter('uint256', 'value', DataLocation_Dev.NONE)
                            ])
                            .setOverrideSpecifier(new OverriderSpecifier_Dev([TOKEN_TYPE, `${TOKEN_TYPE}Pausable`]))
                            .setFunctionBody(['super._update(from, to, value);'])
                            .build();
                        this.contract.contractBody._functionList.push(updateFunction);
                    } else {
                        this.contract.contractBody._functionList[idx]._overrideSpecifier?._identifierPath.push("ERCPausable");
                    }
                }
            } else {
                //REMOVE IMPORTS
                const indexERC20PausableImp = this.contract.importList.indexOf(ERC20PausableImport);
                if (indexERC20PausableImp > -1) {
                    this.contract.importList.splice(indexERC20PausableImp, 1);
                }
                const indexOwnableImp = this.contract.importList.indexOf(OwnableImport);
                if (indexOwnableImp > -1) {
                    this.contract.importList.splice(indexOwnableImp, 1);
                }
                // REMOVE CONTRACT INHERITANCE
                const indexERC20Pausable = this.contract.inheritances.indexOf('ERC20Pausable');
                if (indexERC20Pausable > -1) {
                    this.contract.inheritances.splice(indexERC20Pausable, 1);
                }
                const indexOwnable = this.contract.inheritances.indexOf('Ownable');
                if (indexOwnable > -1) {
                    this.contract.inheritances.splice(indexOwnable, 1);
                }
                // REMOVE CONTRACT FUNCTIONS
                const contractBody = this.contract.contractBody;
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
        }
        this._isPausable = isPausable;
    }

    setIsFlashMintable = (isFlashMint: boolean) => {
        this._accessControlState.setIsFlashMintable(isFlashMint);
        // console.log("isFlashMint: ", isFlashMint);
        // const ERC20FlashMintImport = '@openzeppelin/contracts/token/ERC20/extensions/ERC20FlashMint.sol';
        // const ERC20FlashMintable = 'ERC20FlashMint';
        // console.log("Came HERE");
        // if (this._isFlashMint === isFlashMint) {
        //     return;
        // } else {
        //     if (isFlashMint) {
        //         console.log("Came HERE2");
        //         if (!this.contract.importList.includes(ERC20FlashMintImport)) {
        //             this.contract.importList.push(ERC20FlashMintImport);
        //         }
        //         if (!this.contract.inheritances.includes(ERC20FlashMintable)) {
        //             this.contract.inheritances.push(ERC20FlashMintable);
        //         }
        //     } else {
        //         // REMOVE IMPORTS
        //         const index = this.contract.importList.indexOf(ERC20FlashMintImport);
        //         console.log("INDEX: ", index);
        //         if (index !== -1) {
        //             this.contract.importList.splice(index, 1);
        //         }
        //         // REMOVE INHERITANCE
        //         if (this.contract.inheritances.includes(ERC20FlashMintable)) {
        //             this.contract.inheritances.splice(this.contract.inheritances.indexOf(ERC20FlashMintable), 1);
        //         }
        //     }
        // }
        // this._isFlashMint = isFlashMint;
    }

    setIsMintable = (isMintable: boolean) => {
        this._accessControlState.setIsMintable(isMintable);
        // if (isMintable === this._isMintable) {
        //     return;
        // } else {
        //     const functionList = this.contract.contractBody._functionList;
        //     if (isMintable) {
        //         if (this._accessControl === AccessControl_Dev.NONE) {
        //             console.log("Access control have to be set before mintable")
        //             return;
        //         }

        //         // ADD MINT FUNCTION
        //         let modifierList: ModifierCall_Dev[] = [];
        //         //  set mint function modifier list
        //         switch (this._accessControl) {
        //             case AccessControl_Dev.OWNABLE: {
        //                 modifierList = [new ModifierCall_Dev({ name: 'onlyOwner' })]
        //                 break;
        //             }
        //             case AccessControl_Dev.ROLES: {
        //                 // ADD MINTER_ROLE CONSTANCE
        //                 console.log("CAME HERE33");
        //                 const stateName = "MINTER_ROLE";
        //                 const idx = this.contract.contractBody._stateList.findIndex((item) => (item._name === stateName));
        //                 if (idx === - 1) {
        //                     const state: State_Dev = new State_Dev("MINTER_ROLE", "bytes32", Visibility_Dev.PUBLIC, true, undefined, undefined, "keccak256(\"MINTER_ROLE\")");
        //                     this.contract.contractBody._stateList.push(state);
        //                 }
        //                 //ADD CONSTRUCTOR FUNCTION BODY 
        //                 const fnString = "_grantRole(MINTER_ROLE, minter);";
        //                 if (!this.contract.contractBody._contractConstructor._functionBody.includes(fnString)) {
        //                     this.contract.contractBody._contractConstructor._functionBody.push(fnString);
        //                 }

        //                 modifierList = [new ModifierCall_Dev({ name: 'onlyRole', args: ['MINTER_ROLE'] })]
        //                 break;
        //             }
        //             case AccessControl_Dev.MANAGED: {
        //                 modifierList = [new ModifierCall_Dev({ name: 'restricted' })]
        //                 break;
        //             }
        //             default: {
        //                 this.setAccessControl(AccessControl_Dev.OWNABLE);
        //             }
        //         }
        //         console.log("Modifier call LIST", modifierList);
        //         const mintFunction: Function_Dev = new FunctionBuilder()
        //             .setName('mint')
        //             .setParameterList([new Parameter('address', 'to', DataLocation_Dev.NONE), new Parameter('uint256', 'amount', DataLocation_Dev.NONE)])
        //             .setVisibility(Visibility_Dev.PUBLIC)
        //             .setModifierCallList(modifierList)
        //             .setFunctionBody(['_mint(to, amount);'])
        //             .build();
        //         functionList.push(mintFunction);
        //         // this.contract.contractBody._functionList = functionList;
        //     } else {
        //         // REMOVE MINT FUNCTION IF EXIST
        //         if (functionList.find((item) => item._name === 'mint')) {
        //             functionList.splice(functionList.findIndex((item) => item._name === 'mint'), 1);
        //         }
        //     }
        // }
        // this._isMintable = isMintable;
    }


    setVotes(Vote: Vote_Dev) {
        this._accessControlState.setVotes(Vote);
        // if (Vote === Vote_Dev.NONE) {
        //     //DELETE IMPORT    
        //     const voteImport = "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
        //     const idx = this.contract.importList.indexOf(voteImport);
        //     if (this.contract.importList.includes(voteImport)) {
        //         this.contract.importList.splice(idx, 1);
        //     }
        //     return;
        // }

        // this.setIsPermit(true);
        // //SET IMPORT    
        // const voteImport = "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
        // if (!this.contract.importList.includes(voteImport)) {
        //     this.contract.importList.push(voteImport);
        // }
        // //SET INHERITANCE 
        // const voteInheritance = "ERC20Votes";
        // if (!this.contract.inheritances.includes(voteInheritance)) {
        //     this.contract.inheritances.push(voteInheritance);
        // }
        // //SET FUNCTION
        // //1. function _updateFunction
        // {
        //     const fName = "_update";
        //     const idx: number = this.contract.contractBody._functionList.findIndex((item) => (item._name === fName));
        //     if (idx === -1) {
        //         const updateFunction: Function_Dev = new FunctionBuilder()
        //             .setName(fName)
        //             .setParameterList([
        //                 new ParameterBuilder().setType("address").setName("from").setDataLocation(DataLocation_Dev.NONE).build(),
        //                 new ParameterBuilder().setType("address").setName("to").setDataLocation(DataLocation_Dev.NONE).build(),
        //                 new ParameterBuilder().setType("uint256").setName("value").setDataLocation(DataLocation_Dev.NONE).build(),
        //             ])
        //             .setVisibility(Visibility_Dev.INTERNAL)
        //             .setOverrideSpecifier(new OverriderSpecifier_Dev(["ERC20", "ERC20Votes"]))
        //             .setFunctionBody([`super._update(from, to, value);`])
        //             .build();
        //         this.contract.contractBody._functionList.push(updateFunction);
        //     } else {
        //         this.contract.contractBody._functionList[idx]._overrideSpecifier?._identifierPath.push("ERC20Votes");
        //     }
        // }
        // //2. func"jtion nonces 
        // {
        //     const fName = "nonces";
        //     const idx: number = this.contract.contractBody._functionList.findIndex((item) => (item._name === fName))
        //     if (idx === -1) {
        //         const noncesFunction: Function_Dev = new FunctionBuilder()
        //             .setName(fName)
        //             .setParameterList([new ParameterBuilder().setType("address").setName("owner").build()])
        //             .setVisibility(Visibility_Dev.PUBLIC)
        //             .setStateMutability(StateMutability.VIEW)
        //             .setOverrideSpecifier(new OverriderSpecifier_Dev(["ERC20Permit", "Nonces"]))
        //             .setReturns([new ParameterBuilder().setType("uint256").setDataLocation(DataLocation_Dev.NONE).build()])
        //             .setFunctionBody([`return super.${fName}(owner);`])
        //             .build();
        //         this.contract.contractBody._functionList.push(noncesFunction);
        //     } else {
        //         // NOTHING TO HANDLE, UPDATE LATER =))
        //     }
        // }
        // // 3. If VOTE.TIMESTAMP add clock() and CLOCK_MODE() functions
        // if (Vote === Vote_Dev.TIMESTAMP) {
        //     //3.1 add function clock()
        //     {
        //         const fName: String = "clock";
        //         const idx: number = this.contract.contractBody._functionList.findIndex((f) => (f._name === fName));
        //         if (idx === -1) {
        //             const clockFunction: Function_Dev = new FunctionBuilder()
        //                 .setName(fName)
        //                 .setVisibility(Visibility_Dev.PUBLIC)
        //                 .setStateMutability(StateMutability.VIEW)
        //                 .setOverrideSpecifier(new OverriderSpecifier_Dev())
        //                 .setReturns([new ParameterBuilder().setType("uint256").build()])
        //                 .setFunctionBody([`return super.${fName}(owner);`])
        //                 .build();
        //             this.contract.contractBody._functionList.push(clockFunction);
        //         } else {
        //             // NOTHING TO HANDLE, UPDATE LATER =))
        //         }

        //     }
        //     //3.2 add function CLOCK_MODE()
        //     {
        //         const fName: String = "CLOCK_MODE";
        //         const idx: number = this.contract.contractBody._functionList.findIndex((f) => (f._name === fName));
        //         if (idx === -1) {
        //             const clockModeFunction: Function_Dev = new FunctionBuilder()
        //                 .setName(fName)
        //                 .setVisibility(Visibility_Dev.PUBLIC)
        //                 .setStateMutability(StateMutability.PURE)
        //                 .setOverrideSpecifier(new OverriderSpecifier_Dev([]))
        //                 .setReturns([new ParameterBuilder().setType("string").setDataLocation(DataLocation_Dev.MEMORY)])
        //                 .setFunctionBody(["return \"mode=timestamp\""])
        //                 .build();
        //             this.contract.contractBody._functionList.push(clockModeFunction);
        //         } else {
        //             // NOTHING TO HANDLE, UPDATE LATER =))
        //         }
        //     }
        // }
        // this._vote = Vote;
    }

    changeAccessControlState = (ac: AccessControl_Dev) => {

        // console.log("Change Access Control State: ", ac);
        // if (![0, 1, 2, 3].includes(ac)) {
        //     console.log("Invalid Access Control Type: ", ac);
        //     return;
        // }
        this._accessControl = ac;
        this._accessControlState = new AC_NoneState(this);
        switch (ac) {
            case AccessControl_Dev.OWNABLE: {

                this._accessControlState = new AC_OwnableState(this);
                break;
            }
            case AccessControl_Dev.ROLES: {

                this._accessControlState = new AC_RolesState(this);
                break;
            }
            case AccessControl_Dev.MANAGED: {
                this._accessControlState = new AC_ManagedState(this);
                break;
            }
            default: {
                this._accessControlState = new AC_NoneState(this);
            }
        }
    }

    // setAccessControl(ac: AccessControl_Dev) {
    //     if (ac === AccessControl_Dev.NONE) {
    //         return;
    //     }
    //     //HANDLE FUNCTIONS
    //     const handleCaseOwnable = () => {
    //         //ADD CONSTRUCTOR PARAM
    //         const initialOwnerParamName = 'initialOwner';
    //         const initialOwnerParam = new ParameterBuilder()
    //             .setName(initialOwnerParamName)
    //             .setType('address')
    //             .setDataLocation(DataLocation_Dev.NONE)
    //             .build();
    //         if (!this.contract.contractBody._contractConstructor._parameterList.find((p) => p._name === initialOwnerParamName)) {
    //             this.contract.contractBody._contractConstructor._parameterList.push(initialOwnerParam);
    //         }
    //         //ADD IMPORTS
    //         const OwnableImport = '@openzeppelin/contracts/access/Ownable.sol';
    //         if (!this.contract.importList.includes(OwnableImport)) {
    //             this.contract.importList.push(OwnableImport);
    //         }
    //         //ADD INHERITANCE
    //         const OwnableInheritance = 'Ownable';
    //         if (!this.contract.inheritances.includes(OwnableInheritance)) {
    //             this.contract.inheritances.push(OwnableInheritance);
    //         }
    //         //ADD CONSTRUCTOR MODIFIER CALL
    //         const modifierName = "Ownable";
    //         const modifierArgs = ["initialOwner"];
    //         const constructorModifierCall = this.contract.contractBody._contractConstructor._modifierCallList;
    //         if (!constructorModifierCall.find((item) => item._name === 'Ownable')) {
    //             constructorModifierCall.push(new ModifierCall_Dev({ name: modifierName, args: modifierArgs }));
    //         }
    //     }

    //     const handleCaseRoles = () => {
    //         //ADD CONSTRUCTOR PARAM
    //         const defaultAdminParamName = 'defaultAdmin';
    //         const defaultAdminParam = new ParameterBuilder()
    //             .setName(defaultAdminParamName)
    //             .setType('address')
    //             .setDataLocation(DataLocation_Dev.NONE)
    //             .build();
    //         if (!this.contract.contractBody._contractConstructor._parameterList.find((p) => p._name === defaultAdminParamName)) {
    //             this.contract.contractBody._contractConstructor._parameterList.push(defaultAdminParam);
    //         }
    //         //ADD IMPORTS
    //         const accessControlImport = '@openzeppelin/contracts/access/AccessControl.sol';
    //         if (!this.contract.importList.includes(accessControlImport)) {
    //             this.contract.importList.push(accessControlImport);
    //         }
    //         //ADD INHERITANCE
    //         const accessControlInheritance = 'AccessControl';
    //         if (!this.contract.inheritances.includes(accessControlInheritance)) {
    //             this.contract.inheritances.push(accessControlInheritance);
    //         }
    //         //ADD FUNCTION BODY
    //         const functionString = "_grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);";
    //         const idx = this.contract.contractBody._contractConstructor._functionBody.indexOf(functionString);
    //         if (idx === -1) {
    //             let constructorFunctionBody = this.contract.contractBody._contractConstructor._functionBody;
    //             this.contract.contractBody._contractConstructor._functionBody =
    //                 constructorFunctionBody.concat(functionString);
    //         }
    //     }
    //     const handleCaseManaged = () => {
    //         //ADD CONSTRUCTOR PARAM
    //         const initialAuthorityParamName = 'initialAuthority';
    //         const initialAuthorityParam = new ParameterBuilder()
    //             .setName(initialAuthorityParamName)
    //             .setType('address')
    //             .setDataLocation(DataLocation_Dev.NONE)
    //             .build();
    //         if (!this.contract.contractBody._contractConstructor._parameterList.find((p) => p._name === initialAuthorityParamName)) {
    //             this.contract.contractBody._contractConstructor._parameterList.push(initialAuthorityParam);
    //         }
    //         //ADD IMPORTS
    //         const AccessManagedImport = '@openzeppelin/contracts/access/manager/AccessManaged.sol';
    //         if (!this.contract.importList.includes(AccessManagedImport)) {
    //             this.contract.importList.push(AccessManagedImport);
    //         }
    //         //ADD INHERITANCE
    //         const AccessManagerInheritance = 'AccessManaged';
    //         if (!this.contract.inheritances.includes(AccessManagerInheritance)) {
    //             this.contract.inheritances.push(AccessManagerInheritance);
    //         }
    //         //ADD CONSTRUCTOR MODIFIER CALL
    //         const modifierName = "AccessManaged";
    //         const modifierArgs = [initialAuthorityParamName];
    //         const constructorModifierCall = this.contract.contractBody._contractConstructor._modifierCallList;
    //         if (!constructorModifierCall.find((item) => item._name === modifierName)) {
    //             constructorModifierCall.push(new ModifierCall_Dev({ name: modifierName, args: modifierArgs }));
    //         }

    //     }

    //     switch (ac) {
    //         case AccessControl_Dev.OWNABLE: {
    //             handleCaseOwnable();
    //             break;
    //         }
    //         case AccessControl_Dev.ROLES: {
    //             handleCaseRoles();
    //             break;
    //         }
    //         case AccessControl_Dev.MANAGED: {
    //             handleCaseManaged();
    //             break;
    //         }
    //         default: {
    //             return;
    //         }
    //     }
    //     this._accessControl = ac;
    // }
}

export default ERC20Mapper;