const { addIncome, getIncomes, deleteIncomes } = require('../controllers/income');

const router = require('express').Router();

router.get('/', (req, res)=>{
    res.send('Hello World');
})

router.post('/add-income', addIncome).get('/get-incomes', getIncomes).delete('/delete-income/:id', deleteIncomes)

module.exports = router;