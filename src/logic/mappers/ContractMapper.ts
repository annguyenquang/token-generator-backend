import { Contract_Dev, Contract_DevBuilder } from "../classes/Contract_Dev";
import AccessControl_Dev from "../enums/AccessControl_Dev";
import Vote_Dev from "../enums/Vote_Dev";
import Upgradeability_Dev from "../enums/Upgradeability_Dev";
import ContractBody_Dev from "../classes/ContractBody_Dev";
import ModifierCall_Dev from "../classes/ModifierCall_Dev";
import Constructor_Dev from "../classes/Constructor_Dev";

type TokenInformation = {
    securityContact?: String;
    license?: String;
}
const INIT_IMPORTS = ['@openzeppelin/contracts/token/ERC20/ERC20.sol'];
const TOKEN_TYPE = "ERC20";
class ContractMapper {
    private contract: Contract_Dev;
    _name: String = "";
    _symbol: String = "";
    _isMintage: boolean = false;
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
    setName(name: String): ContractMapper {
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
        return this;
    }
    setSymbol = (symbol: String) => {

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
        return this;
    }

}

export default ContractMapper;