const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
//mongoose.set('debug', true);

const userSchema = mongoose.Schema({
    email: {
        type: String, 
        required: true
    }, 
    password: {
        type: String, 
        required: true
    }, 
    payment_id: {
        type: String,
        required: false, 
        default: ''
    }, 
    amount: {
        type: Number,
        required: false,
        default: 0
    }, 
    created_at: {
        type: String,
        required: false,
        default: ''
    }, 
    status: {
        type: String, 
        required: false,
        default: 'Success'
    }
})



userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 10); 
})

userSchema.methods.comparePassword = async function (incomingpassword) {
    const isMatch = await bcrypt.compare(incomingpassword, this.password)
    console.log(isMatch)
    return isMatch;
}




const User = mongoose.model('User', userSchema)

module.exports = User;