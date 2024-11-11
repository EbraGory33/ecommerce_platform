from django.urls import path
from ..views.cart_views import *

urlpatterns = [
    path('getUserCart', getUserCart, name='getUserCart'),
    path('addToCart/<int:product_id>', AddToCart, name='ADD'),
    path('updateCartItems/<int:product_id>', UpdateCartItem, name='UPDATE'),
    path('removeItem/product/<int:product_id>', RemoveFromCart, name='REMOVE'),
]