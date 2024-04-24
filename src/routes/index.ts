import { Express } from "express";
import tokenRouter from "./TokenRoutes";
import contractCodeRouter from "./ContractCodeRoutes";
import deploymentRouter from "./DeploymentRoutes";

function route(app: Express) {
    app.use("/code", contractCodeRouter);
    app.use("/token", tokenRouter);
    app.use("/deployment", deploymentRouter);
}

export default route;