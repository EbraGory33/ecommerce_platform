from home_app.models import User_Profile, Product
from ..serilaizers.product_serializers import *
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAdminUser
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from django.shortcuts import get_object_or_404
from django.db.models import Avg, Value
from django.db.models.functions import Coalesce
from django.db.models import FloatField

@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAdminUser])
def create_Product(request):
    data = request.data
    
    category_name = data.get('category')
    category ,created = Category.objects.get_or_create(Category, name=category_name)
    
    seller = get_object_or_404(User_Profile, id=1)
    name= data.get('name')
    description=data.get('description')
    stock =  data.get('stock')
    price  = data.get('price')
    
    product = Product(
        seller = seller,
        category = category,
        name = name,
        description = description,
        stock = stock,
        price = price
    )
    
    product.save()
    return Response({'id':product.id,"detail": created}, status=status.HTTP_200_OK)

@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAdminUser])
def uploadImage(request):
    product_id = request.data.get('product_id')
    product = get_object_or_404(Product, id=product_id)
    print(product)
    image = request.FILES.get('image')
    print(image)
    if image:
        print(product.name)
        product.image = image
        product.save()

    return Response({"detail": "Image was uploaded"}, status=status.HTTP_200_OK)

@api_view(['PUT'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAdminUser])
def edit_Product(request, pk):
    
    if not request.user.is_authenticated:
        return Response({"detail": "Authentication required."}, status=status.HTTP_401_UNAUTHORIZED)

    try:
        product = Product.objects.get(pk=pk)
    except Product.DoesNotExist:
        return Response({'detail': 'Product not found.'}, status=status.HTTP_404_NOT_FOUND)
    
    if product.seller != request.user.user_profile:
        return Response({"detail": "You do not have permission to edit this product."},status=status.HTTP_403_FORBIDDEN)
            
    serializers = ProductSerializer(product, data=request.data)
    if serializers.is_valid():
        serializers.save()
        return Response(serializers.data, status=status.HTTP_200_OK)
    return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAdminUser])
def delete_Product(request, pk):
    
    try:
        product = Product.objects.get(pk=pk)
    except Product.DoesNotExist:
        return Response({"detail": "Product not found."}, status=status.HTTP_404_NOT_FOUND)
    
    product.delete()
    return Response({"detail": "Product deleted successfully."}, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_products_by_category(request, category_id):
    try:
        category= Category.objects.get(id=category_id)
        products = Product.objects.filter(category=category)
        products_list = [
            {
                'id': product.id,
                'name': product.name,
                'description': product.description,
                'price': product.price,
                'stock': product.stock,
                'image': product.image.url
            }
            for product in products
        ]
        return Response(products_list)
    except Product.DoesNotExist:
        return Response({'error': 'Category not found or no products available'}, status=404)

@api_view(['GET'])
def get_products_by_search(request):
    try:
        keyword = request.GET.get('k') 
        products = Product.objects.filter(name__icontains=keyword)
        products_list = [
            {
                'id': product.id,
                'name': product.name,
                'description': product.description,
                'price': product.price,
                'stock': product.stock,
                'image': product.image.url
            }
            for product in products
        ]
        return Response(products_list)
    except Product.DoesNotExist:
        return Response({'error': 'Category not found or no products available'}, status=404)


@api_view(['GET'])
def FeaturedProducts(request):
    category_id = request.query_params.get('category_id')
    category = get_object_or_404(Category , id=category_id)
    
    top_products = (
        Product.objects.filter(category=category)
        .annotate(average_rating=Coalesce(Avg('reviews__rating'), Value(0), output_field=FloatField()))
        .order_by('-average_rating')[:5]  # Sort by average_rating with NULL treated as 0
    )

    data = [
        {
            "id": product.id,
            "name": product.name,
            "image": product.image.url,
            "description": product.description,
            "price": product.price,
            "stock": product.stock,
            "average_rating": product.average_rating,
        }
        for product in top_products
    ]
    return Response(data)


@api_view(['POST'])
def postReview(request):

    product_id = request.data.get('product')
    user_id = request.data.get('user')
    product = get_object_or_404(Product , id=product_id)
    user = get_object_or_404(User_Profile , id=user_id)

    data = request.data.copy()
    review = Review(
            user = user,
            product = product,
            review = data.get('review'),
            rating = data.get('rating')
        )

    review.save()

    return Response({'id':review.id}, status=status.HTTP_200_OK)

class AdminProductsViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAdminUser,]

    def get_queryset(self):
        print(f"Authenticated Profile")
        return Product.objects.all()
    
class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

    def get_queryset(self):
        product_id = self.request.query_params.get('product_id')
        user_id = self.request.query_params.get('user_id')

        product = get_object_or_404(Product , id=product_id)
        user = get_object_or_404(User_Profile , id=user_id)
        
        if product:
            return Review.objects.filter(product=product)
        elif user:
            return Review.objects.filter(user=user)


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer