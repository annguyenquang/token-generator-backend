import { Router } from "express";
import DeploymentController from '../controllers/DeploymentController';
import MonggoRepository from '../repostiories/DeploymentRepository/repository/MongoRepository';

const router = Router();
const deploymentController = new DeploymentController(
    new MonggoRepository()
);
router.post('/save', deploymentController.saveDeployment)
router.get('/:address', deploymentController.getDeploymentByAddress)
router.get('/', deploymentController.getAllDeployment)

export default router;