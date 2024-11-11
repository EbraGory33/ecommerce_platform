from django.urls import path
from ..views.payment_views import *

urlpatterns = [
    path('create-payment-intent/', create_payment_intent, name='create-payment-intent'),
]
