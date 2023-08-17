const express=require("express");
const app=express();
// const PORT = process.env.PORT || 3000;
const path=require("path");
const hbs=require("hbs");
require('./db/connection');          // importing db file
const Reserv = require('./models/onlinereservation');  // Online Reservation Page
const Usercontact = require('./models/contact');      // contact Reg Form
const Register = require('./models/registers');     // Register Form
const Checkout = require('./models/checkout');     // Checkout Form
const { urlencoded } = require("express");
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const dotenv = require("dotenv");

dotenv.config();

//builtin middlewear
const staticPath=path.join(__dirname,"../public");
const templatePath=path.join(__dirname,"../template/views");
const partialPath=path.join(__dirname,"../template/partials");

app.use(express.urlencoded({extended: false}));

app.use(express.static(staticPath));

//to set the view engine
app.set("view engine","hbs")
app.set("views",templatePath)
hbs.registerPartials(partialPath);


//template engine route
app.get('/',(req,res)=>{
    // res.render("login")
    res.render("login")
})
app.get('/login',(req,res)=>{
    res.render("login")
    // res.render("index")
})
app.post('/', async(req, res) => {
    try {
        // res.send(req.body);
        const reservData = new Reserv(req.body);
        await reservData.save();
        res.status(201).render('index');
    }catch(err) {
        res.status(500).send(err);
    }
})



// Login
app.get('/',(req,res)=>{
    res.render("index")
})
// Login Check
app.post('/',async(req,res)=>{
    try{
        const username=req.body.username;
        const password = req.body.password;
        const usermail = await Register.findOne({username:username});
        const isMatch = await bcrypt.compare(password, usermail.password)
        if(isMatch){
            res.status(201).render("index")
        }
        else{
            res.send("invalid login details")
        }

    }
    catch(error){
        res.status(400).send("invalid login details")
    }
})



// Registration
app.get('/register',(req,res)=>{
    res.render("register")
})

// Creating New User On DB
app.post('/register', async(req, res) => {
    try {
        
        
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        if(password === cpassword){
            // res.send(req.body);
            const registerDate = new Register(req.body);
            await registerDate.save();
            res.status(201).render('login');
        }else{
            res.send("Password are not matching")
        }
    }catch(err) {
        res.status(500).send(err);
    }
})


// 


// Mongoose Setup
const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Server port : ${PORT}`));

}).catch((error) => console.log(`${error} did not connected`));