import { Contract_Dev, Contract_DevBuilder } from "../classes/Contract_Dev";
import AccessControl_Dev from "../enums/AccessControl_Dev";
import Vote_Dev from "../enums/Vote_Dev";
import Upgradeability_Dev from "../enums/Upgradeability_Dev";
import ContractBody_Dev from "../classes/ContractBody_Dev";
import ModifierCall_Dev from "../classes/ModifierCall_Dev";
import Constructor_Dev from "../classes/Constructor_Dev";
import { FunctionBuilder, Function_Dev } from "../classes/Function_Dev";
import Visibility_Dev from "../enums/Visibility_Dev";
import Modifier_Dev from "../classes/Modifier_Dev";
import OverriderSpecifier_Dev from "../classes/OverriderSpecifier_Dev";
import DataLocation_Dev from "../enums/DataLocation_Dev";
import { Parameter, ParameterBuilder } from "../classes/Parameter";
import ContractMapper from "../interfaces/ContractMapper";
import StateMutability from "../enums/StateMutability_Dev";

type TokenInformation = {
    securityContact?: String;
    license?: String;
}
const INIT_IMPORTS = ['@openzeppelin/contracts/token/ERC20/ERC20.sol'];
const TOKEN_TYPE = "ERC20";
class ERC20Mapper implements ContractMapper {

