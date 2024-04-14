import e from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import route from './routes/index';
import bodyParser from 'body-parser';
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

route(app);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});

