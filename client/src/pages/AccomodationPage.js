import React from "react";
import "./AccomodationPage.css";
import {Plus} from 'react-feather';
import {Link, useParams} from "react-router-dom";
import AccommodationForm from "../components/AccommodationForm";
import axios from 'axios';

export default function AccomodationPage(){

    const {action} = useParams();
    
    const [places,setPlaces] =React.useState([]);

    React.useEffect(()=>{
        axios.get('http://localhost:4000/user-places')
        .then(({data})=>{
            setPlaces(data);
        })
        .catch((e)=>{
            console.log("failed to list places")});
    },[action]);

    return(
        <div>
            {action===undefined ?
            <>
                <Link to={'/account/accommodations/new'} className="add-place">
                    <Plus color='white' />
                    <div>New Place</div>
                </Link>
                <>
                        {places.length>0 && places.map((place)=>{
                            return( 
                            <Link to={"/account/accommodations/"+place._id} style={{display:"flex",padding:"20px",margin:"30px 0 10px",
                                backgroundColor:"#EEEEEE",borderRadius:"24px", textDecoration:"none", color:"black"}}>
                                <div>
                                    <img src={"http://localhost:4000/"+place.photos[0]} 
                                        alt="" 
                                        style={{width:"10rem",height:"10rem", borderRadius:"18px"}}
                                    />
                                </div>
                                <div style={{paddingLeft:"20px",marginBottom:"10px"}}>
                                    <h2 style={{margin:0}}>{place.title}</h2>
                                    <p>{place.description}</p>
                                </div>
                                
                            </Link>
                        )})
                        }
                </>
            </> : <AccommodationForm />
            }
        </div>
    );
}