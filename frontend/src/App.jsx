import {useState} from 'react'
import Home from './Pages/Home/Home';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import { AuthContextProvider } from './Context/AuthContext';
import Signup from "./Pages/Signup/Signup";
import Mainpage from './Pages/Mainpage';
import Dashboard from './Pages/Dashboard/Dashboard';
import Analytics from './Pages/Analytics/Analytics';
import Expenses from './Pages/Expenses/Expenses';
import Savings from './Pages/Savings/Savings';
import Investment from './Pages/Investment/Investment';



function App(){
  return(
    <>
    <AuthContextProvider>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/Mainpage" element={<Mainpage/>}>
      <Route index element={<Dashboard/>}/>
      <Route path="Analytics" element={<Analytics/>}/>
      <Route path="Expenses" element={<Expenses/>} />
      
      <Route path="Savings" element={<Savings/>}/>
      <Route path="Investment" element={<Investment/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
    </AuthContextProvider>

    </>
  )
}
export default App
