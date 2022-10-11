const mongoose = require('mongoose');

function connectDB() {
    mongoose.connect(process.env.URI)
    console.log('db connected...')
}

module.exports = connectDB; 