    private contract: Contract_Dev;

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
    constructor() {
        this.contract = new Contract_DevBuilder()
            .setInheritances([TOKEN_TYPE])
            .setVersion('^0.8.20')
            .setName("")
            .setContractBody(new ContractBody_Dev({
                contractConstructor: new Constructor_Dev({
                    functionBody: "",
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
        if (name === "") {
            return;
        }
        // this is the setup for assign the name for the token
        //set the name of the contract
        this.contract.name = name;

        // set the modifier with name in the argument
        const currentERC20ModifierCall: ModifierCall_Dev | undefined = this.contract
            .contractBody
            ?._contractConstructor
            ._modifierCallList.find((item) =>
                item._name === TOKEN_TYPE)
        if (currentERC20ModifierCall === undefined) {
            throw new Error("The ERC20 modifier call is not found");
        }
        const ERC20ModifierCall = new ModifierCall_Dev({ name: TOKEN_TYPE, args: [`"${name}"`, currentERC20ModifierCall._args[1]] })
        const newModifierCallList: ModifierCall_Dev[] = [ERC20ModifierCall, ...this.contract.contractBody?._contractConstructor._modifierCallList.slice(1) ?? []]
        if (this.contract.contractBody?._contractConstructor) {
            this.contract.contractBody._contractConstructor._modifierCallList = newModifierCallList;
        }

        //Set mapper name property 
        this._name = name;
    }

    setLicense = (license: String) => {
        this._tokenInformation.license = license;
        this.contract.license = license;
    }

    setSymbol = (symbol: String) => {
        if (symbol === "") {
            return;
        }
        const currentERC20ModifierCall: ModifierCall_Dev | undefined = this.contract
            .contractBody
            ?._contractConstructor
            ._modifierCallList.find((item) =>
                item._name === TOKEN_TYPE)
        if (currentERC20ModifierCall === undefined) {
            throw new Error("The ERC20 modifier call is not found");
        }

        const ERC20ModifierCall = new ModifierCall_Dev({ name: TOKEN_TYPE, args: [currentERC20ModifierCall._args[0], `"${symbol}"`] })
        const newModifierCallList: ModifierCall_Dev[] = [ERC20ModifierCall, ...this.contract.contractBody?._contractConstructor._modifierCallList.slice(1) ?? []]
        if (this.contract.contractBody?._contractConstructor) {
            this.contract.contractBody._contractConstructor._modifierCallList = newModifierCallList;
        }
        this._symbol = symbol;
    }

    setPremint = (amount: number) => {
        if (amount <= 0) {
            return;
        }
        const permitCommand = `_mint(msg.sender, ${amount} * 10 ** decimals());`;
        if (this.contract.contractBody?._contractConstructor) {
            if (this.contract.contractBody._contractConstructor._functionBody === "") {
                this.contract.contractBody._contractConstructor._functionBody += permitCommand;
            } else {
                this.contract.contractBody._contractConstructor._functionBody += `\n${permitCommand}`;
            }
        }
        this._premint = amount;
    }

    setIsPermit = (isPermit: boolean) => {
        if (this._isPermint && isPermit) {
            return;
        } else {
            const permitInheritance = 'ERC20Permit';
            const permitImport = '@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol';
            const importList = this.contract.importList;
            if (isPermit) {
                // ADD INHERITANCE
                if (!this.contract.inheritances.includes(permitInheritance)) {
                    this.contract.inheritances.push(permitInheritance);
                }
                // ADD IMPORT
                if (!importList.includes(permitImport)) {
                    importList.push(permitImport);
                }
            } else {
                const idx = importList.findIndex((imp) => imp === permitImport);
                if (idx > -1) {
                    importList.splice(idx, 1);
                }
            }
        }
        this._isPermint = isPermit;
    }

    setIsBurnable = (isBurnable: boolean) => {
        const importList = this.contract.importList;
        const burnableImport = '@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol';
        const burnableInheritance = "ERC20Burnable";
        if (this._isBurnable && isBurnable) {
            console.log("BURNABLE IS ALREADY ENABLED");
            return;
        } else {
            if (isBurnable) {
                // ADD INHERITANCE
                if (!this.contract.inheritances.includes(burnableInheritance)) {
                    this.contract.inheritances.push(burnableInheritance);
                }
                // ADD IMPORT
                if (!importList.includes(burnableImport)) {
                    importList.push(burnableImport);
                    console.log("PUSHED BURNABLE IMPORT");
                }
            } else { const index = importList.indexOf(burnableImport); if (index > -1) { importList.splice(index, 1); } } console.log("PERMIT IS ALREADY ENABLED");
        }
        this._isBurnable = isBurnable;
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
                    .setModifierList([new Modifier_Dev('onlyOwner', [])])
                    .setFunctionBody('_pause();').build();
                this.contract.contractBody._functionList.push(pauseFunction);
                // add unpause()
                const unpauseFunction: Function_Dev = new FunctionBuilder()
                    .setName('unpause')
                    .setVisibility(Visibility_Dev.PUBLIC)
                    .setModifierList([new Modifier_Dev('onlyOwner', [])])
                    .setFunctionBody('_unpause();').build();
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
                            .setFunctionBody('super._update(from, to, value);')
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
        const ERC20FlashMintImport = '@openzeppelin/contracts/token/ERC20/extensions/ERC20FlashMint.sol';
        const ERC20FlashMintable = 'ERC20FlashMint';
        if (this._isFlashMint && isFlashMint) {
            return;
        } else {
            const importList = this.contract.importList;
            const inheritances = this.contract.inheritances;
            if (isFlashMint) {
                if (!importList.includes(ERC20FlashMintImport)) {
                    importList.push(ERC20FlashMintImport);
                }
                if (!inheritances.includes(ERC20FlashMintable)) {
                    inheritances.push(ERC20FlashMintable);
                }
            } else {
                const index = importList.indexOf(ERC20FlashMintImport);
                if (index > -1) {
                    importList.splice(index, 1);
                }
                if (inheritances.includes(ERC20FlashMintable)) {
                    inheritances.splice(this.contract.inheritances.indexOf(ERC20FlashMintable), 1);
                }
            }
        }
        // if (isFlashMint) {
        //     if (!this.contract.importList.includes(ERC20FlashMintImport)) {
        //         this.contract.importList.push(ERC20FlashMintImport);
        //     }
        // } else {
        //     const index = this.contract.importList.indexOf(ERC20FlashMintImport);
        //     if (index > -1) {
        //         this.contract.importList.splice(index, 1);
        //     }
        // }
        this._isFlashMint = isFlashMint;
    }

    setIsMintable = (isMintable: boolean) => {
        if (isMintable && this._isMintable) {
            return;
        } else {
            const inheritances = this.contract.inheritances;
            const functionList = this.contract.contractBody._functionList;
            const constructorModifierCall = this.contract.contractBody._contractConstructor._modifierCallList;
            if (isMintable) {
                // ADD INHERITANCE 
                if (!inheritances.includes('Ownable')) {
                    inheritances.push('Ownable');
                }
                // ADD CONSTUCTOR MODIFIER CALLL
                if (!constructorModifierCall.find((item) => item._name === 'Ownable')) {
                    constructorModifierCall.push(new ModifierCall_Dev({ name: 'Ownable', args: ["initialOwner"] }));
                }
                // ADD MINT FUNCTION
                const mintFunction: Function_Dev = new FunctionBuilder()
                    .setName('mint')
                    .setParameterList([new Parameter('address', 'to', DataLocation_Dev.NONE), new Parameter('uint256', 'amount', DataLocation_Dev.NONE)])
                    .setVisibility(Visibility_Dev.PUBLIC)
                    .setModifierList([new Modifier_Dev('onlyOwner', [])])
                    .setFunctionBody('_mint(to, amount);')
                    .build();
                functionList.push(mintFunction);
                // this.contract.contractBody._functionList = functionList;
            } else {
                // REMOVE INHERITANCE IF EXIST
                if (inheritances.includes('Ownable')) {
                    inheritances.splice(inheritances.indexOf('Ownable'), 1);
                }
                // REMOVE CONSTUCTOR MODIFIER CaLl IF EXIST 
                if (constructorModifierCall.find((item) => item._name === 'Ownable')) {
                    constructorModifierCall.splice(constructorModifierCall.findIndex((item) => item._name === 'Ownable'), 1);
                }
                // REMOVE MINT FUNCTION IF EXIST
                if (functionList.find((item) => item._name === 'mint')) {
                    functionList.splice(functionList.findIndex((item) => item._name === 'mint'), 1);
                }
            }
        }
        this._isMintable = isMintable;
    }

    setAccessControl(accessControl: AccessControl_Dev) {

    }

    setVotes(Vote: Vote_Dev) {
        if (Vote === Vote_Dev.NONE) {
            return;
        }

        this.setIsPermit(true);
        //SET IMPORT    
        const voteImport = "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
        if (!this.contract.importList.includes(voteImport)) {
            this.contract.importList.push(voteImport);
        }
        //SET INHERITANCE 
        const voteInheritance = "ERC20Votes";
        if (!this.contract.inheritances.includes(voteInheritance)) {
            this.contract.inheritances.push(voteInheritance);
        }
        //SET FUNCTION
        //1. function _updateFunction
        {
            const fName = "_update"
            const idx: number = this.contract.contractBody._functionList.findIndex((item) => (item._name === fName));
            if (idx === -1) {
                const updateFunction: Function_Dev = new FunctionBuilder()
                    .setName(fName)
                    .setParameterList([
                        new ParameterBuilder().setType("address").setName("from").setDataLocation(DataLocation_Dev.NONE).build(),
                        new ParameterBuilder().setType("address").setName("to").setDataLocation(DataLocation_Dev.NONE).build(),
                        new ParameterBuilder().setType("uint256").setName("value").setDataLocation(DataLocation_Dev.NONE).build(),
                    ])
                    .setVisibility(Visibility_Dev.INTERNAL)
                    .setOverrideSpecifier(new OverriderSpecifier_Dev(["ERC20", "ERC20Votes"]))
                    .setFunctionBody(`super._update(from, to, value);`)
                    .build();
                this.contract.contractBody._functionList.push(updateFunction);
            } else {
                this.contract.contractBody._functionList[idx]._overrideSpecifier?._identifierPath.push("ERC20Votes");
            }
        }
        //2. function nonces 
        {
            const fName = "nonces";
            const idx: number = this.contract.contractBody._functionList.findIndex((item) => (item._name === fName))
            if (idx === -1) {
                const noncesFunction: Function_Dev = new FunctionBuilder()
                    .setName(fName)
                    .setParameterList([new ParameterBuilder().setType("address").setName("owner").build()])
                    .setVisibility(Visibility_Dev.PUBLIC)
                    .setStateMutability(StateMutability.VIEW)
                    .setOverrideSpecifier(new OverriderSpecifier_Dev(["ERC20Permit", "Nonces"]))
                    .setReturns([new ParameterBuilder().setType("uint256").setDataLocation(DataLocation_Dev.NONE).build()])
                    .setFunctionBody(`return super.${fName}(owner);`)
                    .build();
                this.contract.contractBody._functionList.push(noncesFunction);
            } else {
                // NOTHING TO HANDLE, UPDATE LATER =))
            }
        }
        // 3. If VOTE.TIMESTAMP add clock() and CLOCK_MODE() functions
        if (Vote === Vote_Dev.TIMESTAMP) {
            //3.1 add function clock()
            {
                const fName: String = "clock";
                const idx: number = this.contract.contractBody._functionList.findIndex((f) => (f._name === fName));
                if (idx === -1) {
                    const clockFunction: Function_Dev = new FunctionBuilder()
                        .setName(fName)
                        .setVisibility(Visibility_Dev.PUBLIC)
                        .setStateMutability(StateMutability.VIEW)
                        .setOverrideSpecifier(new OverriderSpecifier_Dev())
                        .setReturns([new ParameterBuilder().setType("uint256").build()])
                        .setFunctionBody(`return super.${fName}(owner);`)
                        .build();
                    this.contract.contractBody._functionList.push(clockFunction);
                } else {
                    // NOTHING TO HANDLE, UPDATE LATER =))
                }

            }
            //3.2 add function CLOCK_MODE()
            {
                const fName: String = "CLOCK_MODE";
                const idx: number = this.contract.contractBody._functionList.findIndex((f) => (f._name === fName));
                if (idx === -1) {
                    const clockModeFunction: Function_Dev = new FunctionBuilder()
                        .setName(fName)
                        .setVisibility(Visibility_Dev.PUBLIC)
                        .setStateMutability(StateMutability.PURE)
                        .setOverrideSpecifier(new OverriderSpecifier_Dev([]))
                        .setReturns([new ParameterBuilder().setType("string").setDataLocation(DataLocation_Dev.MEMORY)])
                        .setFunctionBody("return \"mode=timestamp\"")
                        .build();
                    this.contract.contractBody._functionList.push(clockModeFunction);
                } else {
                    // NOTHING TO HANDLE, UPDATE LATER =))
                }
            }
        }
    }
}

export default ERC20Mapper;