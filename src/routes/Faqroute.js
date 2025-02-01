const express = require('express');
const FaqRouter  = express.Router();
const { Translate } = require('@google-cloud/translate').v2;
require('dotenv').config();
const Faq = require('../models/Faq');
const redisClient = require('../config/redis')


//initalising google translate api 
const convert  = new Translate({
    key: process.env.GOOGLE_TRANSLATE_API_KEY
});

//admin add a post request 

FaqRouter.post('/admin/add-faq',async(req,res)=>{
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
        // clear the cache 
       await redisClient.del("faq_en");
       await redisClient.del("faq_hi");
       await redisClient.del("faq_bn");

        res.status(200).json({message:"FAQ added successfully"});
        
    } catch (error) {
        console.log(error.message);
    }

})


// get all the faq 

FaqRouter.get("/faq",async(req,res)=>{
  try {
    const lang = req.query.lang || "en";
    const cachekey = `faq_${lang}`;
    
    // cheak that the faq in the respective language  available in the redis
    const chachedFaq = await redisClient.get(cachekey);
    if(chachedFaq){
        return res.json(JSON.parse(chachedFaq));
    }
    // fetch from the db
    const faq = await Faq.find({});

    const translateFaq = faq.map((e)=>({
        question : e.question[lang]|| e.question["en"],
        answer: e.answer[lang]|| e.answer["en"]
    }))
  // store the translate faq in the redis cache

  await redisClient.set(cachekey,JSON.stringify(translateFaq));

  res.json(translateFaq);


  } catch (error) {
    console.log(error.message);
  }
})




module.exports = FaqRouter;