const expenses = require("../../models/Expense");

module.exports = async (req,res,next)=>{
    try{
        const userId = req.user._id;
        const {category,paymentMethod,startDate,endDate} = req.query;

        const filter={userId};

        if(category){
            filter.categories=category;
        } 

        if(paymentMethod){
            filter.paymentMethod=paymentMethod;
        } 

        if(startDate && endDate){
            filter.date={
                $gte:new Date(startDate),
                $lte:new Date(endDate)
            }
        }

        const i= await expenses.find(filter).sort({date:-1});
        return res.status(200).json(i);
    }
    catch(err){
        next(err);
    }
}