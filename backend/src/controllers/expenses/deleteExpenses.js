const expenses = require("../../models/Expense");

module.exports = async (req,res,next)=>{
    try{
    
    const userId = req.user._id;
    const { id } = req.params;
    const i = await expenses.findByIdAndDelete({_id:id,userId});
    if(!i) {
        return res.status(404).json({message:"expenses not found to delete"});
    }

    res.status(200).json({message:"expense deleted sucessfully",expenses:i});

}
catch(err){
    next(err);
}
}