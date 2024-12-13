# API Documentation

## Database Endpoints

### Users
- **URL**: `/api/users/`
- **Methods**: `GET`, `POST`

### Categories
- **URL**: `/api/categories/`
- **Methods**: `GET`, `POST`

### Products
- **URL**: `/api/products/`
- **Methods**: `GET`, `POST`

### Carts
- **URL**: `/api/carts/`
- **Methods**: `GET`, `POST`

### Cart Items
- **URL**: `/api/cartitems/`
- **Methods**: `GET`, `POST`

### Orders
- **URL**: `/api/orders/`
- **Methods**: `GET`, `POST`
  
### Order Items
- **URL**: `/api/orderitems/`
- **Methods**: `GET`, `POST`

### Shipping Addresses 
- **URL**: `/api/shippingaddresses/`
- **Methods**: `GET`, `POST`

### Reviews
- **URL**: `/api/reviews/`
- **Methods**: `GET`, `POST`

---


## User Endpoints

### Token Authentication

#### Obtain Token
- **URL**: `/auth/token/`
- **Methods**: `POST`

**Request Example:**
```http
POST /auth/token/
Content-Type: application/json

{
    "username": "user@example.com",
    "password": "password123"
}
```
**Response Example:**
```http
{
    "refresh": "<refresh_token>",
    "access": "<access_token>"
}

```
#### Refresh Token
- **URL**: `/auth/token/refresh/`
- **Methods**: `POST`

**Request Example:**
```http
POST /auth/token/refresh/
Content-Type: application/json

{
    "refresh": "<refresh_token>"
}
```
**Response Example:**
```http
{
    "access": "<new_access_token>"
}
```
---

## Product Endpoints

#### Create a Product

#### 
- **URL**: `/product/create/`
- **Methods**: `POST`

**Request Example:**
```http
POST /product/create/
Content-Type: application/json

{
    "name": "Sample Product",
    "price": 25.99,
    "category": 1,
    "stock": 100,
    "description": "A sample product description."
}
```
**Response Example:**
```http
{
    "id": 1,
    "name": "Sample Product",
    "price": 25.99,
    "category": "Electronics",
    "stock": 100,
    "description": "A sample product description."
}
```
