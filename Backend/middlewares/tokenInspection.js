const User = require('../models/user.model');
const jwt = require('jsonwebtoken');


exports.isUserValid = async (req,res,next) =>{

    // retrieve token from cookies or Header or body
    let token = req.cookies.token || req.get("Authorization") || req.body.token;

    if(!token){
        return res.status(400).json({
            message: "Invalid Session, Please login"
        })
        next();
    }

    token = token.replace('Bearer ','');

    // decrypt token
    const decryptToken = await jwt.verify(token, process.env.JWT_SECRET);

    // add user information in request object
    req.user = await User.findById(decryptToken.id);

    next();
}