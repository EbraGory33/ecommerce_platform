from rest_framework import serializers
from home_app.models import Order,OrderItem,ShippingAddress  
from home_app.serilaizers.product_serializers import ProductSerializer 

class OrderItemSerializer(serializers.ModelSerializer):  
    product = ProductSerializer()  

    class Meta:
        model = OrderItem
        fields = ['product', 'quantity', 'item_price' ]

class OrderSerializer(serializers.ModelSerializer):
    order_items = OrderItemSerializer(many=True)  

    class Meta:
        model = Order
        fields = ['total_price', 'status', 'ordered_at', 'order_items']

class ShippingAddressSerializer(serializers.ModelSerializer):
    order = OrderSerializer()  

    class Meta:
        model = ShippingAddress
        fields = '__all__'