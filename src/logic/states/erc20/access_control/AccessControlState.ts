import { FunctionBuilder, Function_Dev } from "../../../classes/Function_Dev";
import ModifierCall_Dev from "../../../classes/ModifierCall_Dev";
import OverriderSpecifier_Dev from "../../../classes/OverriderSpecifier_Dev";
import { ParameterBuilder } from "../../../classes/Parameter";
import DataLocation_Dev from "../../../enums/DataLocation_Dev";
import StateMutability from "../../../enums/StateMutability_Dev";
import Visibility_Dev from "../../../enums/Visibility_Dev";
import Vote_Dev from "../../../enums/Vote_Dev";
import ERC20Mapper from "../../../mappers/ERC20Mapper";

const TOKEN_TYPE = "ERC20";

abstract class AccessControlState {
    protected _mapper: ERC20Mapper;

    constructor(mapper: ERC20Mapper) {
        this._mapper = mapper;
    }

    public setName(name: String) {

        if (name === "") {
            return;
        }
        // this is the setup for assign the name for the token
        //set the name of the contract
        this._mapper.contract.name = name;

        // set the modifier with name in the argument
        const currentERC20ModifierCall: ModifierCall_Dev | undefined = this._mapper.contract
            .contractBody
            ?._contractConstructor
            ._modifierCallList.find((item) =>
                item._name === TOKEN_TYPE)
        if (currentERC20ModifierCall === undefined) {
            throw new Error("The ERC20 modifier call is not found");
        }
        const ERC20ModifierCall = new ModifierCall_Dev({ name: TOKEN_TYPE, args: [`"${name}"`, currentERC20ModifierCall._args[1]] })
        const newModifierCallList: ModifierCall_Dev[] = [ERC20ModifierCall, ...this._mapper.contract.contractBody?._contractConstructor._modifierCallList.slice(1) ?? []]
        if (this._mapper.contract.contractBody?._contractConstructor) {
            this._mapper.contract.contractBody._contractConstructor._modifierCallList = newModifierCallList;
        }

        //Set mapper name property 
        this._mapper._name = name;
    }
    setLicense(license: String) {
        this._mapper._tokenInformation.license = license;
        this._mapper.contract.license = license;
    };
    setSymbol(symbol: String) {

        if (symbol === "") {
            return;
        }
        const currentERC20ModifierCall: ModifierCall_Dev | undefined = this._mapper.contract
            .contractBody
            ?._contractConstructor
            ._modifierCallList.find((item) =>
                item._name === TOKEN_TYPE)
        if (currentERC20ModifierCall === undefined) {
            throw new Error("The ERC20 modifier call is not found");
        }

        const ERC20ModifierCall = new ModifierCall_Dev({ name: TOKEN_TYPE, args: [currentERC20ModifierCall._args[0], `"${symbol}"`] })
        const newModifierCallList: ModifierCall_Dev[] = [ERC20ModifierCall, ...this._mapper.contract.contractBody?._contractConstructor._modifierCallList.slice(1) ?? []]
        if (this._mapper.contract.contractBody?._contractConstructor) {
            this._mapper.contract.contractBody._contractConstructor._modifierCallList = newModifierCallList;
        }
        this._mapper._symbol = symbol;
    };
    setPremint(amount: number) {
        if (amount <= 0) {
            return;
        }
        const permitCommand = `_mint(msg.sender, ${amount} * 10 ** decimals());`;
        if (this._mapper.contract.contractBody?._contractConstructor) {
            if (this._mapper.contract.contractBody._contractConstructor._functionBody.length === 0) {
                this._mapper.contract.contractBody._contractConstructor._functionBody.push(permitCommand);
            } else {
                this._mapper.contract.contractBody._contractConstructor._functionBody.push(`\n${permitCommand}`);
            }
        }
        this._mapper._premint = amount;
    }

