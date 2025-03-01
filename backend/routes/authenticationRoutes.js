const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt"); // yeh use krte hai password to hash value mai convert krne k liye
const jwt = require("jsonwebtoken");


router.post(
  "/signup",
  [
    body("email").trim().isEmail(),
    body("password").trim().isLength({ min: 5 }),
    body("username").trim().isLength({ min: 3 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Password must be at least 5 characters long, and username must be at least 3 characters!"
      });
    }

    const { username, email, password } = req.body;

    const user = await userModel.findOne({ username });
     if (existUsername) {
       return res.status(400).json({ message: "Username already taken!" });
     }

    const existEmail = await userModel.findOne({ email });
    if (existEmail) {
      return res.status(400).json({ message: "Email already exists!"});
    }

    const hashPassword = await bcrypt.hash(password, 10); // 10 is a balanced number for hashing

    const newUser = await userModel.create({
      username,
      email,
      password : hashPassword,
    });
    res.json(newUser);
  }
);

router.post("/login", async (req,res)=>{
    const {username, password} = req.body;

    const user = await userModel.findOne({
        username : username
    })

    if(!user){
        return res.status(400).json({
            message : "Username or password is incorrect!"
        })
    }


    // bcrypt he hume method deta hai humare password ko compare krne jo req.body ma aaya hai or saved password
    // iski output boolean mai hoti hai
    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
      return res.status(400).json({
        message: "Username or password is incorrect!",
      });
    }




    // Agr sb kuch sahi hai to hum token generate krte hai
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        username: user.username,
      },
      process.env.JWT_SECRET_KEY // yeh ek secret key hai
    );

    console.log("Generated Token:", token); 
    res.cookie("token", token) // token ko hum cookies mai bhej rhe hai
    res.json({token})
   

})

module.exports = router