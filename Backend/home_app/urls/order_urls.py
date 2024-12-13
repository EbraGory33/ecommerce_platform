from django.urls import path
from ..views.order_views import *


urlpatterns = [
    path('createOrders/', createOrder, name='CREATE_ORDER'),
    path('getOrders/<int:order_id>', getOrder, name='GET_ORDER'),
    path('getUserOrders/', getUserOrder, name='GET_USER_ORDER'),
    path('cancelOrder/<int:order_id>', cancelOrder, name='CANCEL_ORDER'),
    path('deleteOrder/<int:order_id>', deleteOrder, name='DELETE_ORDER')
]