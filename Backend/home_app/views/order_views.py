from home_app.models import User_Profile, Product, Order, OrderItem, ShippingAddress
from ..serilaizers.order_serializers import OrderSerializer, OrderItemSerializer, ShippingAddressSerializer
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAdminUser
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from django.shortcuts import get_object_or_404

import json

@api_view(['GET'])
def getOrder(request, order_id):
    try:
        userOrder     = Order.objects.get(id=order_id)
        serializer    = OrderSerializer(userOrder)
        return Response(serializer.data, status=200)
    except Exception as e:
        return Response({"Error Detail": f"Error:{str(e)}"})

@api_view(['GET'])
@authentication_classes([JWTAuthentication])
def getUserOrder(request):
    try:
        user_profile = request.user.user_profile
        orders = Order.objects.filter(user=user_profile)
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data, status=200)
    
    except Exception as e:
        return Response({"Error Detail": f"Error:{str(e)}"})

@api_view(['POST'])
def createOrder(request):
    try:
        data = json.loads(request.body)
        user_id=data['user_id']
        total_price=float(data['total_price'])
        if user_id:
            user = get_object_or_404(User_Profile, id=user_id)

        if user_id:
            order = Order.objects.create(user = user, total_price = total_price)
        else:
            order = Order.objects.create(total_price = total_price)
        
        # Loop through the items and create OrderItems
        for item in data['items']:
            product = Product.objects.get(id=item['product_id'])
        
            item_price = item['items_price']
            
            OrderItem.objects.create(
                order=order,
                product=product,
                item_price = item_price,
                quantity=item['quantity']
            )
        return Response({'message': 'Order created successfully!','Order_ID': order.id}, status=200)
    except Exception as e:
        return Response({'error': str(e)}, status=400)

@api_view(['PUT'])
def cancelOrder(request, order_id):
    try:
        user_order = get_object_or_404(Order, id=order_id)
        
        user_order.status = 'cancel'
        user_order.save()
        
        return Response({
            "message": "Order has been canceled successfully.",
            "order_id": user_order.id,
            "status": user_order.status
        }, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({
            "error": str(e),
            "message": "Failed to cancel the order."
        }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAdminUser])
def deleteOrder(request, order_id):
    try:
        user_order = get_object_or_404(Order, id=order_id)
        
        deleted_order_id= user_order.id
        
        user_order.delete()
        
        return Response({
            "message": f"Order #{deleted_order_id} has been deleted successfully.",
        }, status=status.HTTP_200_OK)
    
    except Exception as e:
        return Response({
            "error": str(e),
            "message": "Failed to delete the order."
        }, status=status.HTTP_400_BAD_REQUEST)

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

class OrderItemViewSet(viewsets.ModelViewSet):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer

class ShippingAddressViewSet(viewsets.ModelViewSet):
    queryset = ShippingAddress.objects.all()
    serializer_class = ShippingAddressSerializer
