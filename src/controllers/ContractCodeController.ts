import fs from 'fs';
import { exec } from 'child_process';
import { Request, Response } from 'express';
import ERC20Mapper from '../logic/mappers/ERC20Mapper';
import { Contract_Dev } from '../logic/classes/Contract_Dev';
import Vote_Dev from '../logic/enums/Vote_Dev';
import AccessControl_Dev from '../logic/enums/AccessControl_Dev';
import ERC721Mapper from '../logic/mappers/ERC721Mapper';

type OptionPair = {
    key: string,
    value: string
}

class ContractCodeController {
    getCompiledCode = async (req: Request, res: Response) => {
        const contractName = req.query.name;

        const tokenType: String = req.query.tokenType as String;
        const contract: Contract_Dev = tokenType === "ERC20" ? this.optionToERC20Contract(req.query) : this.optionToERC721Contract(req.query);
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

    getERC20ContractCode = async (req: Request, res: Response) => {
        const contract = this.optionToERC20Contract(req.query);
        res.json({
            contract: contract.toString()
        });
    }

    getERC721ContractCode = async (req: Request, res: Response) => {
        const contract = this.optionToERC721Contract(req.query);
        res.json({
            contract: contract.toString()
        });
    }

    optionToERC721Contract = (options: any): Contract_Dev => {
        const contractmapper: ERC721Mapper = new ERC721Mapper();
        contractmapper.reset();
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
                case "isautoincrementids": {
                    const isAutoIncrementIds: boolean = (option.value === '1');
                    if (isAutoIncrementIds) {
                        if (contractmapper._isMintable) {
                            if (contractmapper._accessControlState.constructor.name === "AC_NoneState") {
                                contractmapper.changeAccessControlState(AccessControl_Dev.OWNABLE);
                            }
                            contractmapper.setIsMintable(true);
                        }
                    }
                    contractmapper.setIsAutoIncrementIds(isAutoIncrementIds);
                    break;
                }
                case "isuristorage": {
                    contractmapper.setIsUriStorage(option.value === '1');
                    break;
                }
                case "isenumerable": {
                    contractmapper.setIsEnumerable(option.value === '1');
                    break;
                }
                case "ispausable": {
                    // contractmapper.setIsPausable(options["ispausable"] === '1' ? true : false)
                    contractmapper.setIsPausable(option.value === '1')
                    break;
                }
                case "isburnable": {
                    // contractmapper.setIsBurnable(options["isburnable"] === '1' ? true : false);
                    contractmapper.setIsBurnable(option.value === '1');
                    break;
                }
                case "ismintable": {
                    const isMintable: boolean = (option.value === '1');
                    if (isMintable) {
                        const state = contractmapper._accessControlState.constructor.name;
                        console.log("STATE(CCC)::", state);
                        if (state === "AC_NoneState") {
                            console.log("Access control have to be set before mintable");
                            contractmapper.changeAccessControlState(AccessControl_Dev.OWNABLE);
                            console.log("ac:", contractmapper._accessControl);
                            console.log("acs:", contractmapper._accessControlState.constructor.name);
                        }
                    }
                    // console.log("isMinable::", isMintable);
                    contractmapper.setIsMintable(isMintable);
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
                            break;
                        }
                        default: {
                            vote = Vote_Dev.NONE;
                            break;
                        }
                    }

                    contractmapper.setVotes(vote);
                    break;
                }
            }
        }

        contractmapper.setName(options["name"] ?? '');
        contractmapper.setSymbol(options["symbol"] ?? '');
        contractmapper.setBaseURI(options["baseuri"] ?? '');
        options['license'] && contractmapper.setLicense(options['license']);
        // SET ACCESS CONTROL  
        const ac: AccessControl_Dev = parseInt(options["accesscontrol"]);
        contractmapper.changeAccessControlState(ac);
        executeFirst.forEach(option => {
            execute(option);
        });

        executeSecond.forEach(option => {
            execute(option);
        });
        return contractmapper.getContract();
    }

    optionToERC20Contract = (options: any): Contract_Dev => {
        const contractmapper: ERC20Mapper = new ERC20Mapper();
        contractmapper.contract.importList = ["@openzeppelin/contracts/token/ERC20/ERC20.sol"];
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
                    contractmapper.setIsPermit(option.value === '1');
                    break;
                }
                case "ispausable": {
                    // contractmapper.setIsPausable(options["ispausable"] === '1' ? true : false)
                    contractmapper.setIsPausable(option.value === '1')
                    break;
                }
                case "isburnable": {
                    // contractmapper.setIsBurnable(options["isburnable"] === '1' ? true : false);
                    contractmapper.setIsBurnable(option.value === '1');
                    break;
                }
                case "ismintable": {
                    const isMintable: boolean = (option.value === '1');
                    if (isMintable) {
                        const state = contractmapper._accessControlState.constructor.name;
                        console.log("STATE(CCC)::", state);
                        if (state === "AC_NoneState") {
                            console.log("Access control have to be set before mintable");
                            contractmapper.changeAccessControlState(AccessControl_Dev.OWNABLE);
                            console.log("ac:", contractmapper._accessControl);
                            console.log("acs:", contractmapper._accessControlState.constructor.name);
                        }
                    }
                    // console.log("isMinable::", isMintable);
                    contractmapper.setIsMintable(isMintable);
                    break;
                }
                case "isflashmintable": {
                    // contractmapper.setIsFlashMintable(options["isflashmintable"] === '1' ? true : false);
                    contractmapper.setIsFlashMintable(option.value === '1');
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
                            break;
                        }
                        default: {
                            vote = Vote_Dev.NONE;
                            break;
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
        console.log("option[accesscontrol]::", options["accesscontrol"]);
        // SET ACCESS CONTROL  
        const ac: AccessControl_Dev = parseInt(options["accesscontrol"]);
        contractmapper.changeAccessControlState(ac);
        executeFirst.forEach(option => {
            execute(option);
        });

        executeSecond.forEach(option => {
            execute(option);
        });
        return contractmapper.getContract();
    }
}

export default ContractCodeController;