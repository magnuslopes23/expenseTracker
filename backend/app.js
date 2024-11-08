const express = require('express');
const {connectDB} = require('./db/connectDB');

const app = express();
const port = process.env.PORT;


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