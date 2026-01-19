import React ,{useState} from 'react'
import "./Navbar.css"
import { Link } from 'react-router-dom';

const Navbar = () => {

  return (
    <>
    <div className="navbar">
        <div className="logo">
            <div className="icon">F</div>
        <h1>FINTRACK</h1>
        </div>
        <div className="infoss">
        <ul className='nav-links'>
            <li><Link to="/Mainpage">DASHBOARD</Link></li>
            <li>< Link to="/Mainpage/Analytics">ANALYTICS</Link></li>
            <li><Link to="/Mainpage/Expenses">EXPENSES</Link></li>
            <li><Link to="/Mainpage/Savings">SAVINGS</Link></li>
            <li><Link to="/Mainpage/Investment">INVESTMENT</Link></li>
        </ul>
        <div className="nav-right">
            <Link to="/">HOME</Link>
        </div>
        </div>

        
    </div>
    <hr/>
    </>
  )
}

export default Navbar