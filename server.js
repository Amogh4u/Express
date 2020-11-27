const express = require('express');
const app = express()
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
require('dotenv/config')

mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true})

const database = mongoose.connection

database.on('error', (error) => {
    console.error(error);
});

database.once('open', ()=> {
    console.log('Mongo Connected')
})

app.use(express.json());

const userRouter = require('./routes/users');
const orderRouter = require('./routes/order');

app.use('/users', userRouter);
app.use('/orders', orderRouter);

app.listen(3000, () => {
    console.log('Server Started');
});