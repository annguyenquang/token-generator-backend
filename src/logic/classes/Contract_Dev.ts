import { ContractElement } from "../interfaces/ContractElement"
import ContractBody_Dev from "./ContractBody_Dev";
class Contract_Dev extends ContractElement {
    name: String;
    isAbstract: boolean = false;
    inheritances: String[] = [];
    contractBody: ContractBody_Dev;
    constructor(_name: String, _contractBody: ContractBody_Dev, _isAbstract?: boolean, _inheritances?: String[]) {
        super();
        this.name = _name;
        this.contractBody = _contractBody;
        if (_isAbstract) { this.isAbstract = _isAbstract; }
        if (_inheritances) { this.inheritances = _inheritances; }

    }
    toString: Function = () => {

    }
}

export default Contract_Dev;