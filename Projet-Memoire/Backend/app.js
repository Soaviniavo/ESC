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



app.use('/auth',authRoutes);
app.use('/user',userRoutes);
app.use('/data',extractRoutes);

/*app.use('/test',(req,res,next) =>{
    const t = req.body ; 
    console.log(t.name);
    console.log('ok => 1');
    next();
});

app.use('/',(req,res,next) =>{
    console.log('ok => 2');
    res.status(200).json('Accompli');
});*/



module.exports = app ; 