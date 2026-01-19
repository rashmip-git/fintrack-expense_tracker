const express = require('express');
const router = express.Router();
const {protect}= require('../middleware/auth');
const expenseCtrl = require('../controllers/expenses'); 
router.use(protect);


// ---------- PUBLIC ----------
router.get('/', expenseCtrl.getAllExpenses);         
router.get('/filter',expenseCtrl.filterExpenses);
router.get('/:id',  expenseCtrl.getAllExpensesById);

router.post('/',expenseCtrl.addExpenses);

router.delete('/:id',expenseCtrl.deleteExpenses);
router.patch('/:id',expenseCtrl.updateExpenses);


module.exports = router;
