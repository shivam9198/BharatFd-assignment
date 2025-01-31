const express = require('express');
const FaqRouter  = express.Router();
const { Translate } = require('@google-cloud/translate').v2;
require('dotenv').config();
const Faq = require('../models/Faq')


//initalising google translate api 
const convert  = new Translate({
    key: process.env.GOOGLE_TRANSLATE_API_KEY
});

//admin add a post request 

FaqRouter.post('/admin/add-feed',async(req,res)=>{
    const {question , answer} = req.body;
    
    try {
        
        const [question_hi] = await convert.translate(question,"hi");
        const [question_bn] = await convert.translate(question,"bn");
        const [answer_hi] = await convert.translate(answer,"hi");
        const [answer_bn] = await convert.translate(answer,"bn");
        
        const faq = new Faq({
            question:{en:question,hi:question_hi, bn:question_bn},
            answer:{en:answer,hi:answer_hi,bn:answer_bn},
        })
        await faq.save();
        res.status(200).json({message:"FAQ added successfully"});
        
    } catch (error) {
        console.log(error.message);
    }

})

module.exports = FaqRouter;