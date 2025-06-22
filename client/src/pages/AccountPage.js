import React, { useContext } from  "react";
import Navbar from "../components/Navbar";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import './AccountPage.css'
import axios from "axios";
import AccomodationPage from "./AccomodationPage";

export default function AccountPage(){
    
    const {user,ready,setUser} = useContext(UserContext);
    const [loggedOut,setLoggedOut]= React.useState(false);

    const {subpage} = useParams();

    function selectLink(type=undefined)
    {
        if(type===subpage) return {color:'white',backgroundColor:'#EF4F4F'}
    }

    async function logout(){
       await axios.post("http://localhost:4000/logout");
       setUser(null); 
       setLoggedOut(true);
    }

    if(loggedOut===true)
        return <Navigate to={'/'}/>;
    
    if(ready && !user){
        return <Navigate to={'/login'}/>
    }
   
    return(
        
        <div>
            {user?
            <>
            <Navbar />
            <div className="account-page">
                <Link style={selectLink()} to={'/account'} className="account-page-links">My Profile</Link>
                <Link style={selectLink('accommodations')} to={'/account/accommodations'} className="account-page-links" >My Accomodations</Link>                
                <Link style={selectLink('bookings')} to={'/account/bookings'} className="account-page-links" >My Bookings</Link>
            </div>
            {subpage===undefined && 
                <div className="profile-page">
                    <div>Name  : {user.name}</div>
                    <div>Email : {user.email}</div>
                    <button onClick={logout}> Logout</button>
                </div>
            }
            {subpage==='accommodations' && 
                <AccomodationPage />
            } 
            </>
            :
            <>
                <Navbar />
                <h1>Loading...</h1>
            </>
            }
        </div>
    );
}