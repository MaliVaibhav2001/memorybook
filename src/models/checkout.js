const mongoose = require('mongoose');
const validator = require('validator');

const checkSchema = mongoose.Schema({
    checkname: {
        type: String,
        required: true,
        minLength:3
    },
    checkaddress: {
        type: String,
        required: true,
        minLength:3
    },
    card_number: {
        type: Number,
        required: true
    },
    card_type: {
        type: String,
        // required: true,
        minLength:3
    },
    exp_date: {
        type: String
    },
    cvv: {
        type: Number,
        // max: 4
    },
    time : {
     type : Date, default: Date.now 
    }
})

// Collection
const Checkout = mongoose.model("Checkout", checkSchema);

module.exports = Checkout;