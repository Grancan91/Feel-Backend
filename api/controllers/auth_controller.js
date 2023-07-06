
const User = require('../models/user_model');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const signUp = async (req, res) => {
    console.log(req.body)
    try {
        req.body.password = bcrypt.hashSync(req.body.password, 10);
        const user = await User.create(req.body)
        console.log("SignUp in successfully");

        //REMEMBER CHANGE EXPIRATES SESSION 
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1y' })
        //delete user.password;
        return res.status(200).json({ token });
        
        //res.status(200).json(user)
    } catch (error) {
        //console.log(error)
        res.status(500).json({ error: 'Error in signUp user' });
    }
}

const logIn = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        const userDetails = {
            token: '',
            name: '',
            email: '',
        } 
        if (user) {
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (result) {
                    //REMEMBER CHANGE EXPIRATES SESSION 
                    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1y' })
                    userDetails.token = token
                    userDetails.name = user.name
                    userDetails.email = user.email
                    console.log(`Bienvenido: ${user.name}`)
                    return res.status(200).json({ userDetails });
                }
                return console.log(err)
            }) 
        } else {
            return res.status(400).send("User or password incorrect.")
        }
    } catch (error) {
        return res.status(500).send("Error in logIn user", error)
    }
}


module.exports = { signUp, logIn }