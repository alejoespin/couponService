const rp = require("request-promise");

const requestObject = async (itemId) => {
  const dataRequest = {
    uri: `${process.env.GET_PRICE}/${itemId}`,
    json: true
  };
  return await rp.get(dataRequest).then(function(response) {
    return response;
  });
};

module.exports = {
  requestObject: requestObject
};
