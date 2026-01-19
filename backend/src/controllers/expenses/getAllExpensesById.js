const expenses = require('../../models/Expense');

module.exports = async (req,res,next)=>{
    try{
        const userId = req.user._id;
        const {id}= req.params;
        const i= await expenses.findOne({_id:id,userId});
        if(!i){
            return res.status(404).json({message:'no expenses found'});
        } 
        res.status(200).json(i);

    }
    catch(err){
        next(err);
    }

}