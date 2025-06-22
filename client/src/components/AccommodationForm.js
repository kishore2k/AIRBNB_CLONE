import React from "react";
import "./AccommodationForm.css";
import {Navigate, useParams} from "react-router-dom";
import {Upload,Trash2,Star} from "react-feather";
import axios from 'axios';

export default function AccommodationForm(){
    const {action} = useParams();

    const allPerks = [{
                    name:"Parking",
                    checked:false
                },
                {
                    name:"Pets Allowed",
                    checked:false
                },
                {
                    name:"Wifi",
                    checked:false
                },
                {
                    name:"Kitchen",
                    checked:false
                },
                {
                    name:"Laundry",
                    checked:false
                },
    ]

    const[title,setTitle]=React.useState('');
    const[address,setAddress]=React.useState('');
    const[description,setDescription]=React.useState('');
    const[info,setInfo]=React.useState('');
    const[photos,setPhotos]=React.useState([]);
    const[perks,setPerks]=React.useState(allPerks);
    const[guests,setGuests]=React.useState(1);
    const[price,setPrice]=React.useState(30);
    const[checkin,setCheckin]=React.useState('');
    const[checkout,setCheckout]=React.useState('');

    const [redirect,setRedirect]= React.useState(false);

    React.useEffect(()=>{
        if(action==='new')
            return;
        else{
            axios.get('http://localhost:4000/places/'+action).then((response)=>{
                const {data} = response;
                setTitle(data.title);
                setAddress(data.address);
                setDescription(data.description);
                setPhotos(data.photos);
                setPerks(data.perks);
                setCheckin(data.checkin);
                setCheckout(data.checkout);
                setGuests(data.guests);
                setPrice(data.price);
                setInfo(data.info);
                console.log(data);
            })
        }
    },[action]);

    function perksHandler(name){
        setPerks((prevPerks)=>{
            return prevPerks.map((perk)=>(perk.name===name?{...perk,checked:!perk.checked}:perk));
        });
        console.log(perks);
    }

    function  uploadPhotos(ev){
        const files = ev.target.files;
        const data = new FormData();
        for(let i=0;i<files.length;i++){
            data.append('photos',files[i]);
        }
        
        axios.post("http://localhost:4000/uploadPhotos",data,{headers:{'Content-type':'multipart/form-data'}})
        .then((response)=>{
            const {data:filenames}=response;
            setPhotos((prev)=>{return [...prev,...filenames];});
        })

    }

    function deletePhoto(photoLink){
        setPhotos((prevPhotos)=>{
            const currPhotos=[];
            for(let i=0;i<prevPhotos.length;i++){
                if(prevPhotos[i]!==photoLink) 
                currPhotos.push(prevPhotos[i]);
            }
            return currPhotos;
        });
    }

    function displayPhoto(photoLink){
        setPhotos((prevPhotos)=>{
            const currPhotos = [photoLink];
            for(let i=0;i<prevPhotos.length;i++){
                if(prevPhotos[i]!==photoLink) 
                currPhotos.push(prevPhotos[i]);
            }
            return currPhotos;
        });
    }

    async function saveAccommodation(ev){
        ev.preventDefault();
        const perksList = [];
        for(let i=0;i<perks.length;i++){
            if(perks[i].checked) perksList.push(perks[i].name);
        }
        const placeData = {title,address,photos,description,
            info, perksList, checkin, checkout, guests, price};
        if(action==='new'){
            await axios.post("http://localhost:4000/accommodations",placeData,{withCredentials:true});
        }else{
            const id = action;
            await axios.put("http://localhost:4000/accommodations",{id,...placeData},{withCredentials:true});
        }
        setRedirect(true);
    }

    if(redirect){
        return <Navigate to={'/account/accommodations'} />
    }
    
    
    return (
                <div>
                    <form className="accomodation-form" onSubmit={saveAccommodation}> 
                        
                        <h2>Title</h2>
                        <input 
                            type="text" 
                            placeholder="Ex: Marvelous Sea View Villa" 
                            value={title} 
                            onChange={(ev)=>{setTitle(ev.target.value)}}
                        />
                        
                        <h2>Address</h2>
                        <input 
                            type="text" 
                            placeholder="Ex: Estate Num, Landmark, area code.." 
                            value={address} 
                            onChange={(ev)=>{setAddress(ev.target.value)}}
                        />
                        
                        <h2>Photos</h2>
                        <label className="photo-upload" >
                            <Upload/>
                            upload
                            <input type='file' 
                                style={{opacity:0, width:'.1px'}}
                                onChange={uploadPhotos} 
                                multiple
                            />
                        </label>
                        <div className="accomodation-image-div">
                        {
                            photos.length>0 &&
                            photos.map((photo)=>{
                                return(
                                        <div style={{position:'relative'}}>
                                            <Star size={25} color="white" onClick={()=>displayPhoto(photo)} className="img-fav"/>
                                            <Trash2  size={25} onClick={()=>deletePhoto(photo)} color="white" className="img-trash"/>
                                            <img src={'http://localhost:4000/'+photo}  alt="NIL"/>
                                        </div>   
                                );
                            })
                        }
                        </div>
                        <h2>Description</h2>
                        <textarea 
                            placeholder="details about your place.."  
                            value={description} 
                            onChange={(ev)=>{setDescription(ev.target.value)}}
                        />
                        
                        <h2>Perks</h2>
                        <p style={{marginTop:0}}>Select the perks available at your place</p>
                        <div className="perks">
                        {perks.map((perk)=>{
                                return(
                                    <div>
                                        <span>{perk.name}</span>
                                        <input type="checkbox" 
                                               onChange={()=>perksHandler(perk.name)}
                                        />
                                    </div>
                                );
                            })}
    
                        </div>

                        <h2>Check in & out times</h2>
                        <p style={{marginTop:0}}>Enter Time in 24hr format</p>
                        <div className="checklist">
                            <div>
                                <span>CheckIn Time</span>
                                <input 
                                    type="text" 
                                    placeholder="Ex: 14:20" 
                                    value={checkin} 
                                    onChange={(ev)=>{setCheckin(ev.target.value)}}
                                />
                            </div>
                            <div>
                                <span>CheckOut Time</span>
                                <input 
                                    type="text" 
                                    placeholder="Ex: 21:30" 
                                    value={checkout} 
                                    onChange={(ev)=>{setCheckout(ev.target.value)}}
                                />
                            </div>
                            <div>
                                <span>Max Guests</span>
                                <input 
                                    type="number" 
                                    value={guests} 
                                    onChange={(ev)=>{setGuests(ev.target.value)}}
                                />
                            </div>
                            <div>
                                <span>Price</span>
                                <input 
                                    type="number" 
                                    value={price} 
                                    onChange={(ev)=>{setPrice(ev.target.value)}}
                                />
                            </div>
                        </div>

                        <h2>Extra Info</h2>
                        <textarea 
                            placeholder="Code of conduct, House rules.." 
                            value={info} 
                            onChange={(ev)=>{setInfo(ev.target.value)}}
                        />

                        <button className="saveAccommodation">Save</button>

                    </form>
                </div>
    );
}