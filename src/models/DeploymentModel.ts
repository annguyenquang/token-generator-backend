import mongoose from "mongoose";
import DeploymentSchema from "../schema/DeploymentSchema";

export default mongoose.model('Deployment', DeploymentSchema);
