const User = require('../models/User'); 
const mongoose = require('mongoose');


const register = async (req, res) => {
    try {
        const user = new User(req.body); 
        console.log(user)
        await user.save(); 
        res.status(200).json({ "msg": "register functionality"})
    } catch (e) {
        console.log(e)
        res.status(500).json({ "msg": "server error" })
    }
}



const login = async (req, res) => {
    try {
        const emailExists = await User.findOne({ email: req.body.email });
        if (!emailExists) {
            return res.status(404).json({"msg": "user not found"})
        }
        const validPassword = await emailExists.comparePassword(req.body.password);
        console.log(validPassword)
        if (!validPassword) {
            return res.status(404).json({ "msg": "passwords don't match" })
        } else {
            //console.log(req.session)
            req.session.userId = emailExists._id.toString(); 
            console.log(req.session.userId)
            res.status(200).json({ "msg": "login successful" })
        }
        
    } catch (e) {
        console.log(e)
        res.status(500).json({"msg": "server error"})
    }
}

const dashboard = async(req, res) => {
    try {
        res.status(200).json({ "msg": "dashboard functionality"})
    } catch (e) {
        console.log(e)
        res.status(500).json({ "msg": "server error" })
    }
}

const logout = async (req, res) => {
    try {
        req.session.destroy(); 
        res.status(200).json({ "msg": "logout successful, session destroyed" })
    } catch (e) {
        console.log(e)
        res.status(500).json({ "msg": "server error" })
    }

}



module.exports = {
    register, 
    login, 
    dashboard, 
    logout
}

