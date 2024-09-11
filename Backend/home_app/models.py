from django.db import models
import uuid

# User Model for visitors or user that uses the Website
class User(models.Model):
    first_name       = models.CharField(max_length=50, blank=True, null=True)
    last_name        = models.CharField(max_length=50, blank=True, null=True)
    phone            = models.CharField(max_length=15, blank=True, null=True)
    email            = models.EmailField(max_length=100, blank=True, null=True, unique=False)
    username         = models.CharField(max_length=50, blank=True, null=True, unique=False)
    is_register_user = models.BooleanField(default=False)
    date_joined      = models.DateTimeField(auto_now_add=True)

# Session Model to track guest users' carts and orders
class Session(models.Model):
    session_key = models.CharField(max_length=255, unique=True, default=uuid.uuid4)  # Unique identifier for the session
    created_at  = models.DateTimeField(auto_now_add=True)
    expires_at  = models.DateTimeField()

# Extends the User Model into a Seller Model where the User gains permission to create and sell products
class Seller(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

# Used to organize product by first the category element then by certain trigger words in description.
class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True, null=True)

# The items that sold. They can be referenced by CartItems and OrderItems
class Product(models.Model):
    seller      = models.ForeignKey(Seller, on_delete=models.CASCADE)
    category    = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='products')
    name        = models.CharField(max_length = 100)
    description = models.TextField()
    stock       = models.PositiveIntegerField()
    image       = models.ImageField(upload_to='products/')
    created_at  = models.DateTimeField(auto_now_add=True)
    price       = models.DecimalField(max_digits=10, decimal_places=2)

# Unique Cart one-to-one to each Registered User and un-registered User
class Cart(models.Model):
    user    = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)
    session = models.OneToOneField(Session, on_delete=models.CASCADE, null=True, blank=True)

# Used to reference both the Product and Cart, Main function should be to add products to cart
class CartItems(models.Model):
    cart    = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='cart_items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

#
class Orders(models.Model):
    user           = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    session        = models.ForeignKey(Session, on_delete=models.CASCADE, null=True, blank=True)
    ordered_at     = models.DateTimeField(auto_now_add=True)
    total_price    = models.DecimalField(max_digits=10, decimal_places=2)
    status_choices = [
        ('pending', 'Pending'),
        ('shipped', 'Shipped'),
        ('delivered', 'Delivered'),
        ('canceled', 'Canceled'),
        ('returned', 'Returned')
        ]
    status     = models.CharField(max_length=50, choices=status_choices, default="pending")

# Used to reference both the Product and Order during and after transaction , Main function should be to connect products to order
class OrderItems(models.Model):
    order   = models.ForeignKey(Orders, on_delete=models.CASCADE, related_name='order_items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()

class ShippingAddress(models.Model):
    order = models.OneToOneField(Orders, on_delete=models.CASCADE)
    address_line_1 = models.CharField(max_length=255)
    address_line_2 = models.CharField(max_length=255, blank=True)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20)
    country = models.CharField(max_length=100)

# many review to one User model, Used to rate the product on a 1-5 scale as well as gives user the opertunity to write a review of the product
class Review(models.Model):
    user      = models.ForeignKey(User, on_delete=models.CASCADE)
    product   = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='reviews')
    review    = models.TextField(blank=True, null=True) 
    created_at = models.DateTimeField(auto_now_add=True)

    RATING_CHOICES = [(i * 0.5, f"{i * 0.5}") for i in range(11)]
    
    rating = models.DecimalField(
        max_digits=3,  # Enough to hold values like 5.0
        decimal_places=1,  # One decimal place
        choices=RATING_CHOICES,
        null=True,  
        blank=True, 
        default=None, 
    )

