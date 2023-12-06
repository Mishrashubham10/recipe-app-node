const mongoose = require('mongoose')

const dbConnection = async (req, res) => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
    } catch (error) {
        throw new Error('Connection refused')
    }
}

module.exports = dbConnection