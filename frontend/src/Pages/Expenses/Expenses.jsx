import React, {useContext,useState} from 'react'
import './Expenses.css';
import { ExpenseContext } from '../../Context/ExpenseContext';

const Expenses = () => {

  const [amount,setAmount] = useState("");
  const [category,setCategory] = useState("");
  const [paymentMethod,setPaymentMethod] = useState("");
  const [note,setNote] = useState("");
  const {refboard} = useContext(ExpenseContext);

  const handleAddExpense = async () =>{
    if(!amount || !category || !paymentMethod){
      alert("Please fill the required fields!!");
      return;
    }

  const token = localStorage.getItem("authToken");

  try{
    const res = await fetch("http://localhost:5000/api/expenses",{
      method : "POST",
      headers : {
        "Content-Type": "application/json",
         Authorization : `Bearer ${token}`
      },
      body : JSON.stringify({
        amount : Number(amount),
        categories : category,
        paymentMethod,
        note
      })
    })

    const data = await res.json();
    if(!res.ok){
      alert("cannot add expenses");
      return;
    }
    alert("Expense added successfully");
    refboard();
    setAmount("");
    setCategory("");
    setPaymentMethod("");
    setNote("");
  }
  catch(err){
    alert("Something went wrong!!");
  }
}
  return (
    <>
    <div className="expenses">
      <h1 className='hexp'>Expenses</h1>
      <p className='pexp'>Add and manage your expenses</p>

      <div className="add">
        <p><b>Add New Expenses</b><br></br>
        Fill in the details to track a new expense</p>
        <p><b>Amount:</b></p>
        <input type="number" className='amt' value={amount} onChange={(e)=> setAmount(e.target.value)} placeholder='0'/>

        <p><b>Category:</b></p>
        <select className='catval' value ={category} onChange={(e)=>setCategory(e.target.value)}>
          <option value="Groceries">Groceries</option>
          <option value="Rent">Rent</option>
          <option value="Electricity_bill">Electricity_Bill</option>
          <option value="Water_Bill">Water_Bill</option>
          <option value="School_Fees">School_Fees</option>
          <option value="Transportation">Transportation</option>
          <option value="Medical">Medical</option>
          <option value="EMI">EMI</option>
          <option value="Food">Food</option>
          <option value="Shopping">Shopping</option>
          <option value="Subscription">Subscription</option>
          <option value="Savings">Savings</option>
          <option value="Investment">Investment</option>
          <option value="Miscellaneous">Miscellaneous</option>
        </select>

        <p><b>Payment Method:</b></p>
        <select className='payname' value={paymentMethod} onChange={(e)=> setPaymentMethod(e.target.value)}>
          <option  value="cash">cash</option>
          <option value="upi">upi</option>
          <option  value="card">card</option>
        </select>

        <p><b>Note:</b></p>
        <textarea placeholder='Add a note here!!' className='note' value={note} onChange={(e) => setNote(e.target.value)}></textarea>

        <button className='addexp' onClick={handleAddExpense}>+ Add Expenses</button>
        
      </div>
    </div>
    </>
  )
}

export default Expenses