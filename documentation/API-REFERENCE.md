# API-REFERENCES

### AUTH

POST /api/v1/auth/register

request:
body:
{
"nombre": "Juan",
"apellido": "Pérez",
"email": "juan@email.com",
"password": "123456",
"telefono": "912345678"
}

response:
{
"message": "Usuario registrado correctamente",
"user": {
"id_usuario": 1,
"nombre": "Juan",
"apellido": "Pérez",
"email": "juan@email.com"
}
}

POST /api/v1/auth/login

request:
body:
{
"email": "juan@email.com",
"password": "123456"
}

response:
{
"message": "Login exitoso",
"token": "jwt_token",
"user": {
"id_usuario": 1,
"nombre": "Juan",
"email": "juan@email.com",
"rol": "cliente"
}
}

### USUARIOS

GET /api/v1/users/me

request:
headers:
{
"Authorization": "Bearer jwt_token"
}

response:
{
"id_usuario": 1,
"nombre": "Juan",
"apellido": "Pérez",
"email": "juan@email.com",
"telefono": "912345678",
"rol": "cliente"
}

### CATEGORÍAS

GET /api/v1/categories

request:
body:
{}

response:
[
{
"id_categoria": 1,
"nombre": "Mariscos",
"descripcion": "Productos del mar congelados"
},
{
"id_categoria": 2,
"nombre": "Pulpas",
"descripcion": "Pulpas de fruta congeladas"
}
]

POST /api/v1/categories

request:
headers:
{
"Authorization": "Bearer jwt_token"
}

body:
{
"nombre": "Verduras",
"descripcion": "Verduras congeladas"
}

response:
{
"message": "Categoría creada correctamente",
"category": {
"id_categoria": 3,
"nombre": "Verduras",
"descripcion": "Verduras congeladas"
}
}

### PRODUCTOS

GET /api/v1/products

request:
query params:
{
"categoria": 1,
"search": "camarón",
"page": 1,
"limit": 10
}

response:
{
"data": [
{
"id_producto": 1,
"nombre": "Camarón Precocido",
"descripcion": "Bolsa 500 g",
"precio": 8990,
"stock": 20,
"imagen_url": "/images/camaron.jpg",
"id_categoria": 1
}
],
"pagination": {
"page": 1,
"limit": 10,
"total": 1
}
}

GET /api/v1/products/:id

request:
params:
{
"id": 1
}

response:
{
"id_producto": 1,
"nombre": "Camarón Precocido",
"descripcion": "Bolsa 500 g",
"precio": 8990,
"stock": 20,
"imagen_url": "/images/camaron.jpg",
"activo": true,
"id_categoria": 1
}

POST /api/v1/products

request:
headers:
{
"Authorization": "Bearer jwt_token"
}

body:
{
"nombre": "Camarón Precocido",
"descripcion": "Bolsa 500 g",
"precio": 8990,
"stock": 20,
"imagen_url": "/images/camaron.jpg",
"id_categoria": 1
}

response:
{
"message": "Producto creado correctamente",
"product": {
"id_producto": 1,
"nombre": "Camarón Precocido",
"precio": 8990,
"stock": 20,
"id_categoria": 1
}
}

PUT /api/v1/products/:id

request:
headers:
{
"Authorization": "Bearer jwt_token"
}

params:
{
"id": 1
}

body:
{
"nombre": "Camarón Precocido Premium",
"descripcion": "Bolsa 500 g",
"precio": 9490,
"stock": 18,
"imagen_url": "/images/camaron-premium.jpg",
"id_categoria": 1
}

response:
{
"message": "Producto actualizado correctamente",
"product": {
"id_producto": 1,
"nombre": "Camarón Precocido Premium",
"precio": 9490,
"stock": 18,
"id_categoria": 1
}
}

DELETE /api/v1/products/:id

request:
headers:
{
"Authorization": "Bearer jwt_token"
}

params:
{
"id": 1
}

response:
{
"message": "Producto eliminado correctamente"
}

### CARRITO

GET /api/v1/cart

request:
headers:
{
"Authorization": "Bearer jwt_token"
}

response:
{
"id_carrito": 3,
"id_usuario": 1,
"estado": "activo",
"items": [
{
"id_detalle_carrito": 1,
"id_producto": 2,
"nombre": "Pulpa de Frutilla",
"cantidad": 2,
"precio_unitario": 3990,
"subtotal": 7980
}
],
"total": 7980
}

