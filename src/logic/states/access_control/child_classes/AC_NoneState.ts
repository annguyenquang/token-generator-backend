import { FunctionBuilder, Function_Dev } from "../../../classes/Function_Dev";
import ModifierCall_Dev from "../../../classes/ModifierCall_Dev";
import { Parameter } from "../../../classes/Parameter";
import State_Dev from "../../../classes/State_Dev";
import AccessControl_Dev from "../../../enums/AccessControl_Dev";
import DataLocation_Dev from "../../../enums/DataLocation_Dev";
import Visibility_Dev from "../../../enums/Visibility_Dev";
import Vote_Dev from "../../../enums/Vote_Dev";
import AccessControlState from "../AccessControlState";
import ERC20Mapper from "../../../mappers/ERC20Mapper";

const TOKEN_TYPE = "ERC20";

class AC_NoneState extends AccessControlState {
    constructor(mapper: ERC20Mapper) {
        super(mapper);
        this._mapper._accessControl = AccessControl_Dev.NONE;
    }
    override setName(name: String) {
        super.setName(name);
    }
    override setLicense(license: String) {
        super.setLicense(license);
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
                if (this._mapper.constructor.name === "AC_NoneState") {
                    console.log("Access control have to be set before mintable")
                    this._mapper.changeAccessControlState(AccessControl_Dev.OWNABLE);
                    return;
                }
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
export default AC_NoneState;