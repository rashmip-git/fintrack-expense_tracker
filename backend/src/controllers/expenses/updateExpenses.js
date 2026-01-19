const expenses = require("../../models/Expense");

module.exports = async (req,res,next)=>{

    try{
        const userId = req.user._id;
        const {id} = req.params;
        const i= await expenses.findByIdAndUpdate({_id:id,userId}, req.body,{new:true});

        if(!i){
            return res.status(404).json({message:"expense not found to update"});

        }

        res.status(200).json({message:"expense updated",expenses:i});

    }
    catch(err){
        next(err);
    }
}