POST /api/v1/cart/items

request:
headers:
{
"Authorization": "Bearer jwt_token"
}

body:
{
"id_producto": 2,
"cantidad": 2
}

response:
{
"message": "Producto agregado al carrito",
"item": {
"id_detalle_carrito": 1,
"id_producto": 2,
"cantidad": 2,
"precio_unitario": 3990
}
}

PUT /api/v1/cart/items/:id

request:
headers:
{
"Authorization": "Bearer jwt_token"
}

params:
{
"id": 1
}

body:
{
"cantidad": 3
}

response:
{
"message": "Cantidad actualizada correctamente",
"item": {
"id_detalle_carrito": 1,
"id_producto": 2,
"cantidad": 3,
"precio_unitario": 3990
}
}

DELETE /api/v1/cart/items/:id

request:
headers:
{
"Authorization": "Bearer jwt_token"
}

params:
{
"id": 1
}

response:
{
"message": "Producto eliminado del carrito"
}

DELETE /api/v1/cart/clear

request:
headers:
{
"Authorization": "Bearer jwt_token"
}

response:
{
"message": "Carrito vaciado correctamente"
}

### PEDIDOS

POST /api/v1/orders

request:
headers:
{
"Authorization": "Bearer jwt_token"
}

body:
{
"direccion_envio": "Calle Ejemplo 123, Valparaíso",
"metodo_pago": "transferencia"
}

response:
{
"message": "Pedido creado correctamente",
"order": {
"id_pedido": 15,
"id_usuario": 1,
"fecha_pedido": "2026-03-18T14:20:00Z",
"estado": "pendiente",
"total": 15980,
"direccion_envio": "Calle Ejemplo 123, Valparaíso",
"metodo_pago": "transferencia"
}
}

GET /api/v1/orders

request:
headers:
{
"Authorization": "Bearer jwt_token"
}

response:
[
{
"id_pedido": 15,
"fecha_pedido": "2026-03-18T14:20:00Z",
"estado": "pendiente",
"total": 15980
},
{
"id_pedido": 16,
"fecha_pedido": "2026-03-10T11:00:00Z",
"estado": "entregado",
"total": 8990
}
]

GET /api/v1/orders/:id

request:
headers:
{
"Authorization": "Bearer jwt_token"
}

params:
{
"id": 15
}

response:
{
"id_pedido": 15,
"id_usuario": 1,
"fecha_pedido": "2026-03-18T14:20:00Z",
"estado": "pendiente",
"total": 15980,
"direccion_envio": "Calle Ejemplo 123, Valparaíso",
"metodo_pago": "transferencia",
"items": [
{
"id_producto": 2,
"nombre": "Pulpa de Frutilla",
"cantidad": 2,
"precio_unitario": 3990,
"subtotal": 7980
},
{
"id_producto": 4,
"nombre": "Camarón Precocido",
"cantidad": 1,
"precio_unitario": 8000,
"subtotal": 8000
}
]
}

PATCH /api/v1/orders/:id/status

request:
headers:
{
"Authorization": "Bearer jwt_token"
}

params:
{
"id": 15
}

body:
{
"estado": "enviado"
}

response:
{
"message": "Estado del pedido actualizado correctamente",
"order": {
"id_pedido": 15,
"estado": "enviado"
}
}

### PAGOS

POST /api/v1/payments

request:
headers:
{
"Authorization": "Bearer jwt_token"
}

body:
{
"id_pedido": 15,
"monto": 15980,
"metodo_pago": "transferencia",
"referencia_transaccion": "TRX123456"
}

response:
{
"message": "Pago registrado correctamente",
"payment": {
"id_pago": 1,
"id_pedido": 15,
"monto": 15980,
"estado_pago": "pagado",
"metodo_pago": "transferencia",
"referencia_transaccion": "TRX123456"
}
}

GET /api/v1/payments/:id

request:
headers:
{
"Authorization": "Bearer jwt_token"
}

params:
{
"id": 1
}

response:
{
"id_pago": 1,
"id_pedido": 15,
"monto": 15980,
"fecha_pago": "2026-03-18T14:35:00Z",
"estado_pago": "pagado",
"metodo_pago": "transferencia",
"referencia_transaccion": "TRX123456"
}
