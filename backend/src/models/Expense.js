const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    userId : {type:mongoose.Schema.Types.ObjectId, ref:"User",required:true},
    amount : {type:Number,required:true},
    paymentMethod : {type:String , required:true, enum : ["cash","upi","card"]},
    date : {type:Date,default:Date.now()},
    categories : {
        type:String,required:true,
        enum:[
            "Groceries","Rent","Electricity_Bill",
            "Water_Bill","Internet","School_Fees",
            "Transportation","Medical","EMI",
            "Food","Shopping","Subscription",
            "Savings","Investment","Miscellaneous"
        ]
    },
    note:{type:String}


},{timestamps:true});
module.exports = mongoose.model('Expense',expenseSchema);