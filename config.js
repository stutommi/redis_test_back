require('dotenv').config()

// PORT
module.exports.PORT = process.env.PORT


// REDIS
module.exports.REDIS = process.env.REDIS
module.exports.REDIS_PORT = process.env.REDIS_PORT || 6379