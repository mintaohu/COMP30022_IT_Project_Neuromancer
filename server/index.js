const express = require('express');
const mongoose = require('mongoose');
const app = express()

app.use(express.json())

mongoose.connect("mongodb+srv://xuanjianzhang:eWcZLhpj2aUMPIB8@seeya.n8mo7.mongodb.net/SeeYa?retryWrites=true&w=majority",{
    useNewUrlParser: true,
})

app.listen(5000,()=>{
    console.log('Seeya is listening...');
})