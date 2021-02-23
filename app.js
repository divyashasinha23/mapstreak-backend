const express = require("express");
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const colors = require('colors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');



dotenv.config();
connectDB();
var app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());


app.get('/', (req,res) => {
    res.send('server running..');
});

PORT= process.env.PORT;

app.listen(PORT, ()=> console.log(`Server started at ${PORT}`));