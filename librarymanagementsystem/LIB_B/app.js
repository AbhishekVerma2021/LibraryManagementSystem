const express = require('express');
// const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

require('./dbConnection/connection');


// app.use(bodyParser.json());If you're using express.json() (which is just a built-in wrapper around body-parser), you don't need to use bodyParser.json() separately. Having both might cause conflicts. Stick with express.json() and express.urlencoded().
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
// app.use(cookieParser());
app.use(cors());


const userRouter = require('./routers/userRouter');
const booksRouter = require('./routers/booksRouter');
app.use("/api", userRouter);
app.use("/api", booksRouter);

const port = 8000;

app.listen(port, () => console.log(`LISNING TO PORT ${port}!!!`));