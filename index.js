const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// conection mongo
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://fede:5QiBdqUkqPn7uUvM@cluster0-2wst6.mongodb.net/restapis',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// create server
const app = express();

//enable bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// enable cors client-api
app.use(cors());

// routes of app
app.use('/', routes());

// folder public
app.use(express.static('uploads'));

// port
app.listen(5000);
console.log('Run server port: 5000');
