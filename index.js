//import express
const express = require("express");
// import routes
const route = require('./routes');
//import cors
const cors = require('cors');
// import morgan (logger)
const morgan = require('morgan');
// construct express function
const app = express();

// middleware 
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
app.use('/cats',route);
 
// listening to port
app.listen('3000',()=> console.log('Server Running at port: 3000'));