import React, { useContext } from 'react';
import "./LoginPage.css";
import Navbar from "../components/Navbar.js";
import {Link, Navigate} from "react-router-dom";
import axios from 'axios';
import { UserContext } from '../UserContext.js';

export default function LoginPage(){
    const [email,setEmail] = React.useState('');
    const [password,setPassword] = React.useState(''); 
    const [redirect,setRedirect]=React.useState(false);

    const {setUser} = useContext(UserContext);

    async function loginUser(ev){
        ev.preventDefault();
        try{
            
            const {data} = await axios.post("http://localhost:4000/login",{
                email:email,
                password:password
            },{withCredentials:true});
            setUser(data);
            alert("Login successful");
            setRedirect(true);
        }catch(e){
            console.log(e);
            alert("Login Failed, Try again later.")
        }
    }
    
    if(redirect){
        return <Navigate to={'/'} />
    }
    
    return (
        <div>
            <Navbar />
            <div className='login-page'>
                <form className='login-form' onSubmit={loginUser}>
                    <div><h1>Login</h1></div>
                    <input type='email' placeholder='Email ID'
                        value={email}
                        onChange={ev=>setEmail(ev.target.value)}
                    />
                    <input type='password' placeholder='Password'
                        value={password}
                        onChange={ev=>setPassword(ev.target.value)}
                    />
                    <button>Login</button>
                    <div>
                        <span>Not a member yet ?</span>
                        <Link to={'/register'}><b style={{color:'black',marginLeft:'5px'}}>Register</b></Link>
                    </div>
                </form>
            </div>
        </div>

    );
}