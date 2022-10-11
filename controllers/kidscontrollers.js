const Kids = require('../models/Kids');
const User = require('../models/User'); 
const mongoose = require('mongoose'); 

const Razorpay = require('razorpay');

var instance = new Razorpay({ key_id: 'rzp_test_obMCtlKp3EEqKX', key_secret: 'HJmwrAqZCfXxzoEXtZa1jMXd', });

const postKids = async (req, res) => {
    try {
        const Kid = new Kids(req.body); 
        await Kid.save();
        res.status(200).json({ "msg": "kids created successfully", Kid })
    } catch (e) {
        console.log(e)
        res.status(500).json({ "msg": "server error" })
    }
}



const getKids = async (req, res) => {
    try {
        const kids = await Kids.find({});
        console.log(kids)
        res.status(200).json({ "msg": "kids fetched successfully", kids})
    } catch (e) {
        console.log(e)
        res.status(500).json({"msg": "server error"})
    }
}

const getKid = async(req, res) => {
    try {
        const kid = await Kids.find({ _id: req.params.id }); 
        res.status(200).json({ "msg": "kid fetched successfully", kid })
    } catch (e) {
        console.log(e)
        res.status(500).json({ "msg": "server error" })
    }
}

const makePayment = async (req, res) => {
    try {
        console.log(req.body.amount)
        var options = {
            amount: req.body.amount,  // amount in the smallest currency unit
            currency: "INR",
            receipt: "order_rcptid_11"
        };

        await instance.orders.create(options, async function (err, order) {
            if (err) {
                console.log(err)
            } else {
                console.log(order);
                console.log(req.session.userId)
                const currentUserId = req.session.userId;
                const currentUser = await User.findOne({ _id: currentUserId }); 
                console.log(currentUser, order.id, order.amount, order.created_at)
                //console.log(currentUser); 
                if (currentUser) {
                    //await User.findByIdAndUpdate({ _id: currentUserId, $set: { payment_id: order.id, amount: order.amount, created_at: order.created_at }})
                    //currentUser.payment_id = order.id;
                    //currentUser.amount = order.amount;
                    //currentUser.created_at = order.created_at;
                }
                
                //console.log(order.id)
                res.status(200).json({ order })
            }
            
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({"msg": "server error" })
    }

    
    
}





module.exports = {
    getKids, 
    getKid, 
    postKids, 
    makePayment
}

