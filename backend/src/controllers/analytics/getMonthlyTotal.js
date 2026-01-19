const expense = require("../../models/Expense");

module.exports = async (req,res,next)=>{
    try{
        const userId = req.user._id;

        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0,0,0,0);

        const summary = await expense.aggregate([
            {
                $match : {
                    userId,
                    date : {$gte :startOfMonth}
                }
            },

            {
                $facet : {
                    categoryWise : [
                        {
                            $group:{
                                _id:"$categories",
                                total:{$sum : "$amount"}
                            }
                        },
                        {
                            $sort: {
                                total:-1
                            }
                        }
                    ],

                    paymentWise : [
                        {
                            $group: {
                                _id :"$paymentMethod",
                                total : {
                                    $sum : "$amount"
                                }
                            }
                        },

                    ],

                    overAll :[
                        {
                            $group : {
                                _id: null,
                                totalExpenses :{
                                    $sum : "$amount"
                                }

                            }
                        }
                    ]

                    
                }
            }


        ])

        res.status(200).json({
      month: startOfMonth.toLocaleString("default", { month: "long" }),
      categoryWise: summary[0]?.categoryWise || [],
      paymentWise: summary[0]?.paymentWise || [],
      totalExpenses: summary[0]?.overAll[0]?.totalExpenses || 0
    });


    }
    catch(err){
        next(err);
    }
}