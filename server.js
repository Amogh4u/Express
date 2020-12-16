const express = require('express');
const app = express()
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
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

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended:false}));

const questionRouter = require('./routes/question');
const optionsRouter = require('./routes/options');

app.use(express.json());
app.use('/questions', questionRouter);
app.use('/options', optionsRouter);

app.get('/', (req,res) => {
    res.render('index')
})
app.listen(3000, () => {
    console.log('Server Started');
});