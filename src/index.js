const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const route = require('./routes');
const router = express.Router();

const db = require("./config/db");
//connect to db
db.connect();


dotenv.config();
const PORT = process.env.PORT || 3002;

const app = express();
app.use(morgan("combined"));

// app.use(router)

route(app);gi

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});

