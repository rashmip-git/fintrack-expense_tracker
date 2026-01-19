const expenses = require('../../models/Expense');

module.exports = async(req,res,next)=>{
    try{
        const { amount, paymentMethod, date, categories, note } = req.body;
        
        const userId = req.user._id;
        const i = await expenses.create({
            amount, 
            paymentMethod,
             date , 
             categories, 
             note, 
             userId ,

        })
      res.status(201).json({message:'Expense added',expenses:i});
    }
    catch(err){
        next(err);
    }
}