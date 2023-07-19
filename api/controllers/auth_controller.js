
const User = require('../models/user_model');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const signUp = async (req, res) => {
    try {
        req.body.password = bcrypt.hashSync(req.body.password, 10);
        const user = await User.create(req.body)
        //Save Token for Autologin
        const token = jwt.sign({ email: user.email, id: user.id }, process.env.JWT_SECRET, { expiresIn: '1y' })
        return res.status(200).json({'token': token});
    } catch (error) {
        if (error.code === 11000) {
            res.json({'code': 11000, 'error':'User already exists', 'status': 500});
        } else {
            //console.log(error)
            res.status(500).json({ error: 'Error in signUp user' });
        }
    }
}

const logIn = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        const userDetails = {
            token: '',
           // name: '',
           // email: '',
        }
        if (user) {
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (result) {
                    //REMEMBER CHANGE EXPIRATES SESSION 
                    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1y' })
                    userDetails.token = token
                  //  userDetails.name = user.name
                   // userDetails.email = user.email
                    userDetails.reminder_freq = user.reminder_freq
                    userDetails.rol = user.rol
                    userDetails.id = user.id
                    console.log(userDetails)
                    return res.status(200).json({ userDetails });
                }
                return res.status(400).send("User or password incorrect.")
            })
        } else {
            return res.status(400).send("User not exists.")
        }
    } catch (error) {
        return res.status(500).send("Error in logIn user", error)
    }
}



module.exports = { signUp, logIn }