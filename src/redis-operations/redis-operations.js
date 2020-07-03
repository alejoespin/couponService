const Redis = require("ioredis");

const getRedisClient = redisOption => {
  return new Redis(redisOption);
};

const setRedis = async (key, value, redisClient) => {
  try {
    const result = await redisClient.set(key, value);
    return result;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const getRedis = async (id, redisClient) => {
  try {
    const result = await redisClient.get(id);
    return JSON.parse(result);
  } catch (e) {
    console.log(e);
    return null;
  }
};

module.exports = {
  setRedis: setRedis,
  getRedis: getRedis,
  getRedisClient: getRedisClient
};

