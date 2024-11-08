const { addIncome } = require('../controllers/income');

const router = require('express').Router();

router.get('/', (req, res)=>{
    res.send('Hello World');
})

router.post('/add-income', addIncome);

module.exports = router;