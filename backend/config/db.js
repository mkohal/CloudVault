const mongoose = require("mongoose");

function connectToDB(){
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("Connected to DB")
        const value = "Connected to DB";
        return value;
    })
}

module.exports = connectToDB;