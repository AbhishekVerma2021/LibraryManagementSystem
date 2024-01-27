const express = require('express');
// const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

require('./dbConnection/connection');


app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(cors());


const userRouter = require('./routers/userRouter');
app.use("/api", userRouter);

const port = 6000;

app.listen(port, () => console.log(`LISNING TO PORT ${port}!!!`));