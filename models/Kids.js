const mongoose = require('mongoose'); 
mongoose.set('debug', true);

const kidSchema = mongoose.Schema({
    image: {
        type: String, 
        required: false
    }, 
    requirement: {
        type: String, 
        required: true
    }, 
    desc: {
        type: String, 
        required: false
    }
})

const Kid = mongoose.model('Kid', kidSchema)

module.exports = Kid;