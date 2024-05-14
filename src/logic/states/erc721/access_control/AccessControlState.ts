import { FunctionBuilder, Function_Dev } from "../../../classes/Function_Dev";
import ModifierCall_Dev from "../../../classes/ModifierCall_Dev";
import OverriderSpecifier_Dev from "../../../classes/OverriderSpecifier_Dev";
import { ParameterBuilder } from "../../../classes/Parameter";
import DataLocation_Dev from "../../../enums/DataLocation_Dev";
import StateMutability from "../../../enums/StateMutability_Dev";
import Visibility_Dev from "../../../enums/Visibility_Dev";
import Vote_Dev from "../../../enums/Vote_Dev";
import ContractMapper from "../../../interfaces/ContractMapper";
import ERC721Mapper from "../../../mappers/ERC721Mapper";

export const TOKEN_TYPE = "ERC721";

abstract class AccessControlState {
    protected _mapper: ERC721Mapper;
    constructor(mapper: ERC721Mapper) {
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
        const currentERC721ModifierCall: ModifierCall_Dev | undefined = this._mapper.contract
            .contractBody
            ?._contractConstructor
            ._modifierCallList.find((item) =>
                item._name === TOKEN_TYPE)
        if (currentERC721ModifierCall === undefined) {
            throw new Error("The ERC721 modifier call is not found");
        }
        const ERC721ModifierCall = new ModifierCall_Dev({ name: TOKEN_TYPE, args: [`"${name}"`, currentERC721ModifierCall._args[1]] })
        const newModifierCallList: ModifierCall_Dev[] = [ERC721ModifierCall, ...this._mapper.contract.contractBody?._contractConstructor._modifierCallList.slice(1) ?? []]
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
        const currentERC721ModifierCall: ModifierCall_Dev | undefined = this._mapper.contract
            .contractBody
            ?._contractConstructor
            ._modifierCallList.find((item) =>
                item._name === TOKEN_TYPE)
        if (currentERC721ModifierCall === undefined) {
            throw new Error("The er modifier call is not found");
        }

        const ERC721ModifierCall = new ModifierCall_Dev({ name: TOKEN_TYPE, args: [currentERC721ModifierCall._args[0], `"${symbol}"`] })
        const newModifierCallList: ModifierCall_Dev[] = [ERC721ModifierCall, ...this._mapper.contract.contractBody?._contractConstructor._modifierCallList.slice(1) ?? []]
        if (this._mapper.contract.contractBody?._contractConstructor) {
            this._mapper.contract.contractBody._contractConstructor._modifierCallList = newModifierCallList;
        }
        this._mapper._symbol = symbol;
    };

    setIsBurnable = (isBurnable: boolean) => {
        if (isBurnable === this._mapper._isBurnable) {
            return;
        }
        // ADD IMPORTS
        {
            const imports = '@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol';
            if (!this._mapper.contract.importList.includes(imports)) {
                this._mapper.contract.importList.push(imports);
            }
        }
        // ADD INHERITANCES
        {
            const inheritances = 'ERC721Burnable';
            if (!this._mapper.contract.inheritances.includes(inheritances)) {
                this._mapper.contract.inheritances.push(inheritances);
            }
        }
        this._mapper._isBurnable = isBurnable;
    }

    setVotes = (vote: Vote_Dev) => {
        if (vote === this._mapper._vote) {
            return;
        }
        // ADD IMPORTS
        // ADD INHERITANCES
        // ADD CONSTRUCTOR MODIFIER
        this._mapper._vote = vote;
    }

