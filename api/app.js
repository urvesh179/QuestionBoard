var express = require('express');
const { mongo, Mongoose } = require('mongoose');
var path = require('path');
var cors=require("cors");


var EventRoute = require('./routes/EventRoute');
var ReceiverCatRoute=require("./routes/ReceiverCatRoute");
var DonationRoute = require('./routes/DonationRoute');
var PortfolioRoute = require('./routes/PortfolioRoute');
var userRoute=require('./routes/UserRoute');
var volunteerRoute=require('./routes/VolunteerRoute');
var landmarkRoute=require('./routes/LandmarkRoute');
var donorRoute=require('./routes/DonorRoute');
var ReceiverRoute=require('./routes/ReceiverRoute')

var app = express();

require('./DBconnection')


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/event', EventRoute);
app.use('/receiverCategory',ReceiverCatRoute);
app.use('/donation',DonationRoute);
app.use('/portfolio',PortfolioRoute);
app.use('/user',userRoute);
app.use('/volunteer',volunteerRoute);
app.use('/landmark',landmarkRoute);
app.use('/donor',donorRoute);
app.use('/receiver',ReceiverRoute);

app.use('/*',(req,res)=>
{
  res.status(404).send("Url Not Found");
})

 module.exports=app;