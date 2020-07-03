const rp = require("request-promise");
const redisClient = require("../src/redis-operations/redis-operations");

describe("Redis Test", () => {
  const redisConnect = {
    set: jest.fn().mockImplementation(() => {
      return "ok";
    }),
    get: jest.fn().mockImplementation(() => {
      const res = {
        id: "MLA-TEST"
      }
      return JSON.stringify(res);
    })
  };
  
  it("Redis setRedis OK", async () => {
    let result = await redisClient.setRedis("key", "value", redisConnect);
    expect(result).toStrictEqual("ok");
  });

  it("Redis getRedis OK", async () => {
    let result = await redisClient.getRedis("key", redisConnect);
    const resultExpect = {
      id: "MLA-TEST"
    }
    expect(result).toStrictEqual(resultExpect);
  });
});

  describe("Redis Test error", () => {
    const redisConnect = {
      set: jest.fn().mockImplementation((cb, redis) => {
        throw new Error("Redis Error");
      }),
      get: jest.fn().mockImplementation((cb, redis) => {
        throw new Error("Redis Error");
      }),
    };
  
  it("Redis setRedis FAIL", async () => {
    let result = await redisClient
      .setRedis("key", "val", redisConnect)
      .then()
      .catch((error) => expect(error).toStrictEqual(new Error("Redis Error")));
  });

  it("Redis getRedis FAIL", async () => {
    let result = await redisClient
      .getRedis("key", redisConnect)
      .then()
      .catch((error) => expect(error).toStrictEqual(new Error("Redis Error")));
  });
});
