const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    owner:{type: mongoose.Schema.Types.ObjectId, ref:'user'},
    title: String,
    address: String,
    photos: [String],
    description: String,
    perks:[String],
    checkin: String,
    checkout: String,
    guests: Number,
    info: String,
    price:Number

}); 

const PlaceModel = mongoose.model('Place',placeSchema);

module.exports = PlaceModel;