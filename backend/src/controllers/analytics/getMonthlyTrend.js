const expense = require("../../models/Expense");

module.exports = async (req,res,next)=>{
    try{
        const userId = req.user._id;

        const sixMonthAgo = new Date();
        sixMonthAgo.setMonth(sixMonthAgo.getMonth() - 5);
        sixMonthAgo.setDate(1);
        sixMonthAgo.setHours(0,0,0,0);

       const trend = await expense.aggregate([
      {
        $match: {
          userId,
          date: { $gte: sixMonthAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" }
          },
          total: { $sum: "$amount" }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    const formatted = trend.map(i=>({
        year : i._id.year,
        month : i._id.month,
        total : i.total
    }));

    res.status(200).json(formatted);

    }
    catch(err){
        next(err);

    }
}
