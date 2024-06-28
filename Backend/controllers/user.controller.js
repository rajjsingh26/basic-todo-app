const User = require('../models/user.model');

exports.signup = async (req, res, next) => {
    try {
        const { username, password, firstname, lastname, email } = req.body;

        // checking for all the fields are present or not
        if (!(username && password && firstname && lastname && email)) {
            return res.status(400).json({
                success: false,
                message: "All fields are required !"
            })
        }

        // checking if email present or not
        const isUserPresent = await User.findOne({ email });

        if (isUserPresent) {
            return res.status(400).json({
                message: "User already exists !"
            })
        }

        // creating user in db
        const user = await User.create({ username, password, firstname, lastname, email });

        res.status(201).json({
            success: true,
            message: "User Created Successfully!",
            user
        })
    } catch (error) {
        console.log(error)
        return new Error("Something went wrong!")
    }
}

exports.login = async (req, res, next) => {

    try {
        const { email, password } = req.body;

        // checking if password and email field are present
        if (!(email && password)) {
            return res.status(400).json({
                message: "Email and Password are mandatory"
            })
        }

        // finding if email exist
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Incorrect email or password"
            })
        }

        // checking if password matches or not
        const isPasswordValid = await user.validatePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Incorrect email or password"
            })
        }

        // generating token after successful user authentication
        const token = user.getJwtToken();

        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            sameSite: 'Lax'
        };

        user.password = undefined

        res.status(200).cookie("token", token, options).json({
            success: true,
            token: token,
            user,
        });

    } catch (error) {
        console.log(error)
        return new Error("Something Went Wrong!")
    }
}

exports.logout = async (req, res, next) => {
    res.cookie("token", '')
  
    res.status(200).json({
      success: true,
      message: "Logout success",
    });
  };

exports.getAllUsers = async (req,res,next) =>{
    console.log(req.user)
    const users = await User.find({});

    res.status(200).json({
        users
    })
}