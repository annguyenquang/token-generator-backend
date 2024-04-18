import { NextFunction, Request, Response } from 'express';
import { Contract_DevBuilder } from '../logic/classes/Contract_Dev';
import ContractBody_Dev from '../logic/classes/ContractBody_Dev';
import Constructor_Dev from '../logic/classes/Constructor_Dev';
import ModifierCall_Dev from '../logic/classes/ModifierCall_Dev';
import ContractMapper from '../logic/mappers/ERC20Mapper';
class ContractCodeController {
    static getContractCode(req: Request, res: Response) {
        const contractmapper: ContractMapper = new ContractMapper();
        const query = JSON.parse(JSON.stringify(req.query));
        console.log("QUERY:", query);
        console.log("SYMBOL:", query["symbol"]);
        console.log("PERMIT:", query["permit"]);
        console.log("ISBURNABLE:", query["isbunable"]);
        console.log("ISPAUSABLE:", query["ispausable"]);
        query["name"] && contractmapper.setName(query["name"]);
        query["symbol"] && contractmapper.setSymbol(query["symbol"]);
        query["permit"] && contractmapper.setPermit(query["permit"]);
        query["isburnable"] && contractmapper.setIsBurnable(query["isburnable"] == 1 ? true : false);
        query["ispausable"] && contractmapper.setIsPausable(query["ispausable"] == 1 ? true : false);
        query["ismintable"] && contractmapper.setIsMintable(query["ismintable"] == true ? true : false);
        query["isflashmintable"] && contractmapper.setIsFlashMintable(query["isflashmintable"] == 'true' ? true : false);
        console.log("CONTRACT MAPPER:", contractmapper);

        res.json({
            contract: contractmapper.getContract().toString()
        });

    }
}
export default ContractCodeController;