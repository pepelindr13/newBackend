
const bcrypt = require("bcrypt");
const userModel = require("../Models/user.model");
const jwt = require("jsonwebtoken")
require ("dotenv").config();
let secret = process.env.SECRET;
const cloudinary = require("cloudinary");

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET 
});

const welcomeUser = (req, res) => {
  res.send("Welcome to the user page");
};
const about = (req, res) => {
  res.send("Welcome to the about page");
};

const register = (req, res) => {
  res.send("welcome to the register page");
};

const registerUser = (req, res) => {
  const {firstName, lastName, email, password,} = req.body;
  let saltRounds = 10
  const hashedPassword = bcrypt.hashSync(password, saltRounds);
  let user = new userModel({firstName, lastName, email, password: hashedPassword});
  user
    .save()
    .then((response) => {
      console.log(response);
      console.log("User registered succesfully");
      res.status(200).send({ msg: "User registered succesfully" });
    })
    .catch((err) => {
      console.log(err);
    });
    
};



const loginUser = async (req, res) => {
  const { email, password } = req.body;
  let user;
  try {
    user = await userModel.findOne({ email: email });
      
  if(!user){
    res.status(400).json({ msg: "User not found" });
  }
   
  const token = jwt.sign({ userId: user._id }, "secret", { expiresIn: "2d" })
  res.status(200).json({msg: "User found", token: token, user: user});
  }
  catch (err) {
    return new Error();
  }

};

const login = (req, res) => {
  res.send("welcome to the login page");
};

const dashboard = async (req, res) => {
  let token = req.headers.authorization.split(' ')[1]
  console.log(token);
  jwt.verify(token, "secret", (err, result)=>{
    if(err) {
      console.log(err);
      res.status(400).json({ msg: "Invalid token", err: err});
    }else {
      console.log(result);
      res.status(200).json({ msg: "user found", result: result});
    }
  })
}

const uploadProfile = async(req,res)=> {
  let file = req.body.myFile
  cloudinary.uploader.upload(file, (result, err) => {
    if(err) {
      console.log(err);
    }else {
      console.log(result);
    }
  })
  .then((result) =>{
    res.send({msg: "file uploaded", result: result})
  }).catch((err)=>{
    console.log(err);
  })
    
  }

module.exports = {
  welcomeUser,
  about,
  register,
  registerUser,
  login,
  loginUser,
  dashboard,
  uploadProfile
};
