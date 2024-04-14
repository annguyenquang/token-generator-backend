import { Express } from "express";
import tokenRouter from "./TokenRoutes";
import contractCodeRouter from "./ContractCodeRoutes";
function route(app: Express) {
    app.use("/code", contractCodeRouter);
    app.use("/token", tokenRouter);
}

export default route;