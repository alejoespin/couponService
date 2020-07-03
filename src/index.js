const requestClient = require("./request-operations/request-operations");
const redisClient = require("./redis-operations/redis-operations");

let total = 0;
exports.handler = async (event) => {
  console.log(event);
  let itemPrice = 0;
  let items = [];
  
  const redisOptions = {
      port: process.env.REDISPORT,
      host: process.env.REDISHOST,
  };
  
  const redisConnect = redisClient.getRedisClient(redisOptions);
  console.log("init");
  
  for (var i = 0; i < event.item_ids.length; i++) {
      itemPrice = await getPrice(event.item_ids[i], redisConnect);
      console.log(`itemPrice ${JSON.stringify(itemPrice)}`);
      items.push({
        id: event.item_ids[i],
        price: itemPrice
      });
  }
  items = items.sort((a, b) => a.price - b.price);
  if (items[0].price > event.amount) {
    return {
      statusCode: 404,
      body: "NOT_FOUND"
    }
  }
  console.log(`items ${JSON.stringify(items)}`);
  const itemFilter = await calculate(items, event.amount);
  console.log(`itemFilter ${JSON.stringify(itemFilter)}`);
  console.log(`total ${JSON.stringify(total)}`);
  return {
      statusCode: 200,
      body: JSON.stringify({
          item_ids : itemFilter,
          total: Number(total)
      })
  };
};

async function getPrice(itemId, redisConnect) {
  let result = await redisClient.getRedis(itemId, redisConnect);
  if (result == null) {
    const product = await requestClient.requestObject(itemId);
    await redisClient.setRedis(itemId, product.price, redisConnect);
    return product.price;
  }else{
    return result.price;
  }
}

async function calculate (itemsOrder, amount) {
  const itemsResult = [];
  let i = 0;
  total = 0;
  while(i < itemsOrder.length) {
    if (amount - itemsOrder[i].price > 0) {
        if(itemsResult.find(itm => itm == itemsOrder[i].id) == undefined){
            itemsResult.push(itemsOrder[i].id);
            amount -= itemsOrder[i].price;
            total += Number(itemsOrder[i].price);
        }
    }
    i++;
  }
  console.log("itemsResult ", itemsResult);
  return itemsResult;
}