import { Request, Response } from 'express';
import DeploymentModel from '../models/DeploymentModel'
class DeploymentController {
    static getAllDeployment = async (req: Request, res: Response) => {
        res.json(await DeploymentModel.find());
    }
    static saveDeployment = async (req: Request, res: Response) => {
        const body = req.body;
        // console.log("body:", body);
        const ownerDeployment = await DeploymentModel.findOne({ owner: body.owner });
        const deployment = {
            owner: body.owner,
            deployment: body.deployment
        }
        // console.log("deployment:", body.deployment);
        const deploymentModel = new DeploymentModel(deployment);
        //If this owner not have a deployment, create a new one

        if (ownerDeployment == null) {
            res.json(await deploymentModel.save());
        } else {
            //If this owner have a deployment, update it
            if (Array.isArray(body.deployment)) {
                try {
                    res.json(await DeploymentModel.findOneAndUpdate(
                        { owner: body.owner },
                        { deployment: [...ownerDeployment.deployment, ...body.deployment] }
                    ));
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }
}

export default DeploymentController;