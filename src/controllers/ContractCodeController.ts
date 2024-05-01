import fs from 'fs';
import { exec } from 'child_process';
import { Request, Response } from 'express';
import ERC20Mapper from '../logic/mappers/ERC20Mapper';
import { Contract_Dev } from '../logic/classes/Contract_Dev';
import Vote_Dev from '../logic/enums/Vote_Dev';
import AccessControl_Dev from '../logic/enums/AccessControl_Dev';
const solc = require('solc');

type OptionPair = {
    key: string,
    value: string
}

class ContractCodeController {
    static getCompiledCode = async (req: Request, res: Response) => {
        const contractName = req.query.name;
        console.log("CONTRACT NAME:", contractName);
        const contract = this.optionToContract(req.query);
        const contractPath = `./contracts/${contractName}.sol`;
        const outputPath = `./artifacts/contracts/${contractName}.sol`;

        fs.writeFileSync(contractPath, contract.toString());

        while (!fs.existsSync(`${contractPath}`)) {
            setTimeout(() => {
                console.log('waiting for file to be created1');
            }, 2000);
        }

        exec(`npx solc --bin --abi --include-path ./node_modules --base-path . ${contractPath} -o ./artifacts/contracts/${contractName}.sol`, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return res.status(499).send('error occurred during contract deployment');
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
        });

        let interval = setInterval(() => {
            if (fs.existsSync(outputPath)) {
                console.log('File has been created ' + contractName);
                fs.readFile(`${outputPath}/contracts_${contractName}_sol_${contractName}.abi`, 'utf8', (err, data) => {
                    if (err) {
                        console.error(`exec error: ${err}`);
                        return res.status(500).send('Error occurred during contract deployment');
                    }
                    const abi = JSON.parse(data);

                    fs.readFile(`${outputPath}/contracts_${contractName}_sol_${contractName}.bin`, 'utf8', (err, data) => {
                        if (err) {
                            console.error(`exec error: ${err}`);
                            return res.status(500).send('Error occurred during contract deployment');
                        }
                        const byteCode = data;

                        const compiledCode = { abi: abi, bytecode: byteCode };
                        res.json(compiledCode);

                        if (fs.existsSync(contractPath)) {
                            fs.rmSync(contractPath, { force: true, recursive: true });
                        }
                        if (fs.existsSync(outputPath)) {
                            fs.rmSync(outputPath, { force: true, recursive: true });
                        }
                    });
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

    static optionToContract = (options: any): Contract_Dev => {
        const contractmapper: ERC20Mapper = new ERC20Mapper();
        const executeFirst: OptionPair[] = [];
        const executeSecond: OptionPair[] = [];
        const arrayOfOptions: OptionPair[] = Object.keys(options).map((key) => {
            const optionPair: OptionPair = { key: key, value: options[key] };
            return optionPair;
        });

        arrayOfOptions.forEach(option => {
            if (!(option.value === "1" || option.value === "2" || option.value === "3")) {
                executeFirst.push(option);
            } else {
                executeSecond.push(option);
            }
        });

        const execute = (option: OptionPair) => {
            switch (option.key) {
                case "ispermit": {
                    // contractmapper.setIsPermit(options['ispermit'] === '1' ? true : false);
                    contractmapper.setIsPermit(option.value === '1' ? true : false);
                    break;
                }
                case "ispausable": {
                    // contractmapper.setIsPausable(options["ispausable"] === '1' ? true : false)
                    contractmapper.setIsPausable(option.value === '1' ? true : false)
                    break;
                }
                case "isburnable": {
                    // contractmapper.setIsBurnable(options["isburnable"] === '1' ? true : false);
                    contractmapper.setIsBurnable(option.value === '1' ? true : false);
                    break;
                }
                case "ismintable": {
                    // contractmapper.setIsMintable(options["ismintable"] === '1' ? true : false);
                    contractmapper.setIsMintable(option.value === '1' ? true : false);
                    break;
                }
                case "isflashmintable": {
                    // contractmapper.setIsFlashMintable(options["isflashmintable"] === '1' ? true : false);
                    contractmapper.setIsFlashMintable(options.value === '1' ? true : false);
                    break;
                }
                case "accesscontrol": {
                    let ac: AccessControl_Dev;
                    switch (option.value) {
                        case "0": {
                            ac = AccessControl_Dev.NONE;
                            break;
                        }
                        case "1": {
                            ac = AccessControl_Dev.OWNABLE;
                            break;
                        }
                        case "2": {
                            ac = AccessControl_Dev.ROLES;
                            break;
                        }
                        case "3": {
                            ac = AccessControl_Dev.MANAGED;
                            break;
                        }
                        default: {
                            ac = AccessControl_Dev.NONE;
                        }
                    }
                    contractmapper.setAccessControl(ac);
                    break;
                }
                case "votes": {
                    let vote: Vote_Dev;
                    switch (option.value) {
                        case "0": {
                            vote = Vote_Dev.NONE;
                            break;
                        }
                        case "1": {
                            vote = Vote_Dev.BLOCK_NUMBER;
                            break;
                        }
                        case "2": {
                            vote = Vote_Dev.TIMESTAMP;
                            break
                        }
                        default: {
                            vote = Vote_Dev.NONE;
                        }
                    }

                    contractmapper.setVotes(vote);
                    break;
                }
            }
        }

        contractmapper.setName(options["name"] ?? '');
        contractmapper.setSymbol(options["symbol"] ?? '');
        contractmapper.setPremint(options["premint"] ?? 0);

        options['license'] && contractmapper.setLicense(options['license']);

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