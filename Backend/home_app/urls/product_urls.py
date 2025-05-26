from django.urls import path
from ..views.product_views import *


urlpatterns = [
    path('create/', create_Product, name='CREATE_PRODUCT'),
    path('upload/', uploadImage, name="image-upload"),
    path('edit/<int:pk>', edit_Product, name='EDIT_PRODUCT'),
    path('delete/<int:pk>', delete_Product, name='DELETE_PRODUCT'),
    path('featured_Products/', FeaturedProducts, name='featured_products'),
    path('post_review/', postReview, name='post-review'),
    path('category_products/<int:category_id>/', get_products_by_category, name='category-products'),
    path('search/', get_products_by_search, name='search')
]