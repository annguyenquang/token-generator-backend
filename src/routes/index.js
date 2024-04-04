
const helloRouter = require("./TokenRoutes");

function route(app) {
    app.use("/token", helloRouter);
}

module.exports = route;