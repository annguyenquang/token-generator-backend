import { Request, Response } from 'express';
import DeploymentModel from '../models/DeploymentModel'
class DeploymentController {
    static getAllDeployment = async (req: Request, res: Response) => {
        res.json(await DeploymentModel.find());
    }
    static saveDeployment = async (req: Request, res: Response) => {
        const ownerDeployment = await DeploymentModel.findOne({ owner: req.body.owner });
        const deployment = {
            owner: req.body.owner,
            deployment: req.body.deployment
        }
        const deploymentModel = new DeploymentModel(deployment);
        //If this owner not have a deployment, create a new one
        if (ownerDeployment == null) {
            res.json(await deploymentModel.save());
        } else {
            //If this owner have a deployment, update it
            res.json(await DeploymentModel.findOneAndUpdate(
                { owner: req.body.owner },
                { deployment: [...ownerDeployment.deployment, ...req.body.deployment] }
            ));

        }
    }
}

export default DeploymentController;