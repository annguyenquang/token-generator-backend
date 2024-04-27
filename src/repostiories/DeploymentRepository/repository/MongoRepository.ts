import DeploymentModel from "../../../models/DeploymentModel";
import IDeploymentRepository from "../IDeploymentRepository";
class MongoRepository implements IDeploymentRepository {
  findByAddress: (address: string) => any = (address: string) => {
    return DeploymentModel.findOne({ owner: address });
  }

  findAll: () => any = () => {
    return DeploymentModel.find();
  }

  save: (owner: string, deployment: any) => any = async (o: string, d: any) => {
    const ownerDeployment = await DeploymentModel.findOne({ owner: o });
    const deployment = {
      owner: o,
      deployment: d
    }
    const deploymentModel = new DeploymentModel(deployment);
    return (await deploymentModel.save());
  }
  findOneAndUpdate: (owner: string, deployment: any) => any = async (o: string, d: any) => {
    return (await DeploymentModel.findOneAndUpdate({ owner: o }, { deployment: d }));
  };


}
export default MongoRepository;