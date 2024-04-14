import { Router } from "express";
import ContractCodeController from '../controllers/ContractCodeController';
const router = Router();

router.use('/', ContractCodeController.getContractCode);
export default router;