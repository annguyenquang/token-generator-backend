import AccessControlState from "../AccessControlState";
import ERC721Mapper from "../../../../mappers/ERC721Mapper";
import AccessControl_Dev from "../../../../enums/AccessControl_Dev";


class AC_NoneState extends AccessControlState {
    constructor(mapper: ERC721Mapper) {
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
        if (isPausable) {
            throw Error("Can not set pausable without access control");
        }
    };
    // setIsFlashMintable = (isFlashMint: boolean) => {
    //     super.setIsFlashMintable(isFlashMint);
    // };
    setIsMintable = (isMintable: boolean) => {
        if (isMintable) {
            throw Error("Can not set mintable without access control");
        }
    };
}
export default AC_NoneState;