    setIsPermit(isPermit: boolean) {

        if (this._mapper._isPermint && isPermit) {
            return;
        } else {
            const permitInheritance = 'ERC20Permit';
            const permitImport = '@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol';
            const importList = this._mapper.contract.importList;
            if (isPermit) {
                // ADD INHERITANCE
                if (!this._mapper.contract.inheritances.includes(permitInheritance)) {
                    this._mapper.contract.inheritances.push(permitInheritance);
                }
                // ADD IMPORT
                if (!importList.includes(permitImport)) {
                    importList.push(permitImport);
                }
                // ADD CONSTRUCTOR MODIFIER CALL
                const constructorModifierCall: ModifierCall_Dev = new ModifierCall_Dev({ name: 'ERC20Permit', args: [`"${this._mapper.contract.name}"`] });
                if (!this._mapper.contract.contractBody._contractConstructor._modifierCallList.find((item) => item._name === 'ERC20Permit')) {
                    this._mapper.contract.contractBody._contractConstructor._modifierCallList.push(constructorModifierCall);
                }
            } else {
                const idx = importList.findIndex((imp) => imp === permitImport);
                if (idx > -1) {
                    importList.splice(idx, 1);
                }
            }
        }
        this._mapper._isPermint = isPermit;
    }

    setIsBurnable(isBurnable: boolean) {

        const importList = this._mapper.contract.importList;
        const burnableImport = '@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol';
        const burnableInheritance = "ERC20Burnable";
        if (this._mapper._isBurnable && isBurnable) {
            // console.log("BURNABLE IS ALREADY ENABLED");
            return;
        } else {
            if (isBurnable) {
                // ADD INHERITANCE
                if (!this._mapper.contract.inheritances.includes(burnableInheritance)) {
                    this._mapper.contract.inheritances.push(burnableInheritance);
                }
                // ADD IMPORT
                if (!importList.includes(burnableImport)) {
                    importList.push(burnableImport);
                    // console.log("PUSHED BURNABLE IMPORT");
                }
            } else {
                const index = importList.indexOf(burnableImport);
                if (index > -1) { importList.splice(index, 1); }
            }
            // console.log("PERMIT IS ALREADY ENABLED");
        }
        this._mapper._isBurnable = isBurnable;
    }

