const mongoose = require('mongoose');

const FaqSchems = new mongoose.Schema({
   question:{
    en: {type:String, required:true},
    hi:{type:String},
    bn:{type:String}
   },
   answer:{
    en: {type:String, required:true},
    hi:{type:String},
    bn:{type:String}
   }
},{timestamps:true})

module.exports = mongoose.model('faq',FaqSchems);