const mongoose = require('mongoose');

const FaqSchems = new mongoose.Schema({
    question:{
        type:String,
        required:true
    },
    question_h1:{
        type:String,
        required:true
    },
    question_b1:{
        type:String,
        required:true
    },
    answer:{
        type:String,
        required:true
    },
    answer_h1:{
        type:String,
        required:true
    },
    answer_b1:{
        type:String,
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model('faq',FaqSchems);