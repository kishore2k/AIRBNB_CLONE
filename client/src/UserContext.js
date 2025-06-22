import {createContext } from "react";
import React from 'react';
import axios from 'axios';

export const UserContext = createContext({});

export function UserContextProvider({children}){

    const [user,setUser] = React.useState(null);
    const [ready,setReady] = React.useState(false);

    React.useEffect(()=>{
        if(!user){
            axios.get("http://localhost:4000/profile", {withCredentials:true})
            .then(({data})=>{
                setUser(data);
                setReady(true);
            });
        }
    },[]);

    return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
}