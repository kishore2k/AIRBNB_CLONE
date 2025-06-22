import React from 'react';
import "./RegisterPage.css";
import Navbar from "../components/Navbar.js";
import {Link} from "react-router-dom";
import axios from "axios";

export default function RegisterPage(){

    const [name,setName] = React.useState('');
    const [email,setEmail] = React.useState('');
    const [password,setPassword] = React.useState('');

    async function registerUser(ev){
        ev.preventDefault();
        try{
            await axios.post('http://localhost:4000/register',{
            name:name,
            email:email,
            password:password
            });
            alert("Registration is successful, now you can login");
        }
        catch(e)
        {
            alert("Registration Failed, Please enter valid details and register again");
        }
    }


    return (
        <div>
            <Navbar />
            <div className='register-page'>
                <form className='register-form' onSubmit={registerUser}>
                    
                    <div><h1>Register</h1></div>
                    
                    <input type='text' placeholder='Name' 
                        value={name} 
                        onChange={ev=>setName(ev.target.value)}
                    />
                    
                    <input type='email' placeholder='Email ID' 
                        value={email} 
                        onChange={ev=>setEmail(ev.target.value)}
                    />
                    
                    <input type='password' placeholder='Password' 
                        value={password} 
                        onChange={ev=>setPassword(ev.target.value)}
                    />
                    
                    <button>Register</button>
                    
                    <div>
                        <span>Already a member ?</span>
                        <Link to={'/login'}><b style={{color:'black',marginLeft:'5px'}}>Login</b></Link>
                    </div>
                
                </form>
            </div>
        </div>

    );
}