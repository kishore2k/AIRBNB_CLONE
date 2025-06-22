import React from 'react';
import "./HomePage.css";
import Navbar from "../components/Navbar.js";
import axios from 'axios';
import {Link} from "react-router-dom";

export default function HomePage(){

    const [places,setPlaces]=React.useState([]);

    React.useEffect(()=>{
        axios.get("http://localhost:4000/places")
        .then((response)=>{
            console.log(response.data);
            setPlaces(response.data);
        })
        .catch((e)=>{
            alert(e);
        })
    },[]);

    return (
        <div>
            <Navbar />
            {
                places.length===0 ?
                <p style={{margin:'auto'}}>loading...</p>
                :
                <div className='home-place-div'>
                    {places.map((place)=>{
                        return( 
                        <Link to={"/place/"+place._id} className='home-place-card'>
                            <img src={"http://localhost:4000/"+place.photos[0]} alt='Nil'/>
                            <div className='home-card-info'>
                                <h2>{place.address}</h2>
                                <span>{place.title}</span>
                                <h4> ${place.price} per night</h4>
                            </div>
                        </Link>
                    );
                    })}        
                </div>
                
            }
        </div>
    );
}