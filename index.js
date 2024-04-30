const express = require('express')
require("dotenv").config();
let port = process.env.PORT;
const app = express();
const mongoose = require("mongoose");
const userRouter = require("./Routes/User.Route");
const cors = require("cors");
let uri = process.env.URI;


app.use(cors()) 
app.use(express.json({ limit: "30mb"})) 
app.use('/', userRouter)

app.get('/user', async (req, res) => {
    try {
      // Fetch user from database (example: fetching the first user)
      const user = await userModel.findOne();
      if (user) {
        // Return user details if found
        res.json(user);
      } else {
        // Return 404 if no user found
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      // Return 500 if error occurs
      console.error('Error fetching user:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

app.listen(port, ()=>{
    mongoose.connect(uri)
    .then(()=> {
        console.log(`Connected to DB and server is running on ${port}`);
    }).catch((err)=>{
        console.log(err);
    })
})  
