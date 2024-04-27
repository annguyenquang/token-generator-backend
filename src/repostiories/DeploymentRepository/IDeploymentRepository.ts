interface IDeploymentRepository {
    findAll: () => any;
    findByAddress: (address: string) => any;
    save: (owner: string, deployment: any, network: any) => any;
    findOneAndUpdate: (owner: string, deployment: any) => any;
}

export default IDeploymentRepository;