import e, { Express, Router } from 'express';
const dotenv = require('dotenv');
const morgan = require('morgan');
import route from './routes/index';
const router = Router();

const db = require("./config/db");
//connect to db
db.connect();


dotenv.config();
const PORT = process.env.PORT || 3002;

const app = e();
app.use(morgan("combined"));

// app.use(router)

route(app);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});

