// Server setup
const express = require("express");
const path = require('path')
const axios = require('axios')
let flights = require("./flight.json")
const reader = require('fs')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')))

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))

app.get("/", (req,res) => {
  // let data = reader.readFileSync('./flight.json')
  // let flight = JSON.parse(data)
  // console.log(flight)
  return res.render('home.ejs',{flights})
  
});

app.post("/bookflight", (req,res) => {
  let last = flights[flights.length-1]
  let id = last.id + 1
  let flight = {
    "id":id,
    "title": req.body.title,
        "time": req.body.time,
        "price": req.body.price,
        "date": req.body.date
  }
  flights.push(flight)
  let data = JSON.stringify(flights)
  reader.writeFile('flight.json',data,(err) => {
    if(err){
      return res.json({success:0,msg:`can not book a flight\n${err}`})
    }
  })
  return res.json({success:1,flights:flights,msg:'you have booked a flight'})
});

app.post("/updateflight", (req,res) => {
  let id = Number(req.body.id)  
  flight = flights.find((item) => item.id == id)
  if(flight!=undefined){
    let flightindex = flights.indexOf(flight)
    flight = {
      "id" : id,
      "title": req.body.title,
      "time": req.body.time,
      "price": req.body.price,
      "date": req.body.date
    }
    flights[flightindex] = flight
    let data = JSON.stringify(flights)
    reader.writeFile('flight.json',data,(err) => {
      if(err){
        return res.json({success:0,msg:`can not Update a flight\n${err}`})
      }
    })
    return res.json({success:1,flights:flights,msg:'your flight has been updated'})
  }else{
    return res.json({success:0,msg:`flight with ${id} does not exit`})
  }

});

app.post("/deleteflight", (req,res) => {
  let id = Number(req.body.id)  
  flight = flights.find((item) => item.id == id)
  let flightindex = flights.indexOf(flight)
  flights.splice(flightindex,1) 
  let data = JSON.stringify(flights)
  reader.writeFile('flight.json',data,(err) => {
    if(err){
      return res.json({success:0,msg:`can not Delete a flight\n${err}`})
    }
  })
  return res.json({success:1,flights:flights,msg:'flight has been Deleted'})
});

app.post("/searchflight", (req,res) => {
  let id = Number(req.body.id)  
  flight = flights.find((item) => item.id == id)
  if(flight!=undefined){
    let flightindex = flights.indexOf(flight)
    flight = flights[flightindex]
    let data = JSON.stringify(flight)
    return res.json({success:1,flight:flight})
  }else{
    return res.json({success:0,msg:`flight with ${id} does not exit`})
  }

});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
