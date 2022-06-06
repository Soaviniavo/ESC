const express = require('express');
const app  = express() ; 
var cors = require('cors');
app.use(cors());
app.use(express.json());


const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const extractRoutes = require('./routes/extract');

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers',' Origin, X-Requested-With , Content , Accept , Content-Type , Authorization ');   
    res.setHeader('Access-Control-Allow-Methods','GET','POST','PUT','DELETE','PATCH','OPTIONS');
    next();
});





app.use(authRoutes,"/auth");
app.use(userRoutes,"/user");
app.use(extractRoutes,"/data");

module.exports = app ; 