const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const registerSchema = mongoose.Schema({
    fullname: {
        type: String,
        // required: true,
        minLength:3
    },
    username: {
        type: String,
        // required: true,
        minLength:3
    },
    email:{
        type: String,
        // required: true,
        validate(value){
            if(!validator.isEmail(value)) {
                throw new Error("Invalid email id")
            }
        }
    },
    phone: {
        type: Number,
        // required: true,
        min: 10
    },
    password: {
        type: String,
        // required: true,
        minLength:3
    },
    confirmpassword: {
        type: String,
        // required: true,
        minLength:3
    },
    gender: {
        type: String
    },
    time : {
     type : Date, default: Date.now 
    }
})

// Psaaword bcryption
registerSchema.pre("save",async function(next){
    if(this.isModified("password")){
        // console.log(`the current password is ${this.password}`);
        this.password = await bcrypt.hash(this.password,10);
        // console.log(`the current password is ${this.password}`);
        this.confirmpassword=undefined;
    }
    next();
})
// 

// Collection
const Register = new mongoose.model("Register", registerSchema);

module.exports = Register;