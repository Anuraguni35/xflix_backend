const express=require('express');
// const PORT=8082;
require('dotenv').config();
const dotenv=require('dotenv');
const app=express();
const mongoose=require('mongoose');
const router=require('./Routes/index.routes');
// to enable the json 
app.use(express.json());


app.use('/v1',router);

mongoose.connect(process.env.MONGODB_URL).then(()=>{
console.log("DB connected sucessfully");
app.listen(8082,()=>{
    console.log("Server Sucessfully started on "+8082);
})
}).catch((err)=>{
    console.log("DB failed to connect"+err);
})
