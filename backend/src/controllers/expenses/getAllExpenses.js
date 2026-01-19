const expenses = require("../../models/Expense");

module.exports = async (req,res,next)=>{
    try{
        const userId = req.user._id;
        const i = await expenses.find({userId}).sort({date:-1});

        res.status(200).json(i);
    }
    catch(err){
        next(err);
}
}