    abstract setIsPausable: (isPausable: boolean) => void;
    setIsFlashMintable(isFlashMint: boolean) {

        const ERC20FlashMintImport = '@openzeppelin/contracts/token/ERC20/extensions/ERC20FlashMint.sol';
        const ERC20FlashMintable = 'ERC20FlashMint';
        // console.log("Came HERE");
        if (this._mapper._isFlashMint === isFlashMint) {
            return;
        } else {
            if (isFlashMint) {
                // console.log("Came HERE2");
                if (!this._mapper.contract.importList.includes(ERC20FlashMintImport)) {
                    this._mapper.contract.importList.push(ERC20FlashMintImport);
                }
                if (!this._mapper.contract.inheritances.includes(ERC20FlashMintable)) {
                    this._mapper.contract.inheritances.push(ERC20FlashMintable);
                }
            } else {
                // REMOVE IMPORTS
                const index = this._mapper.contract.importList.indexOf(ERC20FlashMintImport);
                // console.log("INDEX: ", index);
                if (index !== -1) {
                    this._mapper.contract.importList.splice(index, 1);
                }
                // REMOVE INHERITANCE
                if (this._mapper.contract.inheritances.includes(ERC20FlashMintable)) {
                    this._mapper.contract.inheritances.splice(this._mapper.contract.inheritances.indexOf(ERC20FlashMintable), 1);
                }
            }
        }
        this._mapper._isFlashMint = isFlashMint;
    };
    abstract setIsMintable: (isMintable: boolean) => void;
    setVotes(Vote: Vote_Dev) {

        if (Vote === Vote_Dev.NONE) {
            //DELETE IMPORT    
            const voteImport = "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
            const idx = this._mapper.contract.importList.indexOf(voteImport);
            if (this._mapper.contract.importList.includes(voteImport)) {
                this._mapper.contract.importList.splice(idx, 1);
            }
            return;
        }

        this.setIsPermit(true);
        //SET IMPORT    
        const voteImport = "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
        if (!this._mapper.contract.importList.includes(voteImport)) {
            this._mapper.contract.importList.push(voteImport);
        }
        //SET INHERITANCE 
        const voteInheritance = "ERC20Votes";
        if (!this._mapper.contract.inheritances.includes(voteInheritance)) {
            this._mapper.contract.inheritances.push(voteInheritance);
        }
        //SET FUNCTION
        //1. function _updateFunction
        {
            const fName = "_update";
            const idx: number = this._mapper.contract.contractBody._functionList.findIndex((item) => (item._name === fName));
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
                    .setFunctionBody([`super._update(from, to, value);`])
                    .build();
                this._mapper.contract.contractBody._functionList.push(updateFunction);
            } else {
                this._mapper.contract.contractBody._functionList[idx]._overrideSpecifier?._identifierPath.push("ERC20Votes");
            }
        }
        //2. func"jtion nonces 
        {
            const fName = "nonces";
            const idx: number = this._mapper.contract.contractBody._functionList.findIndex((item) => (item._name === fName))
            if (idx === -1) {
                const noncesFunction: Function_Dev = new FunctionBuilder()
                    .setName(fName)
                    .setParameterList([new ParameterBuilder().setType("address").setName("owner").build()])
                    .setVisibility(Visibility_Dev.PUBLIC)
                    .setStateMutability(StateMutability.VIEW)
                    .setOverrideSpecifier(new OverriderSpecifier_Dev(["ERC20Permit", "Nonces"]))
                    .setReturns([new ParameterBuilder().setType("uint256").setDataLocation(DataLocation_Dev.NONE).build()])
                    .setFunctionBody([`return super.${fName}(owner);`])
                    .build();
                this._mapper.contract.contractBody._functionList.push(noncesFunction);
            } else {
                // NOTHING TO HANDLE, UPDATE LATER =))
            }
        }
        // 3. If VOTE.TIMESTAMP add clock() and CLOCK_MODE() functions
        if (Vote === Vote_Dev.TIMESTAMP) {
            //3.1 add function clock()
            {
                const fName: String = "clock";
                const idx: number = this._mapper.contract.contractBody._functionList.findIndex((f) => (f._name === fName));
                if (idx === -1) {
                    const clockFunction: Function_Dev = new FunctionBuilder()
                        .setName(fName)
                        .setVisibility(Visibility_Dev.PUBLIC)
                        .setStateMutability(StateMutability.VIEW)
                        .setOverrideSpecifier(new OverriderSpecifier_Dev())
                        .setReturns([new ParameterBuilder().setType("uint256").build()])
                        .setFunctionBody([`return super.${fName}(owner);`])
                        .build();
                    this._mapper.contract.contractBody._functionList.push(clockFunction);
                } else {
                    // NOTHING TO HANDLE, UPDATE LATER =))
                }

            }
            //3.2 add function CLOCK_MODE()
            {
                const fName: String = "CLOCK_MODE";
                const idx: number = this._mapper.contract.contractBody._functionList.findIndex((f) => (f._name === fName));
                if (idx === -1) {
                    const clockModeFunction: Function_Dev = new FunctionBuilder()
                        .setName(fName)
                        .setVisibility(Visibility_Dev.PUBLIC)
                        .setStateMutability(StateMutability.PURE)
                        .setOverrideSpecifier(new OverriderSpecifier_Dev([]))
                        .setReturns([new ParameterBuilder().setType("string").setDataLocation(DataLocation_Dev.MEMORY)])
                        .setFunctionBody(["return \"mode=timestamp\""])
                        .build();
                    this._mapper.contract.contractBody._functionList.push(clockModeFunction);
                } else {
                    // NOTHING TO HANDLE, UPDATE LATER =))
                }
            }
        }
        this._mapper._vote = Vote;
    };
}

export default AccessControlState;