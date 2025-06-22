import React from "react";
import "./PlacePage.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { MapPin, Menu,ArrowLeft } from "react-feather";
export default function PlacePage(){

    const {id} = useParams();
    const [showAllPhotos, setShowAllPhotos] = React.useState(false);
    const [place, setPlace] = React.useState(null);
    
    React.useEffect(()=>{
        if(!id) return;
        axios.get("http://localhost:4000/places/"+id).then((response)=>{
            setPlace(response.data);
        })
    },[id]);

    if(showAllPhotos){
        return(
            <div style={{display:"flex",flexDirection:"column",backgroundColor:"black"}} >
                <button onClick={()=>{setShowAllPhotos(false)}}
                    style={{display:"flex",alignItems:"center",borderRadius:0,
                    color:"white",backgroundColor:"black",padding:"3px",opacity:"0.7",right:0,bottom:0,margin:0}}
                >
                    <ArrowLeft />
                    Back to Main Page
                </button>
                {
                    place.photos.length >0 &&
                    place.photos.map((photo)=>{
                        return (
                            <img src={"http://localhost:4000/"+photo} style={{width:"50%",margin:"20px auto 20px"}} alt="NIL"/>
                    )
                    })
                }
            </div>
        );
    }


    return(
        <div>
            <Navbar/>
            {
                (place===null) ? <p>Network error</p>:
                <>
                <div className="place-div">
                    <div>
                        <h2 style={{marginBottom:"5px"}}>{place.title}</h2>
                        <a href={"https://maps.google.com/?q="+place.address}><b style={{display:"flex",alignItems:"center"}}><MapPin size={20}/> {place.address}</b></a>
                    </div>

                    <div className="place-img-div">
                        {
                            place.photos[0] && 
                            <img src={"http://localhost:4000/"+place.photos[0]} style={{gridArea:"a"}} alt="NIL"/>
                        }
                        {
                            place.photos[1] && 
                            <img src={"http://localhost:4000/"+place.photos[1] } style={{gridArea:"b"}} alt="NIL"/>
                        }
                        {
                            place.photos[2] && 
                            <img src={"http://localhost:4000/"+place.photos[2] }  style={{gridArea:"c"}} alt="NIL"/>
                        }

                        <button onClick={()=>{setShowAllPhotos(true)}}
                            style={{position:"absolute",display:"flex",alignItems:"center",borderRadius:0,
                            color:"white",backgroundColor:"black",padding:"3px",opacity:"0.7",right:0,bottom:0,margin:0}} >
                            <Menu/>
                            Show All Photos
                        </button>
                    </div>

                    <div>
                        <h3 style={{marginBottom:0}}>Description</h3>
                        <p style={{marginTop:"3px"}}>{place.description}</p>
                    </div>

                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                        
                        <div>
                            <h4>Check In Time: {place.checkin}</h4>
                            <h4>Check Out Time: {place.checkout}</h4>
                            <h4>Max Guests: {place.guests}</h4>
                        </div>

                        <div className="place-book-card">
                            <h3 style={{margin:"0 0 20px"}}>Price: ${place.price} per night</h3>
                        <div className="place-book-card-date">
                            <div style={{    borderTopLeftRadius: "18px",borderRight:"none"}}>
                            <label>CheckIn Date</label>
                            <input type="date" style={{padding:"3px"}}/>
                            </div>
                            <div style={{    borderTopRightRadius: "18px"}}>
                            <label>CheckOut Date</label>
                            <input type="date" style={{padding:"3px"}}/>
                            </div>
                        </div>
                        <div className="place-book-card-guest">
                            <label>Number of Guests</label>
                            <input type="number" />
                        </div>
                        <button style={{borderRadius:0,color:"white",backgroundColor:"#EF4F4F",margin:0}}>Book Now</button>
                        </div>
                    
                    </div>
                </div>
                <div>
                        <h3 style={{marginBottom:0}}>Extra Info:</h3>
                        <p style={{marginTop:"3px",fontSize:"18px"}}>{place.info}</p>
                </div>
                </>
            }
        </div>
    );
}