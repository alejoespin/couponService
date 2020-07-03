const index = require("../src/index");
const redisClient = require("../src/redis-operations/redis-operations");
const requestClient = require("../src/request-operations/request-operations");

describe("index test", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
    delete process.env.NODE_ENV;
    process.env.REDISPORT = "port",
    process.env.REDISHOST = "host"
  });

  afterEach(() => {
    process.env = OLD_ENV;
  });

  it("index ok 1 object", async () => {
    jest.spyOn(redisClient, "getRedisClient").mockImplementation(function() {
      return "redisConnect";
    });
    jest.spyOn(redisClient, "getRedis").mockImplementation(function(id) {
      if (id == "MLA-TEST-1"){
        return {price: "100"};
      }else{
        return {price: "150"};
      }
    });
    const event = {
      item_ids: ['MLA-TEST-1', 'MLA-TEST-2'],
      amount: 150
    };
    const result = await index.handler(event);
    const resultExpected = {
      body: JSON.stringify({item_ids:["MLA-TEST-1"],total:100}),
      statusCode: 200
    }
    expect(result).toStrictEqual(resultExpected);
  });

  it("index 2 object", async () => {
    jest.spyOn(redisClient, "getRedisClient").mockImplementation(function() {
      return "redisConnect";
    });
    jest.spyOn(redisClient, "getRedis").mockImplementation(function(id) {
      return null;
    });
    jest.spyOn(redisClient, "setRedis").mockImplementation(function() {
      return "ok";
    });
    jest.spyOn(requestClient, "requestObject").mockImplementation(function(id) {
      if (id == "MLA-TEST-1"){
        return {price: "120"};
      }else{
        return {price: "20"};
      }
    });

    const event = {
      item_ids: ['MLA-TEST-1', 'MLA-TEST-2'],
      amount: 150
    };

    const result = await index.handler(event);
    const resultExpected = {
      body: JSON.stringify({item_ids:["MLA-TEST-2", "MLA-TEST-1"],total:140}),
      statusCode: 200
    }
    expect(result).toStrictEqual(resultExpected);
  });

  it("index ok 1 object", async () => {
    jest.spyOn(redisClient, "getRedisClient").mockImplementation(function() {
      return "redisConnect";
    });
    jest.spyOn(redisClient, "getRedis").mockImplementation(function(id) {
      if (id == "MLA-TEST-1"){
        return {price: "100"};
      }else{
        return {price: "150"};
      }
    });
    const event = {
      item_ids: ['MLA-TEST-1', 'MLA-TEST-2', 'MLA-TEST-2'],
      amount: 150
    };
    const result = await index.handler(event);
    const resultExpected = {
      body: JSON.stringify({item_ids:["MLA-TEST-1"],total:100}),
      statusCode: 200
    }
    expect(result).toStrictEqual(resultExpected);
  });

  it("index ok 1 object", async () => {
    jest.spyOn(redisClient, "getRedisClient").mockImplementation(function() {
      return "redisConnect";
    });
    jest.spyOn(redisClient, "getRedis").mockImplementation(function(id) {
      if (id == "MLA-TEST-1"){
        return {price: "100"};
      }else{
        return {price: "150"};
      }
    });
    const event = {
      item_ids: ['MLA-TEST-1', 'MLA-TEST-2'],
      amount: 80
    };
    const result = await index.handler(event);
    const resultExpected = {
      body: "NOT_FOUND",
      statusCode: 404
    }
    expect(result).toStrictEqual(resultExpected);
  });
});