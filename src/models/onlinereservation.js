const mongoose = require('mongoose');
const validator = require('validator');

const reservationSchema = mongoose.Schema({
    reservname: {
        type: String,
        required: true,
        minLength:3
    },
    reserphone: {
        type: Number,
        required: true,
        min: 10
    },
    reserperson: {
        type: Number,
        required: true
    },
    reserdate: {
        type: String
    },
    resertime: {
        type: String
    },
    resermessage: {
        type: String,
        // required: true,
        minLength:3
    },
    time : {
     type : Date, default: Date.now 
    }
})

// Collection
const Reserv = mongoose.model("Reserv", reservationSchema);

module.exports = Reserv;
// module.exports = User;