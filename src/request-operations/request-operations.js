const rp = require("request-promise");

const requestObject = async (itemId) => {
  const dataRequest = {
    uri: `${process.env.GET_PRICE}/${itemId}`,
    json: true
  };
  console.log("dataRequest ", dataRequest);
  return await rp.get(dataRequest).then(function(response) {
    console.log("PRICE ", response);
    return response;
  });
};

module.exports = {
  requestObject: requestObject
};
