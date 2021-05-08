const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');

require("./db/conn");
const Register = require("./models/registers");
const port = process.env.PORT || 3000;

const static_path = path.join(__dirname,"./public");
const template_path = path.join(__dirname,"./templates/views");
const partials_path = path.join(__dirname,"./templates/partials");
//postman
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//this can be used for html files
app.use(express.static(static_path))
// this can be used for hbs files (which renders hbs files)
app.set("view engine", "hbs");
app.set("views",template_path);
hbs.registerPartials(partials_path);


app.get('/',(req,res)=>{
    res.render("index")
});
app.get("/register",(req,res)=>{
    res.render("register");
});
// to create user database
app.post("/register",async(req,res)=>{
    try {
       const password= req.body.password;
       const rpassword = req.body.repeatpassword;
       if(password === rpassword){
           const registerBookings = new Register({
                
                    name : req.body.name,
                    email : req.body.email,
                    password :req.body.password ,
                    repeatpassword :req.body.repeatpassword ,

                
           })
           // to save in database
        const registered =  await registerBookings.save();
        res.status(514).render("index");
       }else{
           res.send("passwords are not matching");
       }

        
    } catch (error) {
        res.status(555).send(error);
    }
});
app.get("/login",(req,res)=>{
    res.render("login");
});
//login check
app.post("/login",async(req,res)=>{
    try {
        const email = req.body.email;
        const password = req.body.psw;

       const userEmail= await  Register.findOne({email : email});

        if(userEmail.password === password)
        {
            res.status(514).render("index");
        }else{
           res.send("invalid login details");

        }
        
    } catch (error) {
        res.status(555).send("invalid email or password");
        
    }
});
app.listen(port,()=>{
    console.log(`server is running at port number ${port}`);
})