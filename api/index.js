const express= require('express');
const app=express();
const cors=require('cors');
const {mongoose}=require("mongoose");
const Transaction=require('./models/Transaction.js');
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.get('/api/test', (req, res)=>{
    res.json("Test ok")
});

const url=process.env.MONGO_URL;

app.post('/api/transaction', async (req, res)=>{
    await mongoose.connect(url);
    const {name, price, description, datetime} = req.body;
    const transaction = await Transaction.create({name,price, description, datetime});
    res.json(transaction);
})

app.get('/api/transactions', async (req, res)=>{
    await mongoose.connect(urlLink);
    const transactions = await Transaction.find({});
    res.json(transactions);
})

app.listen(4000, ()=>{
    console.log("yess") 
});