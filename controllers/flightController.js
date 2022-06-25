const users = require("./../flight.json")
exports.example = (req, res) => {
    console.log("example")
    res.send(users)
}


