# couponService

API Challenge Coupon

Desarollada en NODEJS y desplegada en AWS-Lambda

##Parametros
Para desplegar se requiere configurar los siguientes parametros

**URL_GET_PRICE**	URL para obtener el precio de los articulos, debe retornar un objeto JSON con minimo los siguientes atributos

``` js
  {
	  'id': 'MLA599260060',
	  'price': 130
	  ...
  }
```

**REDISHOST**	URL de cache en AWS ElastiCache - REDIS
**REDISPORT**	Puerto de cache en AWS ElastiCache - REDIS

En ella almacenamos la respuesta obtenida del servicio de precios, así disminuir la cantidad de consultas realizadas al servicio y reducir el tiempo de respuesta.
En ElastiCache - REDIS almacenamos un objeto **llave-valor** con la siguiente estructura
**llave** "MLA599260060"
**valor** "{'id': 'MLA599260060','price': 130...}"


## Pruebas del servicio
Para realizar las pruebas del servicio realizar una petición **POST** a la siguiente **[`URL`]** (https://7fu651tpac.execute-api.us-west-2.amazonaws.com/beta/meli-coupon)
con el siguiente request

``` js
  {
  "item_ids": [
    "MLA1",
    "MLA5",
    ....
  ],
  "amount": 500
}
```
En el se envia un listado de códigos de artículos y un atributo con el monto disponible