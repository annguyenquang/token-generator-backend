import e from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import route from './routes/index';
import bodyParser from 'body-parser';
import cors from 'cors';
const db = require("./config/db");
//connect to db
db.connect();


dotenv.config();
const PORT = process.env.PORT || 3002;

const app = e();
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(router)
// use cors to allow cross origin resource sharing
app.use(cors());
route(app);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});

