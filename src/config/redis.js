const redis = require('redis');

// Initialize the Redis client
const redisClient = redis.createClient() 

redisClient.connect(); 

redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
  console.log('Redis error:', err);
});

module.exports = redisClient;
