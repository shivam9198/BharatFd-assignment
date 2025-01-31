const mongoose = require('mongoose');

// Connect to MongoDB
const connectDb = async()=>{
    try {
        await mongoose.connect('mongodb+srv://shivamkashyap9198:Internship@faq.mult6.mongodb.net/')
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDb;