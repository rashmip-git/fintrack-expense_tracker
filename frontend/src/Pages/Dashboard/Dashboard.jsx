import React,{useEffect,useState} from 'react'
import "./Dashboard.css"
import {PieChart,Pie,Cell,Tooltip,
        LineChart,Line,XAxis,YAxis,CartesianGrid,ResponsiveContainer} from "recharts"; 
//PieChart → chart container ..Pie → actual pie slices..Cell → color for each slice..Tooltip → hover box

const COLORS = ["#77c2f1ff","#18142bff","#6b56d3ff", "#44bb40ff", "#fd7ca9ff", "#036774ff", "#e8e41bff", "#FB8C00"];
const monthNames = [
  "Jan","Feb","Mar","Apr","May","Jun",
  "Jul","Aug","Sep","Oct","Nov","Dec"
];

//active → true when hovering....payload → data of hovered slice
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0];
    return (
      <div
        style={{
          background: "#fff",
          padding: "8px 12px",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
          fontSize: "14px"
        }}>
        <b>{name}</b> : ₹{value}
      </div>
    );
  }
  return null;
};

const LineCustomTooltip = ({active,payload,label})=>{
  if(active && payload && payload.length){
    const {value} = payload[0];
    return (
      <div 
      style={{
        background: "#fff",
          padding: "8px 12px",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
          fontSize: "14px"
      }}>
        <p><b>{label}</b></p>
        <p>amount:₹{value}</p>
      </div>
    )

  }
  return null;
}


const Dashboard = () => {
  const [totalExpenses,setTotalExpenses] = useState(0);
    const [categoryData, setCategoryData] = useState([]);
  const [paymentData, setPaymentData] = useState([]);
  const [trendData,setTrendData] = useState([]);

  useEffect(()=>{
    const fetchSummary = async()=>{
      try{
        const token = localStorage.getItem("authToken");

        const res = await fetch("http://localhost:5000/api/analytics/monthlytotal",{
          headers:{
          Authorization : `Bearer ${token}`
          }
        })
        const data = await res.json();
        setTotalExpenses(data.totalExpenses);



        setCategoryData(
          data.categoryWise.map(item => ({
            name: item._id,
            value: item.total
          }))
        );



        setPaymentData(
          data.paymentWise.map(item => ({
            name: item._id,
            value: item.total
          }))
        );


        const trendRes = await fetch("http://localhost:5000/api/analytics/monthlytrend", {
          headers:{
          Authorization : `Bearer ${token}`
          }
        }
      );
        const trendJson = await trendRes.json();

         const formattedTrend = trendJson.map((item) => ({
          month: monthNames[item.month - 1],
          amount: item.total,
        }));

        setTrendData(formattedTrend);
      }

      catch(err){
        console.log("failed to fetch monthly expenses");
      }
    }
    fetchSummary();

  },[]);

  const totalCategoryValue = categoryData.reduce(
    (sum,item)=> sum+item.value,0
  );

  const totalPaymentValue = paymentData.reduce(
    (sum,item)=> sum+item.value,0
  )

  return (
    <>
    
    <div className="dashboard-heading">
      <h1>Dashboard</h1>
      <p>Track your spending and manage your finances</p>
    </div>
    <div className="threedivs">
      <div className="div1"><p className='head'>TOTAL EXPENSES THIS MONTH</p>
      <p className='tail'>{`₹${totalExpenses}`}</p>
      </div>
      <div className="div1"><p className='head'>TOTAL SAVINGS</p>
      <p className='tail'> ₹10000</p>
      </div>
      <div className="div1"><p className='head'>TOTAL INVESTMENT</p>
      <p className='tail'> ₹82000</p>
      </div>

    </div>







    {/*PIE CHARTS*/}
    <div className="pie">
      <div className="pie1"><p className='line'>Category-wise Expenses</p>
      <p>Breakdown by spending category</p>

      <div className="draw1">
       {categoryData.length > 0 && (
            <PieChart width={550} height={250}>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={110}
              >
                {categoryData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          )}


          <div className="calc">
      {categoryData.map((item, index) => {
  const perc = ((item.value / totalCategoryValue) * 100).toFixed(0);

  return (
    <div key={index} className="calc-item">

      <span className='clrbox'
        style={{
          backgroundColor:COLORS[index%COLORS.length]
        }}>
      </span>
      <span>
      {item.name} : {perc}%
      </span>
    </div>
  );
})}

      </div>
    </div>
      </div>
    
      <div className="pie2"><p className='line'>Payment Method-wise</p>
      <p>Breakdown by payment method</p>

      <div className="draw2">
      {paymentData.length > 0 && (
            <PieChart width={550} height={250}>
              <Pie
                data={paymentData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={110}
              >
                {paymentData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          )}


          <div className="calc">
      {paymentData.map((item, index) => {
  const perc2 = ((item.value / totalPaymentValue) * 100).toFixed(0);

  return (
    <div key={index} className="calc-item">
      
      <span className='clrbox'
        style={{
          backgroundColor:COLORS[index%COLORS.length]
        }}>
      </span>
      <span className>
      {item.name} : {perc2}%
      </span>
    </div>
  );
})}

      </div>
      </div>
      </div>


    </div>
   






{/*graphs*/}
<div
        style={{
          marginTop: "80px",
          background: "#fff",
          padding: "30px",
          borderRadius: "20px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          width: "90%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <h2>Monthly Expense Trend</h2>
        <p style={{ color: "#666", marginBottom: "20px" }}>
          Last 6 months spending pattern
        </p>

        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip content={<LineCustomTooltip />} />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#0b57d0"
              strokeWidth={3}
              dot={{ r: 6 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      </>

  );
};



export default Dashboard;