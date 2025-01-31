const express = require('express');
const app = express();
const connectDb = require('./config/database');


// Connect to MongoDB
connectDb()
.then (()=>{
    console.log('Database connected');
    app.listen("777",()=>{
     
        console.log("listening on a port 777");
    });
})