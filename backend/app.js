const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res)=>{
    res.send('<h1>Hello add expense<h1>')
})

app.get('/add-expense', (req,res) =>{
    res.send('Hey expense added');
});

app.listen(port, () =>{
    console.log(`Server is running on port http://localhost:${port}`);
})