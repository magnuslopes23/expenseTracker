const { addIncome, getIncomes, deleteIncome, updateIncome,  } = require('../controllers/income');
const { addExpense, getExpenses, deleteExpense } = require('../controllers/expense');

const router = require('express').Router();

router.get('/', (req, res)=>{
    res.send('Hello World');
})

router.post('/add-income', addIncome)
    .get('/get-incomes', getIncomes)
    .delete('/delete-income/:id', deleteIncome)
    .post('/add-expense', addExpense)
    .get('/get-expenses', getExpenses)
    .delete('/delete-expense/:id', deleteExpense)
    .put('/update-income/:id', updateIncome)

module.exports = router;