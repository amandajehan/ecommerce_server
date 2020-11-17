# Register User (customer)
Register for user customer

### URL:
`/register`

### Method:
`POST`

### URL Params:
None

### Data Params:
None

### Success Response:
Status: 201 Created
```
json
{
  "id": 1,
  "email": "admin@mail.com"
}
```

### Error Response:
Status: 400 

```
json
{
	error: "invalid email / password"
}
```

Or

```
json
{
	error: "e-mail and password are required"
}
```

Or

Status: 500 Internal Server Error
```
json
{
	error: "Internal Server Error"
}
```

### Request:
```
axios({
  url: '/login',
  method: 'POST',
  data: {
    email: payload.email,
    password: payload.password
  }
})
```

# Login User
Login for existing user, returns an access token

### URL:
`/login`

### Method:
`POST`

### URL Params:
None

### Data Params:
None

### Success Response:
Status: 200 OK
```
json
{
  "message": "login success",
  "email": "admin@mail.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTYwNTMyODU3Mn0.VHlkddMB55MKmUPV1WXsje2ekP_6gnwn9nj981vOeJE",
  "role": "admin"
}
```

### Error Response:
Status: 400 

```
json
{
	error: "invalid email / password"
}
```

Or

```
json
{
	error: "e-mail and password are required"
}
```

Or

Status: 500 Internal Server Error
```
json
{
	error: "Internal Server Error"
}
```

### Request:
```
axios({
  url: '/login',
  method: 'POST',
  data: {
    email: payload.email,
    password: payload.password
  }
})
```


# Show All Products
Returns json data of all existing Products

### URL:
`/products`

### Method:
`GET`

### URL Params:
None

### Data Params:
None

### Success Response:
Status: 200 OK
```
json 
[
  {
    "id": 1,
    "name": "PlayStation 5",
    "image_url": "https://gmedia.playstation.com/is/image/SIEPDC/playstation-5-with-dualsense-front-product-shot-01-ps5-en-30jul20?$native--t$",
  	"price": 700000,
    "stock": 4,
    "userId": 1,
    "category": "game",
  },
  {
    "id": 2,
    "name": "TV Samsung",
    "image_url": "https://static.bmdstatic.com/pk/product/medium/5ea1502a916fc.jpg",
    "price": 10000000,
    "stock": 10,
    "userId": 1,
    "category": "gadget",
    }
]
```

### Error Response
Status: 404 Not Found
```
json 
{
	error: "Not found"
}
```

Or

Status: 500 Internal Server Error
```
json
{
	error = "Internal Server Error"
}
```


### Request:
```
axios({
  url: '/products',
  method: 'GET',
  headers: {
    token,
    role
  }
})
```

# Create New Product
To create a new product, returns json data about a new product

### URL:
`/product`

### Method:
`POST`

### URL Params:
None

### Data Params:
`name = [string]`,
`image_url = [string]`,
`price = [double]`,
`stock = [integer]`,
`category = [string]`,
`userId = [integer]`


### Success Response:
Status: 201 Created
```
json 
{
  "id": 3,
  "name": "Macbook",
  "image_url": "https://i.gadgets360cdn.com/products/laptops/large/1546457015_635_apple_macbook-air-mrea2hn-a.jpg",
  "price": 1500000,
  "stock": 5,
  "category": "gadget",
  "userId": 1
}
```

### Error Response
Status: 400 Bad Request
```
json {
	error: "name is required, image_url is required, price is required, stock is required, category is required"
}
```

Or

Status: 500 Internal Server Error
```
json
{
	error = "Internal Server Error"
}
```

### Request
```
axios({
  url: '/products',
  method: 'POST',
  data: {
    name: payload.name,
    image_url: payload.image_url,
    price: payload.price,
    stock: payload.stock,
		category: payload.category
  },
  headers: {
  	token,
    role
  }
})
```


# Update a Product
User with role admin can update all fields of a Product, returns updated json data of a Product

### URL:
`/products/:id`

### Method:
`PUT`

### URL Params:
Required: `id: [integer]`

### Data Params:
`name = [string]`,
`image_url = [string]`,
`price = [double]`,
`stock = [integer]`,
`category = [string]`

### Success Response:
Status: 200 OK
```
json 
{
  "id": 1,
  "name": "PlayStation 5",
  "image_url": "https://gmedia.playstation.com/is/image/SIEPDC/playstation-5-with-dualsense-front-product-shot-01-ps5-en-30jul20?$native--t$",
  "price": 700000,
  "stock": 4,
  "userId": 1,
  "category": "game",
}
```

### Error Response:
Status: 400 Bad Request
```
json {
	error: "name is required, image_url is required, price is required, stock is required, category is required"
}
```

Or

Status: 404 NotFound
```
json 
{
	error: "Not Found"
}
```

Or

Status: 500 Internal Server Error
```
json
{
	error = "Internal Server Error"
}
```

### Request:
```
axios({
  url: `/products/${payload.id}`,
  method: 'PUT',
  data: {
    name: payload.name,
    image_url: payload.image_url,
    price: payload.price,
    stock: payload.stock
  },
  headers: {
    token,
    role
  }
})
```


# Delete a Product
Delete a json data of a Product

### URL:
`/products/:id`

### Method:
`DELETE`

### URL Params:
Required: `id = [integer]`

### Data Params:
None

### Success Response:
Status: 200 OK
```
json
{
	message: "delete product success"
}
```

### Error Response:
Status: 404 NotFound
```
json 
{
	error: "Not Found"
}
```

Or

Status: 500 Internal Server Error
```
json
{
	error = "Internal Server Error"
}
```

### Request:
```
axios({
  url: `/products/${id}`,
  method: 'DELETE',
  headers: {
    token,
    role
  }
})
```
