# couponService

API Challenge Coupon

Desarollada en NODEJS y desplegada en AWS-Lambda

## Parametros
Para desplegar se requiere configurar los siguientes parametros

**`URL_GET_PRICE`**	URL para obtener el precio de los articulos, debe retornar un objeto JSON con minimo los siguientes atributos

``` js
  {
	  'id': 'MLA599260060',
	  'price': 130
	  ...
  }
```

**`REDISHOST`**	URL de cache en AWS ElastiCache - REDIS
**`REDISPORT`**	Puerto de cache en AWS ElastiCache - REDIS

En ella almacenamos la respuesta obtenida del servicio de precios, así disminuir la cantidad de consultas realizadas al servicio y reducir el tiempo de respuesta.
En ElastiCache - REDIS almacenamos un objeto **`llave-valor`** con la siguiente estructura
**`llave`** "MLA599260060"
**`valor`** "{'id': 'MLA599260060','price': 130...}"


## Pruebas del servicio
Para realizar las pruebas del servicio realizar una petición **`POST`** a la siguiente [`URL-AWS`](https://7fu651tpac.execute-api.us-west-2.amazonaws.com/beta/meli-coupon)
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

## Cobertura

Las pruebas unitarias se realizaron con JEST.
El resultado de las pruebas unitarias es el siguiente

File                    | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
------------------------|---------|----------|---------|---------|-------------------
All files               |   98.51 |     87.5 |      90 |   98.44 |                   
 src                    |     100 |     87.5 |     100 |     100 |                   
  index.js              |     100 |     87.5 |     100 |     100 | 63                
 src/redis-operations   |   93.75 |      100 |   66.67 |   93.75 |                   
  redis-operations.js   |   93.75 |      100 |   66.67 |   93.75 | 4                 
 src/request-operations |     100 |      100 |     100 |     100 |                   
  request-operations.js |     100 |      100 |     100 |     100 |                   
  
  El proyecto esta configurado para enviar el reporte de las pruebas unitarias a SONARAQUBE