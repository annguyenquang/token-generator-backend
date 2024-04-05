import { Express } from "express";
const tokenRouter = require("./TokenRoutes");

function route(app: Express) {
    app.use("/token", tokenRouter);
}

export default route;