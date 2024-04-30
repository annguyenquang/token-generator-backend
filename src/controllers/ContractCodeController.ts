import fs from 'fs';
import { exec } from 'child_process';
import { Request, Response } from 'express';
import ERC20Mapper from '../logic/mappers/ERC20Mapper';
import { Contract_Dev } from '../logic/classes/Contract_Dev';

type OptionPair = {
    key: string,
    value: string

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
        //Lưu ý: Cần phải thực thi các giá trị false trước, sau đó mới thực thi các giá trị true
        // bởi vì nếu thực thi các giá trị false sau thì có thể ghi đè lên các giá trị true
        const executeFirst: OptionPair[] = []; // Những giá trị false sẽ được thực thi trước 
        const executeSecond: OptionPair[] = []; // Những giá trị true sẽ được thực thi sau
        // Chuyển đổi object thành mảng các cặp key-value
        const arrayOfOptions: OptionPair[] = Object.keys(options).map((key) => {
            const optionPair: OptionPair = { key: key, value: options[key] };
            return optionPair;
        });
        // Phân loại các giá trị vào executeFirst và executeSecond
        arrayOfOptions.forEach(option => {
            if (!(option.value === "1")) {
                executeFirst.push(option);
            } else {
                executeSecond.push(option);
            }
        });
        // Hàm thực thi các option
        const execute = (option: OptionPair) => {
            switch (option.key) {
                case "ispermit": {
                    contractmapper.setPermit(options['ispermit'] === '1' ? true : false);
                    break;
                }
                case "ispausable": {
                    contractmapper.setIsPausable(options["ispausable"] === '1' ? true : false)
                    break;
                }
                case "isburnable": {
                    contractmapper.setIsBurnable(options["isburnable"] === '1' ? true : false);
                    break;
                }
                case "ismintable": {
                    contractmapper.setIsMintable(options["ismintable"] === '1' ? true : false);
                    break;
                }
                case "isflashmintable": {
                    contractmapper.setIsFlashMintable(options["isflashmintable"] === '1' ? true : false);
                    break;
                }
            }
        }
        // Thực thi các option không phụ thuộc vào thứ tự trước
        contractmapper.setName(options["name"] ?? '');
        contractmapper.setSymbol(options["symbol"] ?? '');
        contractmapper.setPremint(options["premint"] ?? 0);
        options['license'] && contractmapper.setLicense(options['license']);
        // Thực thi các option
        executeFirst.forEach(option => {
            execute(option);
        });
        executeSecond.forEach(option => {
            execute(option);
        });
        console.log("EXECUTE FIRST:", executeFirst);
        console.log("EXECUTE SECOND:", executeSecond);
        return contractmapper.getContract();
    }

}
export default ContractCodeController;