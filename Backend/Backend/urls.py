"""
URL configuration for Backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.routers import DefaultRouter
from home_app.views.user_views import UsersViewSet, Profile_UsersViewSet
from home_app.views.product_views import CategoryViewSet, ProductViewSet, AdminProductsViewSet, OrderViewSet, OrderItemViewSet,  ShippingAddressViewSet, ReviewViewSet
from home_app.views.cart_views import CartViewSet, CartItemViewSet

from django.conf import settings  # Import settings
from django.conf.urls.static import static 

router = DefaultRouter()

router.register('users', UsersViewSet)
router.register('profile_users', Profile_UsersViewSet)
router.register('seller_products', AdminProductsViewSet, basename='admin-products')
router.register('categories', CategoryViewSet)
router.register('products', ProductViewSet)
router.register('carts', CartViewSet)
router.register('cartitems', CartItemViewSet)
router.register('orders', OrderViewSet)
router.register('orderitems', OrderItemViewSet)
router.register('shippingaddresses', ShippingAddressViewSet)
router.register('reviews', ReviewViewSet)

@api_view(['GET'])
def getRoutes(request):
    routes = [
        'http://127.0.0.1:8000/admin/',
        'http://127.0.0.1:8000/api/',
        'http://127.0.0.1:8000/auth/',
        'http://127.0.0.1:8000/product/',
        'http://127.0.0.1:8000/cart/',
    ]
    return Response(routes)


urlpatterns = [
    path('',getRoutes),
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('auth/', include('home_app.urls.user_urls')),  # User-related URLs
    path('product/', include('home_app.urls.product_urls')),  # Product-related URLs
    path('cart/', include('home_app.urls.cart_urls')),  # Cart-related URLs
    path('payment/', include('home_app.urls.payment_urls'))
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
