const express= require('express');
const app=express();
const cors=require('cors');
const {mongoose}=require("mongoose");
const transactionModel=require('./models/Transaction.js');
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.get('/api/test', (req, res)=>{
    res.json("Test ok")
});

const url='mongodb://127.0.0.1:27017/hello';

app.post('/api/transaction', async (req, res)=>{
    try{
    await mongoose.connect(url);
    const {name, price, description, datetime} = req.body;
    const transaction = new transactionModel({name,price, description, datetime});
    await transaction.save();
    // res.json(transaction);
    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Error registering candidate', error: error.message });

  }
})
 
app.get('/api/transactions', async (req, res)=>{
    try{await mongoose.connect(url);
    const transactions = await transactionModel.find({});
    res.json(transactions);}catch{
        console.log("error");
    }
})

app.listen(4000, ()=>{
    console.log("yess 4000") 
});