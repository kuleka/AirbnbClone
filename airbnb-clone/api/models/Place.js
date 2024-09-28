const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const PlacesSchema = new mongoose.Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    title: String,
    address: String,
    photo: [String],
    description: String,
    perks: [String],
    extraInfo: String,
    checkIn: Number,
    checkOut: Number,
    maxGuests: Number,
    price: Number,
});

const PlaceModel = mongoose.model('Place', PlacesSchema);

module.exports = PlaceModel;