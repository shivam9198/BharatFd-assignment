const express = require('express');
const app = express();
const connectDb = require('./config/database');
const FaqRouter = require('./routes/Faqroute');
const redisClient = require('./config/redis');


app.use(express.json());
app.use('/', FaqRouter);






// Connect to MongoDB
connectDb()
.then (()=>{
    console.log('Database connected');
    if (redisClient.isReady) {
        app.listen(777, () => {
          console.log('Server is listening on port 777');
        });
      } else {
        console.log('Redis is not ready yet');
      }
    });



module.exports = app;