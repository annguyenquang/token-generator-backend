import { Router } from "express";
import ContractCodeController from '../controllers/ContractCodeController';
import { exec } from "child_process";
import fs from "fs";
const router = Router();
const contractCodeController = new ContractCodeController();
router.get("/get-compiled-code", contractCodeController.getCompiledCode)
router.get('/', contractCodeController.getContractCode);
export default router;