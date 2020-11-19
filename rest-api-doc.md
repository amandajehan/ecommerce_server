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

# Show Product by Id
Returns json data of a product with specific id

### URL:
`/products/:id`

### Method:
`GET`

### URL Params:
Required: `id = [integer]`

### Data Params:
None

### Success Response:
Status: 200 OK
```
json 
{
  "id": 2,
  "name": "TV Samsung",
  "image_url": "https://static.bmdstatic.com/pk/product/medium/5ea1502a916fc.jpg",
  "price": 10000000,
  "stock": 10,
  "userId": 1,
  "category": "gadget"
}
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
  url: '/products/${payload.id}',
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
  url: '/home',
  method: 'GET',
  headers: {
    token
  }
})
```


# Show All Cart items
Returns json data of all user's products in cart

### URL:
`/cart`

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
    "name": "Kafka on The Shore",
    "image_url": "https://images-na.ssl-images-amazon.com/images/I/81zvseHim4L.jpg",
    "price": 150000,
    "stock": 100,
    "userId": 1,
    "category": "Fiction",
    "createdAt": "2020-11-17T17:36:06.003Z",
    "updatedAt": "2020-11-17T17:36:06.003Z"
  },
  {
    "id": 2,
    "name": "The Sun and Her Flowers",
    "image_url": "https://static1.squarespace.com/static/5a0f55d16957daf24313e4bb/5a0f579ae2c483c904e218fd/5a25a1e8c83025f26c420b54/1512420568544/Kaur%2C+Rupi+-+The+Sun+and+Her+Flowers+-+Cover.jpg?format=1500w",
    "price": 125000,
    "stock": 145,
    "userId": 1,
    "category": "Poetry",
    "createdAt": "2020-11-17T17:39:45.095Z",
    "updatedAt": "2020-11-18T04:01:24.020Z"
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
  url: '/home',
  method: 'GET',
  headers: {
    token
  }
})
```


# Add Product to Cart
Add product to cart

### URL:
`/cart`

### Method:
`POST`

### URL Params:
None

### Data Params:
`productId = [integer]`,
`userId = [integer]`,
`quantity = [integer]`,
`status = [boolean]`,


### Success Response:
Status: 201 Created
```
json 
{
  "Cart": {
    "productId": 2,
    "userId": 2,
    "quantity": 2,
    "updatedAt": "2020-11-18T03:41:34.093Z",
    "createdAt": "2020-11-18T03:41:34.093Z",
    "status": false
    }
}
```

### Error Response
Status: 400 Bad Request
```
json 
{
  "errors": [ "Product ID is required", "Quantity is required"]
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
  url: '/cart',
  method: 'POST',
  data: {
    productId: payload.productId,
    quantity: payload.quantity
  },
  headers: {
  	token
  }
})
```


# Update a Product Quantity in Cart
Update quantity of product in cart

### URL:
`/cart/:id`

### Method:
`PATCH`

### URL Params:
Required: `id: [integer]`

### Data Params:
`quantity = [integer]`,

### Success Response:
Status: 200 OK
```
json 
{
  "Cart": {
    "productId": 2,
    "userId": 2,
    "quantity": 5,
    "status": false,
    "createdAt": "2020-11-18T03:41:34.093Z",
    "updatedAt": "2020-11-18T03:52:41.795Z"
    }
}
```

### Error Response:
Status: 400 Bad Request
```
json 
{
  "errors": [ "Quantity is required" ]
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
  url: `/cart/${payload.id}`,
  method: 'PUT',
  data: {
    quantity: payload.quantity
  },
  headers: {
    token
  }
})
```


# Checkout Cart
Update cart's status

### URL:
`/cart`

### Method:
`PATCH`

### URL Params:
None

### Data Params:
None

### Success Response:
Status: 200 OK
```
json 
{
    "msg": "checkout success"
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
  url: `/cart`,
  method: 'PATCH',
  headers: {
    token
  }
})
```


# Delete a Cart
Delete a json data of a Cart

### URL:
`/cart/:id`

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
	message: "remove product from cart succeed"
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
  url: `/cart/${id}`,
  method: 'DELETE',
  headers: {
    token
  }
})
```

# Show All Banners
Returns json data of all existing Banners

### URL:
`/banners`

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
{
  "id": 1,
  "title": "10% Sale",
  "status": "inactive",
  "image_url": "https://www.bca.co.id/-/media/Images/Default/201809/20180924-periplus-banner.ashx"
}
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
  url: '/banners',
  method: 'GET'
})
```

# Show Banner by Id
Returns json data of a banner with specific id

### URL:
`/banners/:id`

### Method:
`GET`

### URL Params:
Required: `id = [integer]`

### Data Params:
None

### Success Response:
Status: 200 OK
```
json 
{
  "id": 1,
  "title": "10% Sale",
  "status": "inactive",
  "image_url": "https://www.bca.co.id/-/media/Images/Default/201809/20180924-periplus-banner.ashx"
}
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
  url: '/banners/${payload.id}',
  method: 'GET',
  headers: {
    token,
    role
  }
})
```


# Create New Banner
To create a new banner, returns json data about a new banner

### URL:
`/product`

### Method:
`POST`

### URL Params:
None

### Data Params:
`title = [string]`,
`status = [string]`,
`image_url = [string]`

### Success Response:
Status: 201 Created
```
json 
{
  "id": 1,
  "title": "10% Sale",
  "status": "inactive",
  "image_url": "https://www.bca.co.id/-/media/Images/Default/201809/20180924-periplus-banner.ashx"
}
```

### Error Response
Status: 400 Bad Request
```
json 
{
  "errors": ["title banner is required", "status banner is required", "image url banner is required", "invalid image url format"
  ]
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
  url: '/banners',
  method: 'POST',
  data: {
    name: payload.name,
    status: payload.status,
    image_url: payload.image_url
  },
  headers: {
  	token,
    role
  }
})
```


# Update a Banner
User with role admin can update all fields of a Banner, returns updated json data of a Banner

### URL:
`/banners/:id`

### Method:
`PUT`

### URL Params:
Required: `id: [integer]`

### Data Params:
`title = [string]`,
`status = [string]`,
`image_url = [string]`

### Success Response:
Status: 200 OK
```
json 
{
  "id": 1,
  "title": "50% Sale",
  "status": "active",
  "image_url": "https://www.bca.co.id/-/media/Images/Default/201809/20180924-periplus-banner.ashx"
}
```

### Error Response:
Status: 400 Bad Request
```
json 
{
  "errors": ["title banner is required", "status banner is required", "image url banner is required", "invalid image url format"
  ]
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
  url: `/banners/${payload.id}`,
  method: 'PUT',
  data: {
    name: payload.name,
    status: payload.status,
    image_url: payload.image_url
  },
  headers: {
    token,
    role
  }
})
```


# Delete a Banner
Delete a json data of a Banner

### URL:
`/banners/:id`

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
	message: "delete banner success"
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
  url: `/banners/${id}`,
  method: 'DELETE',
  headers: {
    token,
    role
  }
})
```