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
  console.log(req.body)
  flights[id-1] = {
    "id" : id,
    "title": req.body.title,
    "time": req.body.time,
    "price": req.body.price,
    "date": req.body.date
}
  console.log('----------------------------------------------------------')
  console.log(flights)
  let data = JSON.stringify(flights)
  reader.writeFile('flight.json',data,(err) => {
    if(err){
      return res.json({success:0,msg:`can not Update a flight\n${err}`})
    }
  })
  return res.json({success:1,flights:flights,msg:'your flight has been updated'})
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
