/* eslint-disable no-undef */
const rp = require("request-promise");
const requestOpt = require("../src/request-operations/request-operations");

describe("request service test", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
    delete process.env.NODE_ENV;
    process.env.GET_PRICE = "url";
  });

  afterEach(() => {
    process.env = OLD_ENV;
  });

  test("request ok", async () => {
    jest.spyOn(rp, "get").mockImplementation(function() {
      return Promise.resolve(data);
    });
    const result = await requestOpt.requestObject("MLA-TEST");
    expect(result.price).toBe(124);
  });
});

const data = {
  id: "MLA-TEST",
  price: 124
};