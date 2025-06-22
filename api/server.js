const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const User = require('./models/User.js');
const Place = require('./models/Place.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const fs = require('fs')

dotenv.config();

const app = express();

const bcryptSalt = bcrypt.genSaltSync(12);
const jwtSecret = "ex4d9v8t5jvr13f6j";

app.use(express.json());
app.use(cookieParser());  
app.use(cors({
    credentials:true,
    origin:"http://localhost:3000",
}));
app.use('/uploads',express.static(__dirname+'/uploads'));

mongoose.connect(process.env.MONGO_URL);

app.get("/",(req,res)=>{
    res.send("server is working");
});

app.post("/register",async (req,res)=>{
    const {name,email,password} = req.body;
    try{
        const userDoc = await User.create({
            name,
            email,
            password:bcrypt.hashSync(password,bcryptSalt)
        });
        res.json(userDoc);
    }
    catch(e){
        res.status(422).send("registration failed");
    }

});

app.post("/login", async (req,res)=>{
    const {email,password} = req.body;
    const userDoc = await User.findOne({email});
    if(userDoc){
        const passOk = bcrypt.compareSync(password,userDoc.password);
        if(passOk){
            jwt.sign({
                email:userDoc.email,
                id:userDoc._id,
                name:userDoc.name
                },
                jwtSecret,{},(err,token)=>{
                if(err) throw(err);
                res.cookie('token',token).json(userDoc);
            });
        }else{
            res.status(422).send("Incorrect Password.");
        }
    }
    else{
        res.status(422).send("Email not found.");
    }
});

app.get("/profile",(req,res)=>{
    const {token} = req.cookies;
    if(token){
        jwt.verify(token,jwtSecret,(err,userData)=>{
            if(err) throw err;
            res.json(userData);
        });
    }else{
        res.json(null);
    }
    
});

app.post("/logout",(req,res)=>{
    res.cookie('token','').json("Logged out");
});

const photosMiddleware = multer({dest:'uploads/'});

app.post("/uploadPhotos",photosMiddleware.array('photos',100),(req,res)=>{
    const uploadedFiles = [];
    for(let i=0;i<req.files.length;i++){
        const {path, originalname} = req.files[i];
        const parts = originalname.split('.');
        const newPath = path+"."+parts[parts.length-1];
        fs.renameSync(path,newPath);
        uploadedFiles.push(newPath);
    }
    res.json(uploadedFiles);
});

app.post('/accommodations',(req,res)=>{
    const {token} = req.cookies;
    const {title,address,description,info, photos, perks, checkin, checkout, guests,price} = req.body;
    jwt.verify(token,jwtSecret,async (err,userData)=>{
        if(err) throw err;
        const placeDoc = await Place.create({owner:userData.id ,title,address,photos,description,perks,
            checkin, checkout, guests,info,price});
        res.json(placeDoc);
    });
});

app.put("/accommodations",(req,res)=>{
    const {token} = req.cookies;
    if(token){
        jwt.verify(token,jwtSecret,async (err,userData)=>{
            if(err) throw err;
            const {id,title,address,description,info, photos, perks, checkin, checkout, guests, price} = req.body;
            const placeDoc = await Place.findById(id);
        
            if(userData.id === placeDoc.owner.toString()){
                placeDoc.set({title,address,photos,description,perks,
                checkin, checkout, guests,info, price});
                await placeDoc.save();
                res.json("Updated Successfully.");
            }
        });
    }else{
        res.json("Token Expired");
    }
});

app.get('/user-places',(req,res)=>{
    const {token} = req.cookies;
    jwt.verify(token,jwtSecret,async (err,userData)=>{
        if(err) throw err;
        const {id} = userData;
        res.json(await Place.find({owner:id}) );
    });
});

app.get('/places/:id',async (req,res)=>{
    const {id} = req.params;
    res.json(await Place.findById(id));
});

app.get("/places",async (req,res)=>{
    res.json(await Place.find());
});

app.listen(4000,()=>{console.log("Listening on port 4000")});