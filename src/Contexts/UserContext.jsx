//1 

import { createContext, useState } from "react"

export let UserContext=createContext();


//2 provider 

export default function UserContextProvider({children}){
    let [usertoken,setUserToken]=useState(null);

    return <UserContext.Provider value={{usertoken,setUserToken}}>
        {children}
    </UserContext.Provider>
}