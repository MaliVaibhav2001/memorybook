const mongoose = require('mongoose');
const validator = require('validator');

const contactSchema = mongoose.Schema({
    contactname: {
        type: String,
        required: true,
        minLength:3
    },
    contactphone: {
        type: Number,
        required: true,
        min: 10
    },
    contactemail:{
        type: String,
        required: true,
        validate(value){
            if(!validator.isEmail(value)) {
                throw new Error("Invalid email id")
            }
        }
    },
    contactmessage: {
        type: String,
        // required: true,
        minLength:3
    },
    time : {
     type : Date, default: Date.now 
    }
})

// Collection
const Usercontact = mongoose.model("Usercontact", contactSchema);

module.exports = Usercontact;