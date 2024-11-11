from home_app.models import *
from ..serilaizers.cart_serializers import *
from rest_framework import status , viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated

@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated]) 
def AddToCart(request, product_id):
    try:
        user = request.user.user_profile

        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({"detail": "Product not found."}, status=status.HTTP_404_NOT_FOUND)
        
        cart, created = Cart.objects.get_or_create(user=user)

        # Checking if the CartItem exsits and increment the quantity if it does
        try:
            cart_item = CartItem.objects.get(cart=cart, product=product)
            cart_item.quantity += 1
            cart_item.save()
            return Response({"detail": "Product quantity updated.","cart_id":cart.id}, status=status.HTTP_200_OK)
        
        # Creates CartItem if it dosen't exsit
        except CartItem.DoesNotExist:
            CartItem.objects.create(cart=cart, product=product, quantity=1)
            return Response({"detail": "Product added to cart.","cart_id":cart.id}, status=status.HTTP_200_OK)
    
    
    except Exception as e:
        return Response({"error": "An unexpected error occurred.", "detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['PATCH'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])        
def UpdateCartItem(request, product_id):
    try:
        user = request.user.user_profile
        cart = Cart.objects.get(user=user)
        product = Product.objects.get(id=product_id)
        cart_item = CartItem.objects.get(cart=cart, product=product)
    except Exception as e:
        return Response({"detail": f"Error: {str(e)}"}, status=status.HTTP_404_NOT_FOUND)
    
    quantity = int(request.data.get('quantity'))

    if quantity is not None and quantity > 0:  
        cart_item.quantity = quantity

        cart_item.save()
        return Response({"detail": "Cart item updated."}, status=status.HTTP_200_OK)

@api_view(['DELETE'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def RemoveFromCart(request, product_id):
    try:
        user = request.user.user_profile
        cart = Cart.objects.get(user=user)
        product = Product.objects.get(id=product_id)
        print("productId: "+ str(product_id))
        cart_item = CartItem.objects.get(product=product, cart=cart)
    except Exception as e:
        return Response({"detail": f"Error: {str(e)}"})
                        
    cart_item.delete()
    return Response({"detail": "Item removed from cart."}, status=status.HTTP_200_OK)

@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def getUserCart(request):
    try:
        user = request.user.user_profile
        cart, created = Cart.objects.get_or_create(user=user)
        cart_items = CartItem.objects.filter(cart=cart)
    
        serializer = CartItemsSerializer(cart_items, many=True)
        
        return Response({
            "cart_id": cart.id,
            "cart_items": serializer.data
        }, status=status.HTTP_200_OK)
    
    except User_Profile.DoesNotExist:
        return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"detail": f"Error: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer

class CartItemViewSet(viewsets.ModelViewSet):
    queryset = CartItem.objects.all()
    serializer_class = CartItemsSerializer

