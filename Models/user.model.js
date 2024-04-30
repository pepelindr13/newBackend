const mongoose = require('mongoose');

userSchema = new mongoose.Schema({
    firstName: String,
    lastName:  String,   
    email: {type:String, unique:true},
    password: {type:String}
})

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;