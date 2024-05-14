import Constructor_Dev from "../classes/Constructor_Dev";
import ContractBody_Dev from "../classes/ContractBody_Dev";
import { Contract_Dev, Contract_DevBuilder } from "../classes/Contract_Dev";
import { FunctionBuilder, Function_Dev } from "../classes/Function_Dev";
import ModifierCall_Dev from "../classes/ModifierCall_Dev";
import OverriderSpecifier_Dev from "../classes/OverriderSpecifier_Dev";
import { Parameter, ParameterBuilder } from "../classes/Parameter";
import AccessControl_Dev from "../enums/AccessControl_Dev";
import DataLocation_Dev from "../enums/DataLocation_Dev";
import StateMutability from "../enums/StateMutability_Dev";
import Visibility_Dev from "../enums/Visibility_Dev";
import Vote_Dev from "../enums/Vote_Dev";
import ContractMapper from "../interfaces/ContractMapper";
import AccessControlState from "../states/erc721/access_control/AccessControlState";
import AC_ManagedState from "../states/erc721/access_control/child_classes/AC_ManagedState";
import AC_NoneState from "../states/erc721/access_control/child_classes/AC_NoneState";
import AC_OwnableState from "../states/erc721/access_control/child_classes/AC_OwnableState";
import AC_RolesState from "../states/erc721/access_control/child_classes/AC_RolesState";

const TOKEN_TYPE = "ERC721";
const INIT_IMPORT: String = '@openzeppelin/contracts/token/ERC721/ERC721.sol';
const INIT_INHERITANCE: String = 'ERC721';

class ERC721Mapper implements ContractMapper {
    public contract: Contract_Dev;


    _name: String = "";
    _symbol: String = "";
    _baseURI: String = "";
    _isMintable: Boolean = false;
    _isAutoIncrementIds: Boolean = false;
    _isBurnable: Boolean = false;
    _isPausable: Boolean = false;
    _isEnumerable: Boolean = false;
    _isURIStorage: Boolean = false;
    _vote: Vote_Dev = Vote_Dev.NONE;
    _accessControl: AccessControl_Dev = AccessControl_Dev.NONE;
    _accessControlState: AccessControlState = new AC_NoneState(this);
    _tokenInformation: { securiteContact?: String; license: String } = { securiteContact: "", license: "" };

    constructor() {
        this.contract = new Contract_DevBuilder()
            .setImports([INIT_IMPORT])
            .setInheritances([INIT_INHERITANCE])
            .setVersion("^0.8.20")
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
            .build();
    }

    reset() {
        this._name = "";
        this._symbol = "";
        this._baseURI = "";
        this._isMintable = false;
        this._isAutoIncrementIds = false;
        this._isBurnable = false;
        this._isPausable = false;
        this._isEnumerable = false;
        this._isURIStorage = false;
        this._vote = Vote_Dev.NONE;
        this._accessControl = AccessControl_Dev.NONE;
        this._accessControlState = new AC_NoneState(this);
        this._tokenInformation = { securiteContact: "", license: "" };
        this.contract = new Contract_DevBuilder()
            .setImports([INIT_IMPORT])
            .setInheritances([INIT_INHERITANCE])
            .setVersion("^0.8.20")
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
            .build();
    }
    setName(name: String) {
        this._accessControlState.setName(name);
    }
    setSymbol(symbol: String) {
        this._accessControlState.setSymbol(symbol);
    }
    setLicense(license: String) {
        this._accessControlState.setLicense(license);
    }
    setIsPausable(isPausable: boolean) {
        try {
            this._accessControlState.setIsPausable(isPausable);
        } catch (error) {
            console.log(error);
        }
    }
    setBaseURI(baseURI: String) {
        if (baseURI === "" || baseURI === null || baseURI === undefined) {
            return;
        }
        // ADD FUNCTION
        const functName: String = "_baseURI";
        const func: Function_Dev = new FunctionBuilder()
            .setName(functName)
            .setVisibility(Visibility_Dev.INTERNAL)
            .setStateMutability(StateMutability.PURE)
            .setOverrideSpecifier(new OverriderSpecifier_Dev([]))
            .setReturns([new ParameterBuilder().setType("string").setDataLocation(DataLocation_Dev.MEMORY).build()])
            .setFunctionBody([`return "${baseURI}";`])
            .build();
        if (!this.contract.contractBody._functionList.find((f) => f._name === functName)) {
            this.contract.contractBody._functionList.push(func);
        }
        this._baseURI = baseURI;
    }
    setIsBurnable(isBurnable: boolean) {
        this._accessControlState.setIsBurnable(isBurnable);
    }
    setIsMintable(isMintable: boolean) {
        this._accessControlState.setIsMintable(isMintable);
    }
    setVotes(vote: Vote_Dev) {
        this._accessControlState.setVotes(vote);
    }
    setIsAutoIncrementIds(isAutoIncrementIds: boolean) {

    }
    setIsUriStorage(isURIStorage: boolean) {
        this._accessControlState.setIsURIStorage(isURIStorage);
    }
    setIsEnumerable(isEnumerable: boolean) {
        this._accessControlState.setIsEnumerable(isEnumerable);
    }
    changeAccessControlState(state: AccessControl_Dev) {
        switch (state) {
            case AccessControl_Dev.NONE:
                this._accessControlState = new AC_NoneState(this);
                break;
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
            default:
                break;
        }
        this._accessControl = state;
    }
    getContract(): Contract_Dev {
        return this.contract;
    }

}
export default ERC721Mapper;