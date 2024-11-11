from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
import uuid

class User_Profile(models.Model):
    user               = models.OneToOneField(User, null=True ,on_delete=models.CASCADE)
    first_name         = models.CharField(max_length=100, null=True,)
    last_name          = models.CharField(max_length=100, null=True,)
    phone              = models.CharField(max_length=15, null=True, blank=True)
    email              = models.EmailField(max_length=100, null=True,unique=True)
    is_register_seller = models.BooleanField(default=False)
    date_joined        = models.DateTimeField(("date joined"), default=timezone.now)

    def __str__(self):
        return self.user.username

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

class Product(models.Model):
    seller      = models.ForeignKey(User_Profile, on_delete=models.CASCADE)
    category    = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='products')
    name        = models.CharField(max_length = 100)
    image       = models.ImageField(null=True, blank=True, default='../media/default.jpeg')
    description = models.TextField()
    stock       = models.PositiveIntegerField()
    created_at  = models.DateTimeField(auto_now_add=True)
    price       = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name
    
class Review(models.Model):
    user      = models.ForeignKey(User_Profile, on_delete=models.CASCADE)
    product   = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='reviews')
    review    = models.TextField(blank=True, null=True) 
    created_at = models.DateTimeField(auto_now_add=True)

    RATING_CHOICES = [(i * 0.5, f"{i * 0.5}") for i in range(11)]
    
    rating = models.FloatField(
        choices=RATING_CHOICES,
        null=True,  
        blank=True, 
        default=None, 
    )
    
class Cart(models.Model):
    user    = models.OneToOneField(User_Profile, on_delete=models.CASCADE, null=True, blank=True)

class CartItem(models.Model):
    cart     = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='cart_items')
    product  = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

class Order(models.Model):
    user           = models.ForeignKey(User_Profile, on_delete=models.CASCADE, null=True, blank=True)
    ordered_at     = models.DateTimeField(auto_now_add=True)
    total_price    = models.DecimalField(max_digits=10, decimal_places=2)
    status_choices = [
        ('pending', 'Pending'),
        ('complete', 'Complete'),
        ('cancel', 'Cancel')
        ]
    status         = models.CharField(max_length=50, choices=status_choices, default="pending")

class OrderItem(models.Model):
    order       = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='order_items')
    product     = models.ForeignKey(Product, on_delete=models.CASCADE)
    item_price  = models.DecimalField(max_digits=10, decimal_places=2)
    quantity    = models.PositiveIntegerField()

class ShippingAddress(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE)
    address_line_1 = models.CharField(max_length=255)
    address_line_2 = models.CharField(max_length=255, blank=True)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20)
    country = models.CharField(max_length=100)
