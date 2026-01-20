import React, { createContext, useState} from "react";

export const ExpenseContext = createContext();

export const ExpenseContextProvider = ({children}) =>{
    const [refresh,setRefresh] = useState(0);

    const refboard = () =>{
        setRefresh((p) => p+1);
    }

    return(
        <ExpenseContext.Provider value={{ refresh, refboard }}>
      {children}
    </ExpenseContext.Provider>
    )

}

