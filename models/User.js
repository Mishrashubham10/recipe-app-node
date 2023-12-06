const mongoose = require('mongoose')

const userShcema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
})

const User = mongoose.model('User', userShcema)

module.exports = User