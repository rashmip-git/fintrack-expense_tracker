import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import Mainpage from "../Mainpage";
import "./Home.css"

const Home = () => {
    const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

    const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate("/Mainpage");
    } else {
      navigate("/signup");
    }
  };

  return (
    <>
    <div className="mainheading">
        <div className="heading">TRACK EVERY EXPENSES.<br/>
            <span>UNDERSTAND</span> YOUR MONEY.
        </div>
        <div className="para">Take controll of your personal finances with intelligent <br/>
            expense tracking,visual insights and real time analytics</div>
        
    </div>
    <div className="entrybtns">
        <button className='signup' onClick={() => navigate("/Signup")}>Signup</button>
        <button className='Dashboard' onClick={handleGetStarted}>Dashboard</button>
    </div>
    <div className="infodivs">
        <div className="monthlybudget">monthly budget</div>
        <div className="categ">categories</div>
        <div className="stat">v/s last month</div>
        <div className="transactions">transactions</div>
    </div>

    
    </>
  )
}

export default Home