import { Router } from "express";
import ContractCodeController from '../controllers/ContractCodeController';
import { exec } from "child_process";
import fs from "fs";
const router = Router();

router.use('/code-from-import', async (req, res, next) => {
    const expectRes: string =
        `//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
contract Antrium is ERC20{
constructor() ERC20("Antrium", ""){
_mint(msg.sender, 99 * 10 ** decimals());
}
}`;
    const basePath = './contracts/';
    await fs.writeFileSync(`${basePath}test.sol`, expectRes);
    while (!fs.existsSync(`${basePath}test.sol`)) {
        console.log('waiting for file to be created');
    }
    await exec(`npx hardhat compile`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(499).send('error occurred during contract deployment');
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
    });
    let abi = '';
    let bytecode = '';
    while (!fs.existsSync(`artifacts/contracts/test.sol/Antrium.json`)) {
        console.log('waiting for file to be created');
    }
    await fs.readFile(`artifacts/contracts/test.sol/Antrium.json`, 'utf8', (err, data) => {
        if (err) {
            console.error(`exec error: ${err}`);
            return res.status(500).send('Error occurred during contract deployment');
        }
        res.json(JSON.parse(data));

        if (fs.existsSync(`${basePath}test.sol`)) {
            fs.rmSync(`${basePath}test.sol`, { force: true, recursive: true });
        }
        if (fs.existsSync(`artifacts/contracts/test.sol`)) {
            fs.rmSync(`artifacts/contracts/test.sol`, { force: true, recursive: true });
        }
    });

});
router.use('/', ContractCodeController.getContractCode);
export default router;