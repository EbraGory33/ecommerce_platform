# API Documentation

## Base URL

/api/

## Endpoints Overview

| Model           | List/Create View         | Detail View              | URL Path              | Methods   |
| --------------- | ------------------------ | ------------------------ | --------------------- | --------- |
| **Users**       | `UserViewSet`            | `UserViewSet`            | `/users/`             | GET, POST |
| **Sellers**     | `SellerViewSet`          | `SellerViewSet`          | `/sellers/`           | GET, POST |
| **Categories**  | `CategoryViewSet`        | `CategoryViewSet`        | `/categories/`        | GET, POST |
| **Products**    | `ProductViewSet`         | `ProductViewSet`         | `/products/`          | GET, POST |
| **Carts**       | `CartViewSet`            | `CartViewSet`            | `/carts/`             | GET, POST |
| **Cart Items**  | `CartItemsViewSet`       | `CartItemsViewSet`       | `/cartitems/`         | GET, POST |
| **Orders**      | `OrderViewSet`           | `OrderViewSet`           | `/orders/`            | GET, POST |
| **Order Items** | `OrderItemViewSet`       | `OrderItemViewSet`       | `/orderitems/`        | GET, POST |
| **Shipping**    | `ShippingAddressViewSet` | `ShippingAddressViewSet` | `/shippingaddresses/` | GET, POST |
| **Reviews**     | `ReviewViewSet`          | `ReviewViewSet`          | `/reviews/`           | GET, POST |

---

## User Endpoints

### List All Users or Create a User

- **URL**: `/api/users/`
- **Methods**: `GET`, `POST`

#### GET - Retrieve all users

**Request:**

```http
GET /api/users/
```
