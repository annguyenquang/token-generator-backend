import fs from 'fs';
import { exec } from 'child_process';
import { Request, Response } from 'express';
import ERC20Mapper from '../logic/mappers/ERC20Mapper';
import { Contract_Dev } from '../logic/classes/Contract_Dev';

type TokenOptions = {
    name: string,
    symbol: string,
    premint: number,
    ispermit: any,
    license: string,
    ispausable: any,
    ismintable: any,
    isburnable: any,
    isflashmintable: any

}
class ContractCodeController {
    static getCompiledCode = async (req: Request, res: Response) => {
        const contractName = req.query.name;
        console.log("CONTRACT NAME:", contractName);
        const contract = this.optionToContract(req.query);
        const basePath = './contracts';

        fs.writeFileSync(`${basePath}/${contractName}.sol`, contract.toString());

        while (!fs.existsSync(`${basePath}/${contractName}.sol`)) {
            setTimeout(() => {
                console.log('waiting for file to be created1');
            }, 2000);
        }
        exec(`npx hardhat compile`, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return res.status(499).send('error occurred during contract deployment');
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
        });

        let interval = setInterval(() => {
            if (fs.existsSync(`artifacts/contracts/${contractName}.sol/${contractName}.json`)) {
                console.log('File has been created ' + contractName);
                fs.readFile(`artifacts/contracts/${contractName}.sol/${contractName}.json`, 'utf8', (err, data) => {
                    if (err) {
                        console.error(`exec error: ${err}`);
                        return res.status(500).send('Error occurred during contract deployment');
                    }
                    res.json(JSON.parse(data));

                    if (fs.existsSync(`${basePath}/${contractName}.sol`)) {
                        fs.rmSync(`${basePath}/${contractName}.sol`, { force: true, recursive: true });
                    }
                    if (fs.existsSync(`artifacts/contracts/${contractName}.sol`)) {
                        fs.rmSync(`artifacts/contracts/${contractName}.sol`, { force: true, recursive: true });
                    }
                });
                clearInterval(interval);
            } else {
                console.log('waiting for file to be created ' + contractName);
            }
        }, 2000);




    }

    static getContractCode = async (req: Request, res: Response) => {
        const contract = this.optionToContract(req.query);
        res.json({
            contract: contract.toString()
        });

    }

    static optionToContract: (options: any) => Contract_Dev = (options: any) => {
        const contractmapper: ERC20Mapper = new ERC20Mapper();
        console.log("query:",);
        console.log("SYMBOL:", options["symbol"]);
        console.log("ISBURNABLE:", options["isburnable"]);
        console.log("ISPAUSABLE:", options["ispausable"]);
        contractmapper.setName(options["name"] ?? '');
        contractmapper.setSymbol(options["symbol"] ?? '');
        contractmapper.setPremint(options["premint"] ?? 0);
        contractmapper.setPermit(options['ispermit'] === '1' ? true : false);
        options['license'] && contractmapper.setLicense(options['license']);
        contractmapper.setIsPausable(options["ispausable"] === '1' ? true : false);
        contractmapper.setIsBurnable(options["isburnable"] === '1' ? true : false);
        contractmapper.setIsMintable(options["ismintable"] === '1' ? true : false);
        contractmapper.setIsFlashMintable(options["isflashmintable"] === '1' ? true : false);
        console.log("CONTRACT MAPPER:", contractmapper);
        return contractmapper.getContract();
    }
}
export default ContractCodeController;