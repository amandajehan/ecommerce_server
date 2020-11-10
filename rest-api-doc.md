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
	message: 'login is success',
	email: 'amandajehan@gmail.com',
	access_token: 'eyeskjehslerawioderjlwa',
	role: 'admin'
}
```

### Error Response:
Status: 400 
```
json
{
	error: " "
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
{
  "id": 1,
	"name": "Smartphone",
	"image_url": "",
	"price": 3000000,
	"stock": 10,
  "createdAt": "2020-11-03T17:19:19.799Z",
  "updatedAt": "2020-11-03T17:25:00.578Z"
}
```

### Error Response
Status: 404 Not Found
```
json {
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
`name = [string]`
`image_url = [string]`
`price = [integer]`
`stock = [integer]`


### Success Response:
Status: 201 Created
```
json 
{
  "id": 1,
	"name": "Smartphone",
	"image_url": "",
	"price": 3000000,
	"stock": 10,
  "createdAt": "2020-11-03T17:19:19.799Z",
  "updatedAt": "2020-11-03T17:25:00.578Z"
}
```

### Error Response
Status: 400 Bad Request
```
json {
	error: "name is required, image_url is required, price is required, stock is required"
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
`name = [string]`
`image_url = [string]`
`price = [integer]`
`stock = [integer]`

### Success Response:
Status: 200 OK
```
json 
{
  "id": 1,
	"name": "Computer",
	"image_url": "",
	"price": 5000000,
	"stock": 5,
  "createdAt": "2020-11-03T17:19:19.799Z",
  "updatedAt": "2020-11-03T17:25:00.578Z"
}
```

### Error Response:
Status: 400 Bad Request
```
json {
	error: "name is required, image_url is required, price is required, stock is required"
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
	message: "product is deleted successfully."
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

```
