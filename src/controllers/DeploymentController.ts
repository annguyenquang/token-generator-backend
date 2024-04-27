import { Request, Response } from 'express';
import DeploymentModel from '../models/DeploymentModel';
import IDeploymentRepository from '../repostiories/DeploymentRepository/IDeploymentRepository';

class DeploymentController {
    repository: IDeploymentRepository;

    constructor(repository: IDeploymentRepository) {
        this.repository = repository;
    }

    getAllDeployment = async (req: Request, res: Response) => {
        res.json(await this.repository.findAll());
        // res.json(await DeploymentModel.find());
    }
    getDeploymentByAddress = async (req: Request, res: Response) => {
        const address = req.params["address"];
        const deployment = await this.repository.findByAddress(address);
        res.json(deployment);
    }
    saveDeployment = async (req: Request, res: Response) => {
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
                    res.json(await this.repository.findOneAndUpdate(
                        body.owner,
                        [...ownerDeployment.deployment, ...body.deployment]
                    ));
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }
}

export default DeploymentController;