const express = require('express');
const {connectDB} = require('./db/connectDB');
const {readdirSync} = require('fs');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

//middleware to use json and cors.
app.use(express.json());
app.use(cors());

//routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)));
connectDB();
app.listen(port, () =>{
    console.log(`Server is running on port http://localhost:${port}`);
})