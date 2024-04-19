import { Request, Response } from 'express';
import ERC20Mapper from '../logic/mappers/ERC20Mapper';
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
        query['license'] && contractmapper.setLicense(query['license']);
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