    setIsEnumerable = (isEnumerable: boolean) => {
        if (isEnumerable === this._mapper._isEnumerable) {
            return;
        }
        if (isEnumerable) {
            const overriderSpecifier =
                new OverriderSpecifier_Dev(["ERC721", "ERC721Enumerable"]); // Both tokenURI and supportsInterface have the same overrider specifier
            // ADD IMPORT
            {
                const ERC721EnumerableImport: String = '@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
                if (!this._mapper.contract.importList.includes(ERC721EnumerableImport)) {
                    this._mapper.contract.importList.push(ERC721EnumerableImport);
                }
            }
            // ADD INHERITANCES 
            {
                const ERC721EnumerableInheritance: String = 'ERC721Enumerable';
                if (!this._mapper.contract.inheritances.includes(ERC721EnumerableInheritance)) {
                    this._mapper.contract.inheritances.push(ERC721EnumerableInheritance);
                }
            }
            // ADD FUNCTIONS
            {
                // ADD _update func
                {
                    const funcName: String = '_update';
                    const idx = this._mapper.contract.contractBody._functionList.findIndex((item) => item._name === funcName);  // check if the function already exists
                    if (idx > -1) {
                        this._mapper.contract.contractBody._functionList[idx]._overrideSpecifier?._identifierPath.push("ERC721Enumerable");
                    } else {
                        const func: Function_Dev = new FunctionBuilder()
                            .setName(funcName)
                            .setParameterList([
                                new ParameterBuilder().setType("address").setName("to").build(),
                                new ParameterBuilder().setType("uint256").setName("tokenId").build(),
                                new ParameterBuilder().setType("address").setName("auth").build()
                            ])
                            .setVisibility(Visibility_Dev.INTERNAL)
                            .setStateMutability(StateMutability.PURE)
                            .setOverrideSpecifier(overriderSpecifier)
                            .setReturns([new ParameterBuilder().setType("address").build()])
                            .setFunctionBody([`super._update(to, tokenId, auth);`])
                            .build();
                        this._mapper.contract.contractBody._functionList.push(func);
                    }
                }
                // ADD _increaseBalance func
                {
                    const funcName: String = '_increaseBalance';
                    const idx = this._mapper.contract.contractBody._functionList.findIndex((item) => item._name === funcName);  // check if the function already exists
                    if (idx > -1) {
                        this._mapper.contract.contractBody._functionList[idx]._overrideSpecifier?._identifierPath.push("ERC721Enumerable");
                    } else {
                        const func: Function_Dev = new FunctionBuilder()
                            .setName(funcName)
                            .setParameterList([
                                new ParameterBuilder().setType("address").setName("account").build(),
                                new ParameterBuilder().setType("uint128").setName("value").build(),
                            ])
                            .setVisibility(Visibility_Dev.INTERNAL)
                            .setOverrideSpecifier(overriderSpecifier)
                            .setFunctionBody([`super._increaseBalance(account, value);`])
                            .build();
                        this._mapper.contract.contractBody._functionList.push(func);
                    }
                }
                // ADD supportsInterface func
                {
                    const funcName: String = 'supportsInterface';
                    // if the contract already has the function, simply add the ERC721URIStorage overrider specifier 
                    const idx = this._mapper.contract.contractBody._functionList.findIndex((item) => item._name === funcName);
                    if (idx > -1) {
                        this._mapper.contract.contractBody._functionList[idx]._overrideSpecifier?._identifierPath.push("ERC721Enumerable");
                    } else { // if the contract don't have this function create a new one

                        const func: Function_Dev = new FunctionBuilder()
                            .setName(funcName)
                            .setParameterList([
                                new ParameterBuilder().setType("bytes4").setName("interfaceId").build(),
                            ])
                            .setVisibility(Visibility_Dev.PUBLIC)
                            .setStateMutability(StateMutability.VIEW)
                            .setOverrideSpecifier(overriderSpecifier)
                            .setReturns([new ParameterBuilder().setType("bool").setDataLocation(DataLocation_Dev.MEMORY).build()])
                            .setFunctionBody([`return super.supportsInterface(interfaceId);`])
                            .build();
                        this._mapper.contract.contractBody._functionList.push(func);
                    }

                }
            }

        }
        this._mapper._isEnumerable = isEnumerable;
    }
    setIsURIStorage = (isURIStorage: boolean) => {
        if (isURIStorage === this._mapper._isURIStorage) {
            return;
        }
        // ADD IMPORT
        {
            const ERC721URIStorageImport: String = '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
            if (!this._mapper.contract.importList.includes(ERC721URIStorageImport)) {
                this._mapper.contract.importList.push(ERC721URIStorageImport);
            }
        }
        // ADD INHERITANCES
        {
            const ERC721inheritance: String = 'ERC721URIStorage';
            if (!this._mapper.contract.inheritances.includes(ERC721inheritance)) {
                this._mapper.contract.inheritances.push(ERC721inheritance);
            }
        }
        // ADD FUNCTIONS
        {
            const overriderSpecifier =
                new OverriderSpecifier_Dev(["ERC721", "ERC721URIStorage"]); // Both tokenURI and supportsInterface have the same overrider specifier
            // ADD tokenURI func
            {
                const funcName: String = 'tokenURI';
                if (!this._mapper.contract.contractBody._functionList.find((f) => (f._name === funcName))) {
                    const func: Function_Dev = new FunctionBuilder()
                        .setName(funcName)
                        .setParameterList([
                            new ParameterBuilder().setType("uint256").setName("tokenId").build(),
                        ])
                        .setVisibility(Visibility_Dev.PUBLIC)
                        .setStateMutability(StateMutability.VIEW)
                        .setOverrideSpecifier(overriderSpecifier)
                        .setReturns([new ParameterBuilder().setType("string").setDataLocation(DataLocation_Dev.MEMORY).build()])
                        .setFunctionBody([`return super.tokenURI(tokenId);`])
                        .build();
                    this._mapper.contract.contractBody._functionList.push(func);
                }
            }
            // ADD supportsInterface func
            {
                const funcName: String = 'supportsInterface';
                // if the contract already has the function, simply add the ERC721URIStorage overrider specifier 
                const idx = this._mapper.contract.contractBody._functionList.findIndex((item) => item._name === funcName);
                if (idx > -1) {
                    this._mapper.contract.contractBody._functionList[idx]._overrideSpecifier?._identifierPath.push("ERC721URIStorage");
                } else { // if the contract don't have this function create a new one

                    const func: Function_Dev = new FunctionBuilder()
                        .setName(funcName)
                        .setParameterList([
                            new ParameterBuilder().setType("bytes4").setName("interfaceId").build(),
                        ])
                        .setVisibility(Visibility_Dev.PUBLIC)
                        .setStateMutability(StateMutability.VIEW)
                        .setOverrideSpecifier(overriderSpecifier)
                        .setReturns([new ParameterBuilder().setType("bool").setDataLocation(DataLocation_Dev.MEMORY).build()])
                        .setFunctionBody([`return super.supportsInterface(interfaceId);`])
                        .build();
                    this._mapper.contract.contractBody._functionList.push(func);
                }

            }
        }
        this._mapper._isURIStorage = isURIStorage;
    }

    abstract setIsPausable: (isPausable: boolean) => void;
    abstract setIsMintable: (isMintable: boolean) => void;
}
export default AccessControlState;