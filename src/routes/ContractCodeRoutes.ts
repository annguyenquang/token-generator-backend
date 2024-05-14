import { Router } from "express";
import ContractCodeController from '../controllers/ContractCodeController';
import { exec } from "child_process";
import fs from "fs";
const router = Router();
const contractCodeController = new ContractCodeController();
router.get("/get-compiled-code", contractCodeController.getCompiledCode)
router.get("/erc20", contractCodeController.getERC20ContractCode)
router.get("/erc721", contractCodeController.getERC721ContractCode)
export default router;