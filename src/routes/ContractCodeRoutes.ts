import { Router } from "express";
import ContractCodeController from '../controllers/ContractCodeController';
import { exec } from "child_process";
import fs from "fs";
const router = Router();
router.get("/get-compiled-code", ContractCodeController.getCompiledCode)
router.get('/', ContractCodeController.getContractCode);
export default router;