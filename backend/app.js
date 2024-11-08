const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT;


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.DATABASE_URL}`);
        console.log(`\n MongoDB connected!!! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log('MONGO connection error:', error);
        process.exit(1);
    }
};

connectDB();

app.get('/', (req, res)=>{
    res.send('<h1>Hello add expense<h1>')
})

app.get('/add-expense', (req,res) =>{
    res.send('Hey expense added');
});

app.listen(port, () =>{
    console.log(`Server is running on port http://localhost:${port}`);
})