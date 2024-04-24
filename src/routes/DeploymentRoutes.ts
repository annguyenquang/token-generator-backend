import { Router } from "express";
import DeploymentController from '../controllers/DeploymentController';

const router = Router();
router.post('/save', DeploymentController.saveDeployment)
router.get('/', DeploymentController.getAllDeployment)

export default router;