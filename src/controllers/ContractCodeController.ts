import { NextFunction, Request, Response } from 'express';
import { Contract_DevBuilder } from '../logic/classes/Contract_Dev';
import ContractBody_Dev from '../logic/classes/ContractBody_Dev';
import Constructor_Dev from '../logic/classes/Constructor_Dev';
import ModifierCall_Dev from '../logic/classes/ModifierCall_Dev';
import ERC20Mapper from '../logic/mappers/ERC20Mapper';
import ContractMapper from '../logic/interfaces/ContractMapper';
class ContractCodeController {
    static getContractCode = async (req: Request, res: Response) => {
        const contractmapper: ERC20Mapper = new ERC20Mapper();
        const query = JSON.parse(JSON.stringify(req.query));
        console.log("QUERY:", query);
        console.log("SYMBOL:", query["symbol"]);
        console.log("PERMIT:", query["permit"]);
        console.log("ISBURNABLE:", query["isbunable"]);
        console.log("ISPAUSABLE:", query["ispausable"]);
        contractmapper.setName(query["name"] ?? '');
        contractmapper.setSymbol(query["symbol"] ?? '');
        contractmapper.setPremint(query["permit"] ?? 0);
        contractmapper.setPermit(query['ispermit'] === '1' ? true : false);
        contractmapper.setIsPausable(query["ispausable"] === '1' ? true : false);
        contractmapper.setIsBurnable(query["isburnable"] === '1' ? true : false);
        contractmapper.setIsMintable(query["ismintable"] === '1' ? true : false);
        contractmapper.setIsFlashMintable(query["isflashmintable"] === '1' ? true : false);
        console.log("CONTRACT MAPPER:", contractmapper);

        res.json({
            contract: contractmapper.getContract().toString()
        });

    }
}
export default ContractCodeController;