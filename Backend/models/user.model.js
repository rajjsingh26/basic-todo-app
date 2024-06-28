const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type:String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next();
    }

    this.password  = await bcrypt.hash(this.password, 10);
})


userSchema.methods.validatePassword = async function(userSentPassword){
    return await bcrypt.compare(userSentPassword, this.password )
}

userSchema.methods.getJwtToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY
    })
}


module.exports = mongoose.model("User",userSchema);