# E-Commerce Platform

A full-stack and feature-rich e-commerce platform built with Django, React, and Docker, deployed on AWS. This project demonstrates core functionalities such as user authentication, product listings, shopping cart, order management, and payment integration.

## Key Features

- User Authentication: Secure login, registration, and user management using JWT.

- Product Listings: Organized products by categories with search and filtering capabilities.

- Shopping Cart: Add, update, and remove products from the cart.

- Order Management: Place orders and track them through user dashboards.
  
- Payment Integration: Embedded Stripe for secure payment processing.

- Responsive Frontend: Built with React to deliver a seamless user experience.

- Scalable Deployment: Dockerized services with a PostgreSQL database.

## Technologies Used

### Backend

- Django: REST API implementation.

- Django Rest Framework (DRF): API development.

- PostgreSQL: Database for persistent storage.

- Gunicorn: WSGI server for deploying Django applications.

### Frontend

- React: Frontend framework for user interfaces.

- Axios: API calls from React to the backend.

### Deployment

- Docker: Containerization for both backend and frontend.

### Payments

- Stripe: Integration for handling online payments.

### Additional Tools

- Redis: Caching for improved API performance.

### Installation and Setup

#### Prerequisites

Ensure you have the following installed on your machine:

- Docker

- Docker Compose

#### Local Development Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/EbraGory33/ecommerce_platform.git
    cd ecommerce-platform
    ```

2. Install Dependencies
    ```bash
    cd backend
    python freeze > requirements.txt
    ```

3. Set up Stripe and PostgresSQL (Optional):

   - Update settings.py for Stripe and PostgresSQL
   - Update /ecommerce_platform/frontend/src/screens/order/checkout/CheckoutScreen.js to use Stripe Checkout

4. Populate The Database
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   python manage.py import_users
   python manage.py import_profiles
   python manage.py import_categories
   python manage.py import_products
   python manage.py import_reviews
   ```

5. Build and start the application:
    ```bash
    cd .. #ecommerce-platform 
    docker-compose up --build
    ```

6. Access the application:

    - Backend API: http://localhost:8000

    - Frontend: http://localhost:3000

### Contributing

1. Fork the repository.

2. Create a feature branch:
 git checkout -b feature-name

3. Commit your changes and push to the branch:
    git push origin feature-name

4. Submit a pull request.

### Contact

For questions or collaboration, please reach out to:

- Name: Ebrahim Gory

- Email: EbrahimGory3@gmail.com

- GitHub: https://github.com/EbraGory33
